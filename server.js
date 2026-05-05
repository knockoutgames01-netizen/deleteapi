const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

// Use environment variables (IMPORTANT for security)
const TITLE_ID = process.env.TITLE_ID || "144B08";
const SECRET_KEY = process.env.SECRET_KEY || "MF9NINBDIST6W39N3P35UQDQTQEMHEHXXQK6P94Z65ND7ZDDYC";

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

        if (!response.ok) {
            return res.status(response.status).json({
                error: "PlayFab API error",
                details: data
            });
        }

        res.json({ success: true, data });

    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

// ✅ IMPORTANT FIX FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});