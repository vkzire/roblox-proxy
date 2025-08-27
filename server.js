const express = require('express');
const axios = require('axios');
const app = express();

app.get('/api/servers/:placeId', async (req, res) => {
  const { placeId } = req.params;
  const { sortOrder = 'Desc', excludeFullGames = 'true', limit = '100' } = req.query;

  try {
    const response = await axios.get(
      `https://games.roblox.com/v1/games/${placeId}/servers/Public`,
      {
        params: { sortOrder, excludeFullGames, limit },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Roblox servers:', error.message);
    res.status(500).json({ error: 'Failed to fetch server list' });
  }
});

app.get('/', (req, res) => {
  res.send('Roblox Server List Proxy');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
