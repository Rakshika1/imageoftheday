import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("static")); // connected the frontend

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

app.get("/api/image", async ({ query: { date } }, res) => {
    if (!date || !dateFormatRegex.test(date)) {
        return res.status(400).json({ error: "Invalid date format. Please provide a date in YYYY-MM-DD format." });
    }

    try {
        const apiKey = process.env.API_KEY;
        const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Failed to fetch data from NASA API");
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching data from NASA API" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

