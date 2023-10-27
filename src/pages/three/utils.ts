import { message } from "antd";
import { debounce } from "lodash";
import { action, makeObservable, observable } from "mobx";
import * as THREE from "three";
import { Object3D } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

type Options = {
  resize?: boolean;
  control?: boolean;
};

const defaultOptions: Options = {
  resize: true,
  control: true,
};

export class BaseScene {
  options: Options;

  container: HTMLDivElement;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;

  controls?: OrbitControls;

  resizeObserver: ResizeObserver;

  constructor(container: HTMLDivElement, options?: Options) {
    this.options = Object.assign({}, defaultOptions, options);

    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera();
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.container.appendChild(this.renderer.domElement);

    this.resizeObserver = new ResizeObserver(
      debounce(this.resize.bind(this), 200),
    );
    this.resize();
    if (this.options.resize) {
      this.resizeObserver.observe(this.container);
    }
    if (this.options.control) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }
  }

  resize() {
    const { offsetWidth, offsetHeight } = this.container;
    this.camera.aspect = offsetWidth / offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(offsetWidth, offsetHeight);
  }

  render() {
    this.controls?.update();
    this.renderer?.render(this.scene, this.camera);
  }

  /**
   * 动画帧渲染
   * @param {Function} cb 需要额外执行的回调函数
   */
  rafRender(cb?: XRFrameRequestCallback) {
    this.renderer?.setAnimationLoop((...arg) => {
      cb?.(...arg);
      this.render();
    });
  }

  dispose() {
    this.resizeObserver.disconnect();
    this.renderer && this.container.removeChild(this.renderer.domElement);
  }
}

export interface ModelData {
  mixer: THREE.AnimationMixer;
  actions: THREE.AnimationAction[];
}

export class GirdScene extends BaseScene {
  gui: GUI;
  panel: Panel;
  ambientLight: THREE.AmbientLight; // 环境光
  directionalLight: THREE.DirectionalLight; // 平行光

  model?: Object3D;

  constructor(container: HTMLDivElement, options?: Options) {
    super(container, options);
    makeObservable(this, {
      model: observable,
      updateModel: action,
    });
    this.gui = new GUI();
    this.panel = new Panel(this.gui);
    this.container.appendChild(this.gui.domElement);
    this.ambientLight = new THREE.AmbientLight();
    this.directionalLight = new THREE.DirectionalLight();
    this.scene.add(this.ambientLight, this.directionalLight);
    this.init();
  }

  init() {
    // 相机位置
    this.camera.position.set(0, 0.5, 1);
    if (this.controls) {
      this.controls.enableDamping = true;
    }
    this.addGUI();
  }

  addGUI() {
    const panel = this.panel
      .addUpload(this.updateModel.bind(this))
      .addGrid()
      .addAxes();
    this.scene.add(panel.grid, panel.axes);
  }

  updateModel(gltf: GLTF) {
    if (this.model) {
      this.scene.remove(this.model);
    }
    this.model = gltf.scene;
    this.model.rotateX(-Math.PI / 2);
    this.scene.add(this.model);
    if (gltf.animations.length) {
      const mixer = new THREE.AnimationMixer(this.model);
      const actions: THREE.AnimationAction[] = [];
      gltf.animations.forEach((item) => {
        const action = mixer.clipAction(item);
        actions.push(action);
      });
      this.model.userData.actions = actions;
      this.model.userData.mixer = mixer;
    }
  }

  updateAnimation(play?: boolean) {
    if (!this.model) return;
    const { actions } = this.model.userData as ModelData;
    if (play) {
      actions.forEach((item) => item.play());
    } else {
      actions.forEach((item) => item.stop());
    }
  }

  dispose() {
    super.dispose();
    this.container.removeChild(this.gui.domElement);
  }
}

export class Panel {
  gui: GUI;

  grid: THREE.GridHelper;

  axes: THREE.AxesHelper;
  #axesColors: [THREE.Color, THREE.Color, THREE.Color];

  constructor(gui: GUI) {
    this.gui = gui;
    this.gui.close();
    this.gui.domElement.style.position = "absolute";

    this.grid = new THREE.GridHelper();
    this.axes = new THREE.AxesHelper();
    const xAxisColor = new THREE.Color(0xff0000);
    const yAxisColor = new THREE.Color(0x00ff00);
    const zAxisColor = new THREE.Color(0x0000ff);
    this.axes.setColors(xAxisColor, yAxisColor, zAxisColor);

    this.#axesColors = [xAxisColor, yAxisColor, zAxisColor];
  }

  addUpload(
    onLoad: Parameters<GLTFLoader["load"]>[1],
    onProgress?: Parameters<GLTFLoader["load"]>[2],
    onError?: Parameters<GLTFLoader["load"]>[3],
  ) {
    const modelFile = new ModelFile();

    const eventObj = {
      upload: modelFile.upload.bind(modelFile),
    };
    this.gui.add(eventObj, "upload").name("上传gltf模型");
    modelFile.load(onLoad, onProgress, onError);
    return this;
  }

  addGrid() {
    this.gui.add(this.grid, "visible").name("网格");
    return this;
  }

  addAxes() {
    this.gui
      .add(this.axes, "visible")
      .name("坐标轴")
      .onChange((val) => {
        val ? axesFolder.show() : axesFolder.hide();
      });
    const axesFolder = this.gui.addFolder("坐标轴").show(this.axes.visible);
    const axes = {
      length: 1,
    };
    axesFolder
      .add(axes, "length", 0, 100, 1)
      .name("长度")
      .onChange(() => {
        this.axes.scale.set(axes.length, axes.length, axes.length);
      });
    axesFolder
      .addColor(this.#axesColors, "0")
      .name("X")
      .onChange(() => {
        this.axes.setColors(...this.#axesColors);
      });
    axesFolder
      .addColor(this.#axesColors, "1")
      .name("Y")
      .onChange(() => {
        this.axes.setColors(...this.#axesColors);
      });
    axesFolder
      .addColor(this.#axesColors, "2")
      .name("Z")
      .onChange(() => {
        this.axes.setColors(...this.#axesColors);
      });
    return this;
  }
}

export class ModelFile {
  input: HTMLInputElement;

  onLoad: Parameters<GLTFLoader["load"]>[1];
  onProgress?: Parameters<GLTFLoader["load"]>[2];
  onError?: Parameters<GLTFLoader["load"]>[3];

  constructor() {
    this.input = document.createElement("input");
    this.input.type = "file";
    this.input.accept = ".gltf";
    this.onLoad = () => {};
  }

  load(
    onLoad: typeof this.onLoad,
    onProgress?: typeof this.onProgress,
    onError?: typeof this.onError,
  ) {
    this.onLoad = onLoad;
    this.onProgress = onProgress;
    this.onError = onError;
  }

  upload() {
    this.input.addEventListener("change", this.change.bind(this));
    this.input.click();
  }

  async change() {
    const { files } = this.input;
    if (!files) {
      return message.warning("请选择文件");
    }
    if (!files[0].name.endsWith(".gltf")) {
      return message.warning("请选择.gltf文件");
    }
    const loader = new GLTFLoader();
    try {
      const data = await loader.loadAsync(
        URL.createObjectURL(files[0]),
        this.onProgress?.bind(this),
      );
      this.onLoad(data);
    } catch (error) {
      this.onError?.(error);
    } finally {
      this.dispose();
    }
  }

  dispose() {
    this.input.removeEventListener("change", this.change.bind(this));
  }
}
