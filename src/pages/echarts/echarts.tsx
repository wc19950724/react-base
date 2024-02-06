import ReactEcharts from "echarts-for-react";
import EChartsReact from "echarts-for-react";
import React, { useRef } from "react";

import Chart from "./components/chart";
import { IProps } from "./types";

const Component = React.forwardRef<ReactEcharts, IProps>((props) => {
  const eChartsRef = useRef<EChartsReact>(null);

  return <Chart option={props.option} ref={eChartsRef} />;
});

Component.displayName = "echarts";

export default Component;
