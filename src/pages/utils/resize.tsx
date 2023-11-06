import classNames from "classnames";
import { useEffect, useRef } from "react";

import { ResizeControl } from "@/utils/resizeControl";

import styles from "./styles.module.less";

const Component = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  const resizeble = new ResizeControl();

  useEffect(() => {
    if (boxRef.current) {
      resizeble.add(boxRef.current);
    }
    return () => {
      resizeble.dispose();
    };
  }, []);
  return (
    <div className="all-full relative">
      <div ref={boxRef} className={classNames(styles["box"])}>
        dom
      </div>
    </div>
  );
};

export default Component;
