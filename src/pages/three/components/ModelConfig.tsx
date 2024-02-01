import { Progress } from "antd";

import { Model } from "../store/type";

interface IProps {
  model: Model;
}

const ModelConfig = ({ model }: IProps) => {
  return <Progress percent={model.userData.progress * 100} />;
};

export default ModelConfig;
