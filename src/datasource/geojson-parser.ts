import { IDatasourceParser } from './datasource-parser';
import { DatasourceManager } from '../services/datasource-manager';

export interface IGeojsonParserOptions {
  resourceTypeId: string;
}

/**
 * Parse the GeoJSON data and make sure that each feature at least has an id.
 *
 * @export
 * @class GeojsonParser
 * @implements {IDatasourceParser}
 */
export class GeojsonParser implements IDatasourceParser {
  public id = 'geojson';

  /**
   * Parse the GeoJSON data and make sure that each feature at least has an id.
   *
   * @param {GeoJSON.FeatureCollection<GeoJSON.GeometryObject>} geojson
   * @param {DatasourceManager} dm
   * @param {{ parseOptions?: {[key: string]: any }}} [options]
   * @returns
   * @memberof GeojsonParser
   */
  public async parse(geojson: GeoJSON.FeatureCollection<GeoJSON.GeometryObject>, dm: DatasourceManager, options?: { parseOptions?: IGeojsonParserOptions }) {
    // const parserOptions = options ? options.parseOptions : undefined;
    // const resourceDatasource = parserOptions ? await dm.loadData(parserOptions.resourceTypeId) : undefined;
    // const resourceType = resourceDatasource ? resourceDatasource.data : undefined;
    let count = 0;
    // geojson.features.forEach(f => {
    //   if (!f.hasOwnProperty('properties')) {
    //     f.properties = { id: count++ };
    //   } else if (!f.properties.hasOwnProperty('id')) {
    //     f.properties.id = count++;
    //   }
    //   return f;
    // });
    return geojson;
  }
}
