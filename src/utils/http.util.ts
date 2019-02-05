import { config } from '../config';
import * as axios from 'axios'
export class HttpUtil {
    static httpUtil: HttpUtil;
    public static getInstance(): HttpUtil {
        if (this.httpUtil != null) {
            return this.httpUtil
        } else {
            this.httpUtil = new HttpUtil();
            return this.httpUtil
        }
    }
    private constructor() { }

    private _cache: any = {}

    fetchData(url: string) {
        if (Object.keys(this._cache).indexOf(url) > -1) {
            console.log(this._cache[url])
            return new Promise((succeed, fail) => {
                succeed({data: this._cache[url].data})
            })
        } else {
            // alert("returning from network")
            return axios.default.get(url, {
                headers: {
                    "content-type": "application/json; charset=utf-8"
                }
            }).then(res => {
                this._cache[url] = res.data
                return res.data
            })
        }
    }

    public cache(url: string, data: any) {
        if (Object.keys(this._cache).indexOf(url) < 0) {
            this._cache[url] = data
        }
    }

    get(expression: any, args: any) {
        // interprate expression
        if (expression.indexOf('gender') >=0) {
            return this.fetchData(config.url.api.local.swimmers.gender + args)
        } else if (expression.indexOf('age') >=0) {
            return this.fetchData(config.url.api.local.swimmers.age + args.min + '/' + args.max)
        } else if (expression.indexOf('in season ') >=0) {
            const { min, max } = args.split('to')
            return this.fetchData(config.url.api.local.swimmers.bestInSeason + `${args.season}/${args.ageGroup.min}/${args.ageGroup.max}`)
        } else {
            return this.fetchData(config.url.api.local.swimmers.all)
        }
    }
}