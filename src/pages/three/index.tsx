import { useEffect, useRef } from "react";

import DamagedHelmet from "@/assets/DamagedHelmet.usdz";
import royal_esplanade_1k from "@/assets/royal_esplanade_1k.hdr";

import { ThreeScene } from "./utils";

const ThreeSceneComponent = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      const scene = new ThreeScene(container.current);
      scene.loadModel(DamagedHelmet, royal_esplanade_1k);
      return () => {
        scene.dispose();
      };
    }
  }, []);

  return (
    <div
      ref={container}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    ></div>
  );
};

export default ThreeSceneComponent;
