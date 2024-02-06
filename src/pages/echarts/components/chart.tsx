import ReactEcharts from "echarts-for-react";
import React from "react";

import { IProps } from "../types";

const Chart = React.forwardRef<ReactEcharts, IProps>((props, ref) => {
  return (
    <ReactEcharts
      option={props.option}
      theme="dark"
      style={{
        width: "100%",
        height: "100%",
        minHeight: 300,
      }}
      // 暴露chart组件对象，通过getEchartsInstance()获取实例
      ref={ref}
    />
  );
});

Chart.displayName = "Chart"; // 设置displayName

export default Chart;
