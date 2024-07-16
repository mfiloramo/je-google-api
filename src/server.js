// MODULE INPORTS
const express = require('express');
const axios = require('axios');
require('dotenv').config();

// SET UP SERVER
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('This is working and deployed!');
})

// CALL GOOGLE API
app.get('/googleapi', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const query = req.query.q || 'example';

    const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
      params: {
        key: apiKey,
        q: query,
        cx: 'your_custom_search_engine_id'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong!');
  }
});

// RUN SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${ port }`);
});
