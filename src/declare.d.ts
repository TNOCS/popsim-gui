declare module "*.vue" {
  import Vue from 'vue';
  export default Vue;
}

declare module "ol/layer/tile" {
  export default ol.layer.Tile;
}

declare module "ol/map" {
  export default ol.Map;
}

declare module "ol/source/xyz" {
  export default ol.source.XYZ;
}

declare module "ol/view" {
  export default ol.View;
}

declare var require: any;