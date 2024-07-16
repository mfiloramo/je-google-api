const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hellooooo!');
})

app.get('/googleapi', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    const query = req.query.q || 'example'; // Example query parameter

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

app.listen(port, () => {
  console.log(`Server is running on port ${ port }`);
});
