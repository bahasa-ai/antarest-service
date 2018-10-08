import { AxiosInstance } from 'axios';
export interface AntarestResult<T> {
    status: number;
    message: string;
    payload?: T;
}
export interface Comparator {
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
export interface Patcher {
    [filed: string]: any;
}
export interface Config {
    baseUrl: string;
    url?: string;
    isSql: boolean;
}
export default class AntarestService<T> {
    private _isSQL;
    protected _server: AxiosInstance;
    protected _baseUrl: string;
    protected _url: string;
    constructor(config: Config);
    create(objectType: T): Promise<AntarestResult<T>>;
    get(options?: Comparator): Promise<AntarestResult<T[]>>;
    update(conditions: Comparator, patch: Patcher): Promise<AntarestResult<T[]>>;
    delete(conditions: Comparator): Promise<AntarestResult<T[]>>;
    getById(id: number | string): Promise<AntarestResult<T>>;
    updateById(id: number | string, patch: object): Promise<AntarestResult<T>>;
    deleteById(id: number | string): Promise<AntarestResult<T>>;
    query(query: object): Promise<AntarestResult<T[]>>;
    aggregate(aggregator: Comparator[]): Promise<AntarestResult<T[]>>;
    private getOptionsId;
    private ResultHelper;
}
