import { debounce } from "lodash";
import { useEffect, useRef } from "react";

import DamagedHelmet from "@/assets/DamagedHelmet.usdz";
import royal_esplanade_1k from "@/assets/royal_esplanade_1k.hdr";

import { ThreeScene } from "./utils";

const ThreeSceneComponent = () => {
  const container = useRef<HTMLDivElement>(null);
  let scene: ThreeScene;

  const resizeHandler = debounce(() => {
    if (container.current) {
      const { offsetWidth, offsetHeight } = container.current;
      scene.camera.aspect = offsetWidth / offsetHeight;
      scene.camera.updateProjectionMatrix();
      scene.renderer.setSize(offsetWidth, offsetHeight);
    }
  }, 200);

  const containerResize = new ResizeObserver(resizeHandler);

  useEffect(() => {
    if (container.current) {
      scene = new ThreeScene(container.current);
      scene.loadModel(royal_esplanade_1k, DamagedHelmet);

      containerResize.observe(container.current);

      return () => {
        containerResize.disconnect();
        scene.dispose();
      };
    }
  }, []);

  return (
    <div ref={container} className="all-full relative overflow-hidden"></div>
  );
};

export default ThreeSceneComponent;
