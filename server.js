import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchSheetData } from './src/utils/fetchSheetData.js';
import cors from 'cors';
import getSkillsBoostName from './src/utils/getSkillsBoostName.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors());


app.get('/api/profiles', async (req, res) => {
  try {
    const data = await fetchSheetData();
    res.json(data);
  } catch (err) {
    console.error('Error in /api/profiles:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Endpoint to fetch profile names for top 3 profiles
app.get('/api/fetch-profile-names', async (req, res) => {
  const { profiles } = req.query; // Receive the profiles as a query parameter
  if (!profiles) {
    return res.status(400).json({ error: 'Profiles are required' });
  }

  try {
    const profileUrls = profiles.split(','); // Assume profile URLs are passed as a comma-separated list
    const profileNames = {};

    // Fetch profile names for top 3 profiles
    for (const url of profileUrls) {
      const name = await getSkillsBoostName(url);
      profileNames[url] = name;
    }

    res.json(profileNames);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile names' });
  }
});


app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
