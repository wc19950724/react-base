import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader";

export class ThreeScene {
  container: HTMLDivElement;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;

  constructor(container: HTMLDivElement) {
    this.container = container;
    this.camera = new THREE.PerspectiveCamera(
      45,
      container.offsetWidth / container.offsetHeight,
      0.25,
      20,
    );
    this.camera.position.set(-1.8, 0.6, 2.7);
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 2;
    this.controls.maxDistance = 10;
    this.controls.target.set(0, 0, -0.2);

    this.container.appendChild(this.renderer.domElement);
  }

  loadModel(hdrFile: string, usdzFile: string) {
    const textureLoader = new RGBELoader();
    textureLoader.load(hdrFile, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.scene.background = texture;
      this.scene.environment = texture;

      const loader = new USDZLoader();
      loader.load(usdzFile, (usdz) => {
        this.scene.add(usdz);
        this.render();
      });
    });
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.container.removeChild(this.renderer.domElement);
  }
}
