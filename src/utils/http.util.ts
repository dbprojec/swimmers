import config from '../config';
export class HttpUtil {
    static httpUtil: HttpUtil;
    public static getInstance(): HttpUtil {
        if (this.httpUtil != null) {
            return this.httpUtil
        } else {
            this.httpUtil = new HttpUtil;
            return this.httpUtil
        }
    }
    private constructor() {}

    public getSwimmers() {
        fetch(config.url.api.local.swimmers.all, {method: "GET", headers: {
            "content-type": "application/json; charset=utf-8"
        }})
        .then(res => res.json())
        .catch(err => {})
    }
}