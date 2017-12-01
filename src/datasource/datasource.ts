/**
 * A datasource is responsible for retreiving data and, optionally, updating the data.
 * It does not store the retreived data, however.
 */
export interface IDatasource {
  id: string;
  /**
   * Which type of resolver do we need to get the data, e.g. rest, static, wdsl, kafka, etc.
   * In case the source type is missing, it is assumed that the data is already present (in data),
   * or that the receiving component knows how to deal with it, e.g. a tile layer in a map component.
   */
  sourceType?: string;
  /**
   * What kind of data will we get, and how can we, if needed, process it.
   * When missing, it is assumed that the data is already in the correct format.
   */
  dataType?: string;
  /**
   * Source url of the data
   */
  source?: string;
  /**
   * The actual data that is retreived.
   */
  data?: { [ key: string ]: any } ;
  /**
   * If set, it means that the data must be updated every [updateTime] seconds.
   * When missing, the data will be retreived only once.
   */
  updateTime?: number;
  /**
   * If true, it indicates that the data can be updated.
   */
  twoWay?: boolean;
  /**
   * Initialize the data after loading, e.g. when a data is added to the map, initialize all features.
   */
  initialize?: Function;
  /**
   * Events dictionary, e.g. when the data is displayed, user interactions may raise events. Register these events
   * and provide a callback function for them.
   */
  events?: Array<{ name: string; callback: Function }>;
  /**
   * In case you need to provide additional options to the datasource renderer, e.g.
   * options, attribution, specific content, etc.
   */
  options?: { [key: string]: any };
}
