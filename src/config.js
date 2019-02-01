var config = {
    url: {
        api: {
            local: {
                gateway: "http://127.0.0.1:8000/",
                swimmers: {
                    all: this.gateway + "swimmers/",
                    bestInSeason: this.gateway +"swimmers/season/",
                    gender: this.gateway + "swimmers/gender/",
                    age: this.gateway + "swimmers/age/"
                }
            }
        }
    }
}
module.exports = config