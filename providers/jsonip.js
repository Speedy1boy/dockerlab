const axios = require("axios");
const IpProvider = require("./ip-provider");

class JsonIpProvider extends IpProvider {
    async getIp() {
        const response = await axios.get("https://jsonip.com/");
        return response.data.ip;
    }
}

module.exports = JsonIpProvider;
