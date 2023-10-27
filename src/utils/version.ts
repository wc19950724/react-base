import log from "./log";

export const versionShow = () => {
  log.capsule(process.env.__PKGNAME__, `v${process.env.__PKGVERSION__}`);
  log.primary(`Build Time:  ${process.env.__BUILDTIME__}`);
  log.primary(`Last Commit: ${process.env.__COMMITID__}`);
};
