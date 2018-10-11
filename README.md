# Antarest Service
Simple enabler for [antarest](https://github.com/bahasa-ai/antarest) and [antarest-sql](https://github.com/bahasa-ai/antarest-sql)

__v1.0.0__:
- Initial release

## Config
Config object for initilaize:
```
config: {
    baseUrl: 'http://your-baseUrl.com:1234'
    url?: 'your-additional-url'
    isSQL: false // database model,
    timeout?: 7777
}
```

## Antarest Result
Result Object: 
```
{
    status: 200,
    msg: 'Ok'
    payload: T
}
```

## Functions:
- create(objectType: T): Promise<AntarestResult<T>>;
- get(options?: Comparator): Promise<AntarestResult<T[]>>;
- update(conditions: Comparator, patch: Patcher): Promise<AntarestResult<T[]>>;
- delete(conditions: Comparator): Promise<AntarestResult<T[]>>;
- getById(id: number | string): Promise<AntarestResult<T>>;
- updateById(id: number | string, patch: object): Promise<AntarestResult<T>>;
- deleteById(id: number | string): Promise<AntarestResult<T>>;
- query(query: object): Promise<AntarestResult<T[]>>; // for SQL databse
- aggregate(aggregator: Comparator[]): Promise<AntarestResult<T[]>>; // for noSQL database