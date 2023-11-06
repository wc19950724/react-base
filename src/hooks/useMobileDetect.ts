const SCREEN_SIZE = 768;

type ObserverCallbackType = ((isMobile: boolean) => void) | null | undefined;

export const useMobileDetect = (size = SCREEN_SIZE) => {
  const mediaQueryList = matchMedia(`(max-width: ${size}px)`);

  let callback: ObserverCallbackType;
  const mediaQueryChange = (e: MediaQueryListEvent) => {
    callback?.(e.matches);
  };

  const observe = (cb?: ObserverCallbackType) => {
    cb?.(mediaQueryList.matches);
    callback = cb;
    mediaQueryList.onchange = mediaQueryChange;
  };

  const disconnect = () => {
    mediaQueryList.onchange = null;
  };

  return {
    observe,
    disconnect,
  };
};
