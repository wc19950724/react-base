import log from "./log";

export const versionShow = () => {
  const buildTime = new Date().toLocaleString("zh-CN", {
    hour12: false,
  });
  log.capsule(process.env.__PKGNAME__, `v${process.env.__PKGVERSION__}`);
  log.primary(`Build Time:  ${buildTime}`);
  log.primary(`Last Commit: ${process.env.__COMMITID__}`);
};
