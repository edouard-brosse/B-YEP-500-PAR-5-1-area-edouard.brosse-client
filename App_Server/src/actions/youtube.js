const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
const { google } = require('googleapis');

const API_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = "api_key";
const youtube = google.youtube({
  version: "v3",
  auth: API_KEY,
});

app.post("/ysearch", async (req, res, next) => {
  try {
    const searchQuery = req.body.search_query;
    const url = `${API_URL}/search?key=${API_KEY}&type=video&part=snippet&q=${searchQuery}`;

    const response = await axios.get(url);
    const titles = response.data.items.map((item) => item.snippet.title);

    res.send(titles);
  } catch (err) {
    next(err);
  }
});

app.post("/g-search", async (req, res, next) => {
  try {
    const searchQuery = req.body.search_query;
    const response = await youtube.search.list({
      part: "snippet",
      q: searchQuery,
      type: "video",
    });

    const titles = response.data.items.map((item) => item.snippet.title);
    res.send(titles);
  } catch (err) {
    next(err);
  }
});

module.exports = app;
