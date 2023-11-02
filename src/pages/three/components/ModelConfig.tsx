import { Progress } from "antd";

import { Model } from "../type";

interface IProps {
  model: Model;
}

const ModelConfig = ({ model }: IProps) => {
  return <Progress percent={model.userData.progress * 100} />;
};

export default ModelConfig;
