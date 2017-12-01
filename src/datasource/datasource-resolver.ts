import { IDatasource } from './datasource';

/**
 * Resolves the data by getting it from the solve.
 * Optionally, it will refresh the data every [datasource.updateTime] seconds.
 */
export interface IDatasourceResolver {
  id: string;
  load(datasource: IDatasource): Promise<any>;
  save?(datasource: IDatasource): Promise<any>;
}

