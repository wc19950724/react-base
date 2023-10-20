import { useState } from "react";

export const useScreenSize = (size: number) => {
  const mediaQueryList = matchMedia(`(max-width: ${size}px)`);

  const [isMobile, setIsMobile] = useState(mediaQueryList.matches);
  const mediaQueryChange = (e: MediaQueryListEvent) => {
    setIsMobile(e.matches);
  };

  const observe = () => {
    mediaQueryList.addEventListener("change", mediaQueryChange);
  };

  const disconnect = () => {
    mediaQueryList.removeEventListener("change", mediaQueryChange);
  };

  return {
    isMobile,
    observe,
    disconnect,
  };
};
