import { DatasourceManager } from '../services/datasource-manager';

/**
 * Parses the data, and optionally converts it, e.g. add an id to features,
 * or convert KML data to GeoJSON.
 */
export interface IDatasourceParser {
  id: string;
  parse(data: Object, dm: DatasourceManager, options?: Object): Object;
}
