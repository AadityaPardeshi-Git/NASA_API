const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

const NASA_API_KEY = 'ThBqzqy59KHboLZrLnCyudYqwFB1iHS5DqxNw7oP'; // Ensure you replace this with your actual API key

app.use(cors());

// Define the endpoint to fetch EPIC images
app.get('/api/epic', async (req, res) => {
  try {
    const response = await axios.get(`https://api.nasa.gov/EPIC/api/natural/images?api_key=ThBqzqy59KHboLZrLnCyudYqwFB1iHS5DqxNw7oP`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching EPIC data:', error.message);
    res.status(500).json({ error: 'Error fetching EPIC data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});