import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";

import egoCar from "@/assets/model/高精自车.gltf";
import { ResizeControl } from "@/utils/resizeControl";

import { loadModel, modelRenderer } from "./model.utils";
import { rendererStore } from "./store";

const Component = observer(() => {
  const container = useRef<HTMLDivElement>(null);
  const operation = useRef<HTMLDivElement>(null);

  const resizeble = new ResizeControl();

  useEffect(() => {
    if (container.current) {
      modelRenderer.render(container.current);
    }
    if (operation.current) {
      resizeble.add(operation.current, "right");
    }
    loadModel([egoCar]).then((obj) => {
      rendererStore.camera.up.set(0, 0, 1);
      rendererStore.camera.lookAt(10, 10, 2);
      rendererStore.scene.add(obj.scene);
    });
    return () => {
      rendererStore.dispose();
      resizeble.dispose();
    };
  }, []);

  return (
    <div className="all-full flex overflow-hidden">
      {/* <div ref={operation} style={{ flexShrink: 0 }}>
        操作栏
      </div> */}
      <div ref={container} className="flex-1" style={{ width: 0 }}></div>
    </div>
  );
});

export default Component;
