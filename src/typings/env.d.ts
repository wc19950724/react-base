declare module "*.hdr";
declare module "*.usdz";
declare module "*.gltf";

declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
