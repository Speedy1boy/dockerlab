const axios = require("axios");
const IpProvider = require("./ip-provider");

class IpApiProvider extends IpProvider {
    async getIp() {
        const response = await axios.get("http://ip-api.com/json/");
        return response.data.query;
    }
}

module.exports = IpApiProvider;
