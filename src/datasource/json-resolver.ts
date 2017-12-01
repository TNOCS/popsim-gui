import { IDatasourceResolver } from './datasource-resolver';
import { IDatasource } from './datasource';

export class JsonResolver implements IDatasourceResolver {
  public id = 'json';

  public load(datasource: IDatasource) {
    return new Promise<Object>((resolve, reject) => {
      if (!datasource.source) { return reject('Missing datasource.source.'); }
      fetch(datasource.source)
        .then(res => {
          if (!res.ok) { return reject(`Could not load data with id ${datasource.id}: ${res.statusText}`); }
          res.json().then(json => {
            resolve(json);
          }).catch(error => reject(error));
        }).catch(error => reject(error));
    });
  }
}