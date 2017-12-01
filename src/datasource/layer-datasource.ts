import { IDatasource } from './datasource';

export type LayerDataType = 'marker' | 'popup' | 'tile' | 'wms' | 'canvas' | 'imageoverlay' | 'polyline' | 'multipolyline' | 'polygon' | 'multipolygon' | 'rectangle' | 'circle' | 'circlemarker' | 'group' | 'featureGroup' | 'geojson';

/**
 * An ILayerDatasource is a datasource dedicated to describe map layers. It limits the allowed range of dataTypes
 * (currently based on Leaflet's possibilities), and via the options, you can specify whether it's opacity,
 * and visibility.
 */
export interface ILayerDatasource extends IDatasource {
  dataType: LayerDataType;
  title: string;
  description?: string;
  /** Sets the opactity of all child layers: can be overruled when the child layer's opacity is set directly. */
  opacity?: number;
  /**
   * When visible, show on the map.
   */
  isVisible?: boolean;
  /** Resource type id */
  styleId?: string;
}

