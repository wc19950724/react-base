import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import GUI from "three/examples/jsm/libs/lil-gui.module.min";

import { GirdScene } from "./utils";

const Component = observer(() => {
  const container = useRef<HTMLDivElement>(null);
  const grid = useRef<GirdScene>();

  const animateConfig = useRef({
    speed: 0.6,
  });

  const animatePanel = useRef<GUI>();

  useEffect(() => {
    if (container.current) {
      grid.current = new GirdScene(container.current);

      let lastTime = 0;
      grid.current.rafRender((time) => {
        if (!grid.current?.model?.userData.mixer) {
          lastTime = 0;
          return;
        }
        const dl = (time - lastTime) / 1000;
        grid.current.model.userData.mixer.update(
          dl * animateConfig.current.speed,
        );

        lastTime = time;
      });

      return () => {
        grid.current?.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (animatePanel.current) {
      animatePanel.current.destroy();
    }
    if (grid.current?.model?.userData.mixer) {
      animatePanel.current = grid.current.gui.addFolder("动画");
      animatePanel.current
        .add(animateConfig.current, "speed", 0, 2, 0.01)
        .name("速度");
    }
  }, [grid.current?.model?.userData.mixer]);

  return (
    <div ref={container} className="all-full relative overflow-hidden"></div>
  );
});

export default Component;
