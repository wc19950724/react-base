import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Pedestrians from "@/assets/model/行人.gltf";

import { ThreeScene } from "./utils";

const loader = new GLTFLoader();

const ThreeAnimation = () => {
  const container = useRef<HTMLDivElement>(null);
  let threeScene: ThreeScene;

  const resizeHandler = debounce(() => {
    if (container.current) {
      const { offsetWidth, offsetHeight } = container.current;
      threeScene.camera.aspect = offsetWidth / offsetHeight;
      threeScene.camera.updateProjectionMatrix();
      threeScene.renderer.setSize(offsetWidth, offsetHeight);
    }
  }, 200);

  const containerResize = new ResizeObserver(resizeHandler);

  useEffect(() => {
    if (container.current) {
      threeScene = new ThreeScene(container.current);

      threeScene.axisUpdate();
      loadModel(Pedestrians);
      threeScene.renderer.setAnimationLoop(render);

      containerResize.observe(container.current);

      return () => {
        containerResize.disconnect();
        threeScene.dispose();
      };
    }
  }, []);

  let mixer: THREE.AnimationMixer;
  const loadModel = (gltfFile: string) => {
    loader.load(gltfFile, (gltf) => {
      const model = gltf.scene;

      model.traverse((item) => {
        if (item instanceof THREE.Mesh) {
          item.castShadow = true;
          item.material = item.material.clone();
          item.material.emissive = item.material.color;
        }
      });
      console.log(gltf); // 打印模型以查看其结构，确保有材质信息

      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((animate) => {
          mixer.clipAction(animate).play();
        });
      }
      // threeScene.scene.clear();
      threeScene.scene.add(model);
    });
  };

  let prevTime = 0;

  const render = (time: number) => {
    if (mixer) {
      const dt = (time - prevTime) / 1000;
      prevTime = time;
      // const mixerUpdateDelta = threeScene.clock.getDelta();
      mixer.update(dt);
    }
    // threeScene.axis.position.copy(threeScene.camera.position);
    // threeScene.axis.quaternion.copy(threeScene.camera.quaternion);
    threeScene.stats.update();
    threeScene.renderer.render(threeScene.scene, threeScene.camera);
    threeScene.CSSRenderer.render(threeScene.scene, threeScene.camera);
  };

  return (
    <div ref={container} className="all-full relative overflow-hidden"></div>
  );
};

export default ThreeAnimation;
