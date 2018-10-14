# Antarest Service
Simple enabler for [antarest](https://github.com/bahasa-ai/antarest) and [antarest-sql](https://github.com/bahasa-ai/antarest-sql)

__v2.0.0__:
- All CRUD action will return array of T for consistency
- Add new type antarest-dynamo

__v1.0.0__:
- Initial release

## Config
Config object for initilaize:
```
config: {
    baseUrl: 'http://your-baseUrl.com:1234',
    url?: 'your-additional-url',
    type: antarest,
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
- create(objectType: T): Promise<AntarestResult<T[]>>;
- get(options?: Comparator): Promise<AntarestResult<T[]>>;
- update(conditions: Comparator, patch: Patcher): Promise<AntarestResult<T[]>>;
- delete(conditions: Comparator): Promise<AntarestResult<T[]>>;
- getById(id: number | string, identifier?: string): Promise<AntarestResult<T>>;
- updateById(id: number | string, patch: object, identifier?: string): Promise<AntarestResult<T[]>>;
- deleteById(id: number | string, identifier?: string): Promise<AntarestResult<T[]>>;
- query(query: object): Promise<AntarestResult<T[]>>; // for antarest-sql
- aggregate(aggregator: Comparator[]): Promise<AntarestResult<T[]>>; // for antarest

## Example
```
type Cat = {
    name: string,
    weight: number
}

class CatHome {
    private _cat: AntarestService<Cat>

    constructor(){
        this._cat = new AntarestService<Cat>({
            baseUrl: http://localhost:1234,
            url: cat,
            type: antarest,
            isSQL: false,
            timeout: 5000
        })
    }

    public get Cat() {
        return this._cat
    }
}

const catHome: CatHome = new CatHome()

let tom = catHome.Cat.get({
    name: { $eq: Tom }
})

console.log(tom)

// { 
//   status: 200,
//   msg: 'OK',
//   payload:[ 
//       {
//           name: Tom,
//           weight: 200
//       }
//   ]
// }

```