import "./styles.less";

const Welcome = () => {
  return (
    <div className="welcome-page">
      <h1 className="welcome-heading">
        欢迎来到基于React的Canvas大数据渲染项目
      </h1>
      <p className="content-intro">
        这个项目旨在演示基于Fabric.js技术的Canvas大数据渲染优化方案。
      </p>
    </div>
  );
};

export default Welcome;
