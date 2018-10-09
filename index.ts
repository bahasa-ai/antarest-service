import Axios, { AxiosPromise, AxiosInstance } from 'axios'

export interface AntarestResult<T> {
  status: number,
  message: string,
  payload?: T
}

export interface Comparator {
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

export interface Patcher {
  [filed: string]: any
}

export interface Config {
  baseUrl: string,
  url?: string,
  isSQL: boolean,
  timeout?: number
}

async function ResultHanlder(promise: AxiosPromise<any>, isList: boolean) {
  let p

  try {
    p = await promise
    if (p.status === 200) {
      return {
        status: p.data.status,
        message: p.data.msg,
        payload: isList ? p.data.payload : p.data.payload[0]
      }
    }

    return {
      status: p.status,
      message: p.statusText,
      payload: undefined
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Unexpected request error',
      payload: undefined
    }
  }
}

function getOptionsId(id: string | number, isSQL: boolean) {
  let options

  if (this._isSQL) { // SQL
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

  constructor(config: Config) {
    this._baseUrl = config.baseUrl
    this._url = config.url ? config.url : ''
    this._isSQL = config.isSQL

    this._server = Axios.create({
      baseURL: this._baseUrl,
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      timeout: config.timeout ? config.timeout : 6666
    })
  }

  public async create(objectType: T): Promise<AntarestResult<T>> {
    const promise = this._server.post(this._url, objectType)
    return await ResultHanlder(promise, false)
  }

  public async get(options?: Comparator): Promise<AntarestResult<T[]>> {
    let promise

    if (options) {
      promise = this._server.post(this._url + '/search', options)
    } else {
      promise = this._server.get(this._url)
    }

    return await ResultHanlder(promise, true)
  }

  public async update(conditions: Comparator, patch: Patcher): Promise<AntarestResult<T[]>> {
    const promise = this._server.patch(this._url, { conditions, patch })
    return ResultHanlder(promise, true)
  }

  public async delete(conditions: Comparator): Promise<AntarestResult<T[]>> {
    const promise = this._server.patch(this._url, { conditions, patch: { deletedAt: Date.now() } })
    return await ResultHanlder(promise, true)
  }

  // Manipulate by Id
  public async getById(id: number | string): Promise<AntarestResult<T>> {
    const promise = await this.get(getOptionsId(id, this._isSQL))

    return {
      status: promise.status,
      message: promise.message,
      payload: promise.payload ? promise.payload[0] : undefined
    }
  }

  public async updateById(id: number | string, patch: object): Promise<AntarestResult<T>> {
    const promise = await this.update(getOptionsId(id, this._isSQL), patch)

    return {
      status: promise.status,
      message: promise.message,
      payload: promise.payload ? promise.payload[0] : undefined
    }
  }

  public async deleteById(id: number | string): Promise<AntarestResult<T>> {
    const promise = await this.delete(getOptionsId(id, this._isSQL))

    return {
      status: promise.status,
      message: promise.message,
      payload: promise.payload ? promise.payload[0] : undefined
    }
  }

  // Specific SQL function
  public async query(query: object): Promise<AntarestResult<T[]>> {
    if (!this._isSQL) {
      return {
        status: 403,
        message: 'Forbidden operation for SQL database',
        payload: undefined
      }
    }

    const promise = this._server.post(this._url, query)

    return await ResultHanlder(promise, true)
  }

  // Specific noSQL function
  public async aggregate(aggregator: Comparator[]): Promise<AntarestResult<T[]>> {
    if (this._isSQL) {
      return {
        status: 403,
        message: 'Forbidden operation for noSQL database',
        payload: undefined
      }
    }

    const promise = this._server.post(this._url, aggregator)

    return await ResultHanlder(promise, true)
  }
}