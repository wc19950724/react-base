import * as THREE from "three";

import { rendererStore } from "./store";

class ModelRenderer {
  render(container: HTMLElement) {
    rendererStore.camera.position.set(0, 10, 50);
    rendererStore.initialize(container);
    rendererStore.controls.enableDamping = true;
    // 创建一个环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 0xffffff 是光的颜色，0.5 是光的强度
    rendererStore.scene.add(ambientLight);

    // 创建一个平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 0xffffff 是光的颜色，0.5 是光的强度
    rendererStore.scene.add(directionalLight);

    // 创建地面的几何体
    const planeGeometry = new THREE.PlaneGeometry(100, 100); // 使用平面几何体，参数是宽度和高度

    // 创建地面的材质
    const planeMaterial = new THREE.MeshPhongMaterial(); // 使用 Phong 材质

    // 创建地面的网格对象
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);

    // 旋转地面，使其水平放置
    plane.rotation.x = -Math.PI / 2;

    // 将地面添加到场景中
    rendererStore.scene.add(plane);
  }
}

export const modelRenderer = new ModelRenderer();
