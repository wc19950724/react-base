import { debounce } from "lodash";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Controller, GUI } from "three/examples/jsm/libs/lil-gui.module.min";

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

  /**
   * 渲染器渲染
   * @param cb 需要额外执行的回调函数
   */
  render(cb?: () => void) {
    cb?.();
    this.controls?.update();
    this.renderer?.render(this.scene, this.camera);
  }

  /**
   * 动画帧渲染
   * @param {Function} cb 需要额外执行的回调函数
   */
  rafRender(cb?: () => void) {
    this.renderer?.setAnimationLoop(this.render.bind(this, cb));
  }

  dispose() {
    this.resizeObserver.disconnect();
    this.renderer && this.container.removeChild(this.renderer.domElement);
  }
}

export class GltfScene extends BaseScene {
  gui: GUI;
  axes: THREE.AxesHelper;

  #axesColors: [THREE.Color, THREE.Color, THREE.Color];

  constructor(container: HTMLDivElement, options?: Options) {
    super(container, options);
    this.gui = new GUI();
    this.axes = new THREE.AxesHelper(5);
    const xAxisColor = new THREE.Color(0xff0000);
    const yAxisColor = new THREE.Color(0x00ff00);
    const zAxisColor = new THREE.Color(0x0000ff);
    this.axes.setColors(xAxisColor, yAxisColor, zAxisColor);

    this.#axesColors = [xAxisColor, yAxisColor, zAxisColor];
    this.init();
  }

  init() {
    const grid = new THREE.GridHelper(5, 10, 0x888888, 0x444444);
    this.scene.add(grid, this.axes);
    // 相机位置
    this.camera.position.set(0, 0.5, 1);
    this.addGUI();
  }

  addGUI() {
    const axesFolder = this.gui.addFolder("辅助线");
    axesFolder
      .add(this.axes, "visible")
      .name("显示")
      .onChange((val) => {
        axesFolder.children.forEach((item) => {
          if (item instanceof Controller && item.property !== "visible") {
            item.disable(!val);
          }
        });
      });
    axesFolder
      .addColor(this.#axesColors, "0")
      .disable(!this.axes.visible)
      .name("X")
      .onChange(() => {
        this.axes.setColors(...this.#axesColors);
      });
    axesFolder
      .addColor(this.#axesColors, "1")
      .disable(!this.axes.visible)
      .name("Y")
      .onChange(() => {
        this.axes.setColors(...this.#axesColors);
      });
    axesFolder
      .addColor(this.#axesColors, "2")
      .disable(!this.axes.visible)
      .name("Z")
      .onChange(() => {
        this.axes.setColors(...this.#axesColors);
      });

    // this.gui.addFolder("位置");
    // this.gui.addFolder("缩放");
    // this.gui.addFolder("旋转");
    this.gui.domElement.style.position = "absolute";
    this.container.appendChild(this.gui.domElement);
  }

  dispose() {
    super.dispose();
    this.container.removeChild(this.gui.domElement);
  }
}
