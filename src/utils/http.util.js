"use strict";
exports.__esModule = true;
var HttpUtil = /** @class */ (function () {
    function HttpUtil() {
    }
    HttpUtil.prototype.getInstance = function () {
        if (this.httpUtil != null) {
            return this.httpUtil;
        }
        else {
            this.httpUtil = new HttpUtil;
            return this.httpUtil;
        }
    };
    return HttpUtil;
}());
exports.HttpUtil = HttpUtil;
