import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchSheetData } from './src/utils/fetchSheetData.js';
import cors from 'cors';

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
    // const data = await fetchSheetData(); ← Comment this
    // res.json(data);
    res.json({ message: 'Test response' }); // Dummy response
  } catch (err) {
    console.error('Error in /api/profiles:', err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
