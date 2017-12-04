import { IDatasourceParser } from '../datasource/datasource-parser';
import { IDatasourceResolver } from '../datasource/datasource-resolver';
import { IDatasource } from '../datasource/datasource';

/**
 * The datasource manager is responsible for:
 * - managing available datasources (CRUD)
 * - storing the retreived data, if any, in the datasource
 * - updating the backend data (e.g. in case we have a REST datasource)
 * - refreshing the data (e.g. in case we have a dynamic datasource)
 * - making sure every datasource has a unique ID
 * - making sure every feature has a unique ID
 * - managing resolvers that can resolve data
 * - managing parsers that can process data
 *
 * It is not responsible for:
 * - retreiving the data (that is the responsibility of the datasource's resolver)
 * - managing the relationship of the different datasources, e.g. the relationship between a style datasource and the actual data
 *
 */
export class DatasourceManager {
  protected datasources: { [id: string]: IDatasource } = {};
  protected resolvers: { [id: string]: IDatasourceResolver } = {};
  protected parsers: { [id: string]: IDatasourceParser } = {};
  protected subscriptions: { id: number; datasourceId: string; }[] = [];

  public addDatasource(datasource: IDatasource) {
    if (this.datasources.hasOwnProperty(datasource.id)) { return; }
    this.datasources[datasource.id] = datasource;
    return true;
  }

  public addResolver(resolver: IDatasourceResolver) {
    if (this.resolvers.hasOwnProperty(resolver.id)) { return; }
    this.resolvers[resolver.id] = resolver;
  }

  public addParser(parser: IDatasourceParser) {
    if (this.parsers.hasOwnProperty(parser.id)) { return; }
    this.parsers[parser.id] = parser;
  }

  public loadDatasource(datasource: IDatasource) {
    return this.loadData(datasource.id);
  }

  public loadData(id: string) {
    return new Promise<IDatasource>((resolve, reject) => {
      if (!this.datasources.hasOwnProperty(id)) {
        return reject(`Datasource with id ${id} not found!`);
      }
      const datasource = this.datasources[id];
      if (datasource.data) { return resolve(datasource); }
      if (!datasource.sourceType || !this.resolvers.hasOwnProperty(datasource.sourceType)) {
        // No need to load any data, so return.
        return resolve(datasource);
      }
      const resolver = this.resolvers[datasource.sourceType];
      if (datasource.dataType && !this.parsers.hasOwnProperty(datasource.dataType)) {
        return reject(`Datasource parser with id ${datasource.dataType} not found!`);
      }
      const parser = datasource.dataType ? this.parsers[datasource.dataType] : undefined;
      resolver.load(datasource)
        .then(async data => {
          datasource.data = parser ? await parser.parse(data, this, datasource.options) : data;
          if (datasource.updateTime) { this.subscribe(datasource, resolver, parser); }
          resolve(datasource);
        })
        .catch(error => reject(error));
    });
  }

  /**
   * In case the data has been loaded, unload it, and also stop any subscriptions to it.
   *
   * @param {string} id
   * @returns
   * @memberof DatasourceManager
   */
  public unloadData(id: string) {
    if (!this.datasources.hasOwnProperty(id)) { return; }
    this.unsubscribe(id);
    this.datasources[id].data = undefined;
  }

  /**
   * Unsubscribe in case you have a subscription to the data.
   *
   * @param {IDatasource} datasource
   * @memberof DatasourceManager
   */
  public unsubscribe(id: string) {
    if (!this.datasources.hasOwnProperty(id)) { return; }
    const subscription = this.subscriptions.filter(s => s.datasourceId === id).shift();
    if (subscription) { clearInterval(subscription.id); }
  }

  private subscribe(datasource: IDatasource, resolver: IDatasourceResolver, parser?: IDatasourceParser) {
    const isSubscribed = this.subscriptions.filter(s => s.datasourceId === datasource.id).length > 0;
    if (isSubscribed || !datasource.updateTime) { return; }
    const id = setInterval(() => {
      resolver.load(datasource)
        .then(data => datasource.data = parser ? parser.parse(data, this, datasource.options) : data)
        .catch(error => console.warn(`Error resolving datasource with id ${datasource.id}: ${error}!`));
    }, datasource.updateTime * 1000);
    this.subscriptions.push({ id, datasourceId: datasource.id });
  }

}
