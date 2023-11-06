import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { renderer } from "./utils";

const Component = observer(() => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      renderer.camera.position.set(0, 10, 50);
      renderer.initialize(container.current);
      renderer.addControl();
      // 创建一个环境光
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // 0xffffff 是光的颜色，0.5 是光的强度
      renderer.scene.add(ambientLight);

      // 创建一个平行光
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // 0xffffff 是光的颜色，0.5 是光的强度
      renderer.scene.add(directionalLight);

      // 创建地面的几何体
      const planeGeometry = new THREE.PlaneGeometry(100, 100); // 使用平面几何体，参数是宽度和高度

      // 创建地面的材质
      const planeMaterial = new THREE.MeshPhongMaterial(); // 使用 Phong 材质

      // 创建地面的网格对象
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);

      // 旋转地面，使其水平放置
      plane.rotation.x = -Math.PI / 2;

      // 将地面添加到场景中
      renderer.scene.add(plane);
    }
    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={container} className="all-full"></div>;
});

export default Component;
