const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8080;

app.get("/", async (req, res) => {
    const type = process.env.TYPE || "ipapi";

    let url;
    if (type === "ipapi") {
        url = "http://ip-api.com/json/";
    } else {
        url = "https://jsonip.com/";
    }

    try {
        const response = await axios.get(url);
        const data = response.data;

        let ip;
        if (data.query) {
            ip = data.query; // ip-api
        } else if (data.ip) {
            ip = data.ip;    // jsonip.com
        } else {
            return res.status(500).json({ error: "IP not found" });
        }

        res.json({ myIP: ip });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
