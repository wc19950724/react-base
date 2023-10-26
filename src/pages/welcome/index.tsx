import classNames from "classnames";

import styles from "./styles.module.less";

const Welcome = () => {
  return (
    <div className={classNames(styles["welcome-page"])}>
      <h1 className={classNames(styles["welcome-heading"])}>
        欢迎来到基于React + tsx的个人练习项目
      </h1>
    </div>
  );
};

export default Welcome;
