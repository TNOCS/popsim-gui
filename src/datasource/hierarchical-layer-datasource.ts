import { ILayerDatasource } from './layer-datasource';
import { IDatasource } from './datasource';

/**
 * IHierarchicalLayerDatasource defines the hierarchical relation between different map layers. It also allows you
 * to control some common options of a group of layers.
 */
export interface IHierarchicalLayerDatasource extends IDatasource {
  dataType: 'hierarchy';
  data: Array<ILayerDatasource | IHierarchicalLayerDatasource>;
  title: string;
  description?: string;
  /** When true, the layer will cover all underlying layers completely. */
  isBaseLayer?: boolean;
  /** Is the group open (children visible) or collapsed (children are hidden) */
  isCollapsed?: boolean;
  /** Sets the opactity of all child layers: can be overruled when the child layer's opacity is set directly. */
  opacity?: number;
  /**
   * When visible (selected), all child layers should be visible on the map too.
   * If singleSelect is true, only the first child will be visible.
   */
  isVisible?: boolean;
  /** When single-select is used, only one child can be selected. */
  singleSelect?: boolean;
}