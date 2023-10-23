import { debounce } from "lodash";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { USDZLoader } from "three/examples/jsm/loaders/USDZLoader";

import DamagedHelmet from "@/assets/DamagedHelmet.usdz";
import royal_esplanade_1k from "@/assets/royal_esplanade_1k.hdr";

import { ThreeScene } from "./utils";

const ThreeSceneComponent = () => {
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
      loadModel(royal_esplanade_1k, DamagedHelmet);
      threeScene.renderer.setAnimationLoop(render);
      containerResize.observe(container.current);

      return () => {
        containerResize.disconnect();
        threeScene.dispose();
      };
    }
  }, []);

  const loadModel = (hdrFile: string, usdzFile: string) => {
    const textureLoader = new RGBELoader();
    textureLoader.load(hdrFile, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      threeScene.scene.background = texture;
      threeScene.scene.environment = texture;

      const loader = new USDZLoader();
      loader.load(usdzFile, (usdz) => {
        threeScene.scene.add(usdz);
      });
    });
  };

  const render = () => {
    threeScene.stats.update();
    threeScene.renderer.render(threeScene.scene, threeScene.camera);
  };

  return (
    <div ref={container} className="all-full relative overflow-hidden"></div>
  );
};

export default ThreeSceneComponent;
