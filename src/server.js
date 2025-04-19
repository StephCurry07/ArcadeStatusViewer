import express from 'express';
import cors from 'cors';
import { fetchSheetData } from './utils/fetchSheetData.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000; // or any port you prefer

app.use(cors());

app.get('/api/profiles', async (req, res) => {
  try {
    const profiles = await fetchSheetData();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
