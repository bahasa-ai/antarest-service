import Axios, { AxiosPromise, AxiosInstance } from 'axios'

export type AntarestResult<T> = {
  status: number,
  msg: string,
  payload?: T
}

export type Comparator = {
  [field: string]: {
    $eq?: string | number | boolean,
    $gt?: number,
    $gte?: number,
    $in?: string[] | number[],
    $lt?: number,
    $lte?: number,
    $ne?: string | number | boolean | object,
    $nin?: string[] | number[]
  }
}

export type Patcher = {
  [filed: string]: any
}

export type Config = {
  baseUrl: string,
  url?: string,
  type: AntarestType,
  isSQL: boolean,
  timeout?: number
}

export type Query = {
  query: string
}

export type AntarestType = 'antarest' | 'antarest-sql' | 'antarest-dynamo' | 'other'

export async function AxiosPromiseTranslator<T>(promise: AxiosPromise<any>, isList: boolean): Promise<AntarestResult<T>> {
  let p

  try {
    p = await promise
    if (p.status === 200) {
      return {
        status: p.data.status,
        msg: p.data.msg,
        payload: isList ? p.data.payload : p.data.payload[0]
      }
    }

    return {
      status: p.status,
      msg: p.statusText,
      payload: undefined
    }
  } catch (error) {
    return {
      status: 500,
      msg: 'Unexpected request error',
      payload: undefined
    }
  }
}

function getOptionsId(id: string | number, isSQL: boolean, identifier?: string) {
  let options

  if (identifier) {
    return {
      identifier: {'$eq': id}
    }
  }

  if (isSQL) { // PosgrestSQL
    options = { 'id': { '$eq': id } }
  } else { // mongoose
    options = { '_id': { '$eq': id } }
  }

  return options
}

export default class AntarestService<T> {
  private _isSQL: boolean
  protected _server: AxiosInstance
  protected _baseUrl: string
  protected _url: string
  protected _type: AntarestType

  constructor(config: Config) {
    this._baseUrl = config.baseUrl
    this._url = config.url ? config.url : ''
    this._isSQL = config.isSQL
    this._type = config.type

    this._server = Axios.create({
      baseURL: this._baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      timeout: config.timeout ? config.timeout : 6666
    })
  }

  // Common method
  public async create(objectType: T): Promise<AntarestResult<T[]>> {
    const promise = this._server.post(this._url, objectType)
    return await AxiosPromiseTranslator<T[]>(promise, true)
  }

  public async get(options?: Comparator): Promise<AntarestResult<T[]>> {
    let promise

    if (options) {
      promise = this._server.post(this._url + '/search', options)
    } else {
      promise = this._server.get(this._url)
    }

    return await AxiosPromiseTranslator<T[]>(promise, true)
  }

  public async update(conditions: Comparator, patch: Patcher): Promise<AntarestResult<T[]>> {
    const promise = this._server.patch(this._url, { conditions, patch })
    return AxiosPromiseTranslator<T[]>(promise, true)
  }

  public async delete(conditions: Comparator): Promise<AntarestResult<T[]>> {
    const promise = this._server.patch(this._url, { conditions, patch: { deletedAt: Date.now() } })
    return await AxiosPromiseTranslator<T[]>(promise, true)
  }

  // Manipulate by Id
  public async getById(id: number | string, identifier?: string): Promise<AntarestResult<T[]>> {
    let promise

    if (identifier) {
      promise = await this.get(getOptionsId(id, this._isSQL, identifier))
    } else {
      promise = await this.get(getOptionsId(id, this._isSQL))
    }

    return {
      status: promise.status,
      msg: promise.msg,
      payload: promise.payload
    }
  }

  public async updateById(id: number | string, patch: object, identifier?: string): Promise<AntarestResult<T[]>> {
    let promise

    if (identifier) {
      promise = await this.update(getOptionsId(id, this._isSQL, identifier), patch)
    } else {
      promise = await this.update(getOptionsId(id, this._isSQL), patch)
    }

    return {
      status: promise.status,
      msg: promise.msg,
      payload: promise.payload
    }
  }

  public async deleteById(id: number | string, identifier?: string): Promise<AntarestResult<T[]>> {
    let promise

    if (identifier) {
      promise = await this.delete(getOptionsId(id, this._isSQL, identifier))
    } else {
      promise = await this.delete(getOptionsId(id, this._isSQL))
    }

    return {
      status: promise.status,
      msg: promise.msg,
      payload: promise.payload
    }
  }

  // Specific SQL function
  public async query(query: Query): Promise<AntarestResult<T[]>> {
    if (this._type === 'antarest-sql') {
      const promise = this._server.post(this._url, query)
      return await AxiosPromiseTranslator<T[]>(promise, true)
    } else {
      return {
        status: 403,
        msg: 'Forbidden operation for non antarest-sql microservice',
        payload: undefined
      }
    }
  }

  // Specific noSQL function
  public async aggregate(aggregator: Comparator[]): Promise<AntarestResult<T[]>> {
    if (this._type === 'antarest') {
      const promise = this._server.post(this._url, aggregator)
      return await AxiosPromiseTranslator<T[]>(promise, true)
    } else {
      return {
        status: 403,
        msg: 'Forbidden operation for non antarest service',
        payload: undefined
      }
    }

  }
}