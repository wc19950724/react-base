import { Button, Collapse, CollapseProps } from "antd";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { createFilePicker } from "@/utils/utils";

import ModelConfig from "./components/ModelConfig";
import styles from "./model.module.less";
import { modelLoader, renderer, resizeble } from "./utils";

const Component = observer(() => {
  const container = useRef<HTMLDivElement>(null);
  const modelBox = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const arr: CollapseProps["items"] = [];
    for (const key in modelLoader.models) {
      const model = modelLoader.models[key];
      const item = {
        key,
        label: model.userData.file.name,
        children: <ModelConfig model={model} />,
      };
      arr.push(item);
      if (model.scene) {
        renderer.scene.add(model.scene);
      }
    }
    return arr;
  }, [modelLoader.models]);

  const [activeKey, setActiveKey] = useState<
    Required<CollapseProps>["activeKey"]
  >([""]);

  const onClick = async () => {
    const fileList = await createFilePicker("multiple", ".gltf");
    modelLoader.load(fileList);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const point = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY,
    };
    resizeble.startResize(point);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const point = {
      x: e.pageX,
      y: e.pageY,
    };
    resizeble.startResize(point);
  };

  const onChange: CollapseProps["onChange"] = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    if (modelBox.current) {
      resizeble.initialize(modelBox.current, "horizontal");
    }

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

      return () => {
        renderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    setActiveKey(items?.map((item) => item.key || ""));
  }, [items]);

  return (
    <div ref={container} className="all-full overflow-hidden relative">
      <div
        ref={modelBox}
        className={(classNames(styles["model-box"]), "flex", "flex-col")}
      >
        <div
          className={classNames(styles["resize-line"])}
          onTouchStart={onTouchStart}
          onMouseDown={onMouseDown}
        ></div>
        <div className={classNames(styles["model-loader-btn"])}>
          <Button onClick={onClick} block>
            加载模型
          </Button>
        </div>
        <Collapse
          className={classNames(styles["model-collapse"])}
          items={items}
          ghost
          activeKey={activeKey}
          onChange={onChange}
        ></Collapse>
      </div>
    </div>
  );
});

export default Component;
