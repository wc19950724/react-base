import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import GUI from "three/examples/jsm/libs/lil-gui.module.min";

import { GirdScene, ModelData } from "./utils";

const Component = observer(() => {
  const container = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<GirdScene>();

  const animateConfig = useRef({
    play: false,
    speed: 0.6,
  });

  const animatePanel = useRef<GUI>();

  useEffect(() => {
    if (container.current) {
      const gridScene = new GirdScene(container.current);
      setGrid(gridScene);

      let lastTime = 0;
      gridScene.rafRender((time) => {
        const userData = gridScene.model?.userData as ModelData;
        if (!userData?.mixer) {
          lastTime = 0;
          return;
        }
        const dl = (time - lastTime) / 1000;
        userData.mixer.update(dl * animateConfig.current.speed);

        lastTime = time;
      });

      return () => {
        gridScene.dispose();
      };
    }
  }, []);

  useEffect(() => {
    if (animatePanel.current) {
      animatePanel.current.destroy();
    }
    if (!grid?.model) return;
    const userData = grid.model.userData as ModelData;
    if (userData.mixer) {
      grid.updateAnimation(animateConfig.current.play);
      animatePanel.current = grid.gui.addFolder("动画");
      animatePanel.current
        .add(animateConfig.current, "play")
        .name("播放")
        .onChange(grid.updateAnimation.bind(grid));
      animatePanel.current
        .add(animateConfig.current, "speed", 0, 2, 0.01)
        .name("速度");
    }
  }, [grid?.model?.userData.mixer]);

  return (
    <div ref={container} className="all-full relative overflow-hidden"></div>
  );
});

export default Component;
