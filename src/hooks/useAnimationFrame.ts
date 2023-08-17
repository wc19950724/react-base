/**
 * 统一管理事件锁key枚举值
 */
export enum LockMapKey {
  DEFAULT = "DEFAULT",
}

/** 动画帧渲染hook */
export const useAnimationFrame = () => {
  /**
   * 事件锁 Map结构
   * @description Map<key, id>
   */
  const lock = new Map<
    LockMapKey,
    ReturnType<typeof requestAnimationFrame> | undefined
  >();
  /**
   * 事件处理程序
   * @param fn 事件回调
   * @param key 事件锁的key, 相同key会触发事件锁
   * @returns 结束动画帧回调
   */
  const hanlder = (fn: (time?: number) => void, key = LockMapKey.DEFAULT) => {
    let id;
    if (lock.has(key)) {
      id = lock.get(key);
    } else {
      id = window.requestAnimationFrame((time) => {
        fn(time);
        lock.delete(key);
      });
    }
    lock.set(key, id);
    return (cancelKey: LockMapKey) => {
      const cancelId = lock.get(cancelKey);
      lock.delete(cancelKey);
      window.cancelAnimationFrame(cancelId ?? 0);
    };
  };

  return {
    lock,
    hanlder,
  };
};
