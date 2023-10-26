import { useEffect, useRef } from "react";

import { GltfScene } from "./utils";

const Component = () => {
  const container = useRef<HTMLDivElement>(null);
  let threeScene: GltfScene;

  useEffect(() => {
    if (container.current) {
      threeScene = new GltfScene(container.current);
      threeScene.rafRender();

      return () => {
        threeScene.dispose();
      };
    }
  }, []);

  return (
    <div ref={container} className="all-full relative overflow-hidden"></div>
  );
};

export default Component;
