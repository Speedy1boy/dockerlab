const express = require("express");

const IpApiProvider = require("./providers/ipapi");
const JsonIpProvider = require("./providers/jsonip");

const app = express();
const PORT = 8080;

function getProvider() {
    const type = process.env.TYPE || "ipapi";

    if (type === "ipapi") {
        return new IpApiProvider();
    }

    return new JsonIpProvider();
}

app.get("/", async (req, res) => {
    try {
        const provider = getProvider();
        const ip = await provider.getIp();
        res.json({ myIP: ip });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
