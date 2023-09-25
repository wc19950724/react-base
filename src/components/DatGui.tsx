import "@/styles/dat-gui.css";

import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DatGuiForm, { DatFolder, DatString } from "react-dat-gui";

export interface DatGuiData {
  FPS?: number;
  zoom?: number;
  vptCoordsTL?: string;
  vptCoordsBR?: string;
}

export const DatGui = observer((props: DatGuiData) => {
  const [data, setData] = useState<DatGuiData>({
    FPS: 0,
    zoom: 1,
    vptCoordsTL: "0, 0",
    vptCoordsBR: "0, 0",
  });
  useEffect(() => {
    setData({ ...data, ...props });
  }, [props]);
  return (
    <DatGuiForm
      data={data}
      onUpdate={() => {}}
      liveUpdate={false}
      style={{
        position: "absolute",
        height: "fit-content",
        left: 0,
        bottom: 0,
        top: "unset",
        right: "unset",
      }}
    >
      <DatFolder title="Fabric.js" closed={false}>
        <DatString path="FPS" label="FPS" />
        <DatString path="zoom" label="zoom" />
        <DatString path="vptCoordsTL" label="vptCoordsTL" />
        <DatString path="vptCoordsBR" label="vptCoordsBR" />
      </DatFolder>
    </DatGuiForm>
  );
});

export class Stats {
  beginTime: number;
  prevTime: number;
  frames: number;

  FPS: number;

  constructor() {
    this.beginTime = (performance || Date).now();
    this.prevTime = this.beginTime;
    this.frames = 0;
    this.FPS = 0;
  }

  begin() {
    this.beginTime = (performance || Date).now();
  }

  end() {
    this.frames++;
    const time = (performance || Date).now();
    if (time >= this.prevTime + 1000) {
      this.FPS = Math.round((this.frames * 1000) / (time - this.prevTime));
      this.prevTime = time;
      this.frames = 0;
    }
    return time;
  }

  update() {
    this.beginTime = this.end();
  }
}

export class Metrics {
  gui: DatGuiData;

  constructor() {
    makeAutoObservable(this);
    this.gui = {
      FPS: 0,
      zoom: 1,
      vptCoordsTL: "0, 0",
      vptCoordsBR: "0, 0",
    };
  }

  setGui(data: Partial<DatGuiData>) {
    this.gui = { ...this.gui, ...data };
  }
}
