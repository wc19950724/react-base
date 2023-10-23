import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Pedestrians from "@/assets/行人.gltf";

import { ThreeScene } from "./utils";

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

      loadModel(Pedestrians);
      render();

      containerResize.observe(container.current);

      return () => {
        containerResize.disconnect();
        threeScene.dispose();
      };
    }
  }, []);

  let mixer: THREE.AnimationMixer;
  const loadModel = (gltfFile: string) => {
    const loader = new GLTFLoader();
    loader.load(gltfFile, (gltf) => {
      const model = gltf.scene;
      mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(gltf.animations[0]);
      action.play();
      threeScene.scene.clear();
      threeScene.scene.add(model);
    });
  };

  const render = () => {
    requestAnimationFrame(render);
    if (mixer) {
      mixer.update(0.008);
    }
    threeScene.stats.update();
    threeScene.renderer.render(threeScene.scene, threeScene.camera);
  };

  return (
    <div ref={container} className="all-full relative overflow-hidden"></div>
  );
};

export default ThreeAnimation;
