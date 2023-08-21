import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-center flex-col h-full">
      <Empty description="404啦~" />
      <br />
      <Button onClick={() => navigate("/")}>返回首页</Button>
    </div>
  );
};

export default NotFound;
