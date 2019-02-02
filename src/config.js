const gateway = "http://127.0.0.1:8080/api/v1/"
const _exports = {
    url: {
        api: {
            local: {
                swimmers: {
                    all: gateway + "swimmers/",
                    bestInSeason: gateway + "swimmers/season/",
                    gender: gateway + "swimmers/gender/",
                    age: gateway + "swimmers/age/"
                }
            }
        }
    }
};
export { _exports as config };