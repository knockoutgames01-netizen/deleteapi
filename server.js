const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

const TITLE_ID = "YOUR_PLAYFAB_TITLE_ID";
const SECRET_KEY = "YOUR_PLAYFAB_SECRET_KEY";

app.post("/api/deleteUser", async (req, res) => {
    const playFabId = req.body.playFabId;

    if (!playFabId) {
        return res.status(400).json({ error: "Missing PlayFabId" });
    }

    try {
        const response = await fetch(
            `https://${TITLE_ID}.playfabapi.com/Admin/DeletePlayer`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-SecretKey": SECRET_KEY
                },
                body: JSON.stringify({
                    PlayFabId: playFabId
                })
            }
        );

        const data = await response.json();
        res.json({ success: true, data });

    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});