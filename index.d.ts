import { AxiosInstance, AxiosPromise } from 'axios';
export type AntarestResult<T> = {
  status: number;
  msg: string;
  payload?: T;
}
export type Comparator = {
  [field: string]: {
    $eq?: string | number | boolean;
    $gt?: number;
    $gte?: number;
    $in?: string[] | number[];
    $lt?: number;
    $lte?: number;
    $ne?: string | number | boolean | object;
    $nin?: string[] | number[];
  };
}
export type Patcher = {
  [filed: string]: any;
}
export type Config = {
  baseUrl: string;
  url?: string;
  type: AntarestType,
  isSQL: boolean,
  timeout?: number
}
export type Query = {
  query: string
}
export type AntarestType = 'antarest' | 'antarest-sql' | 'other'
export function AxiosPromiseTranslator<T>(promise: AxiosPromise<any>, isList: boolean): Promise<AntarestResult<T>>
export default class AntarestService<T> {
  private _isSQL
  protected _server: AxiosInstance
  protected _baseUrl: string
  protected _url: string
  constructor(config: Config)
  create(objectType: T): Promise<AntarestResult<T[]>>
  get(options?: Comparator): Promise<AntarestResult<T[]>>
  update(conditions: Comparator, patch: Patcher): Promise<AntarestResult<T[]>>
  delete(conditions: Comparator): Promise<AntarestResult<T[]>>
  getById(id: number | string, identifier?: string): Promise<AntarestResult<T[]>>
  updateById(id: number | string, patch: object, identifier?: string): Promise<AntarestResult<T[]>>
  deleteById(id: number | string, identifier?: string): Promise<AntarestResult<T[]>>
  query(query: object): Promise<AntarestResult<T[]>>
  aggregate(aggregator: Comparator[]): Promise<AntarestResult<T[]>>
}
