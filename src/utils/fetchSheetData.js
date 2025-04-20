import { google } from 'googleapis';
import { calculateArcadePoints } from './calculateArcadePoints.js';
import {format } from 'date-fns'; // Optional, helps with date formatting

import dotenv from 'dotenv';
dotenv.config();

const SHEETS_CONFIG = {
  spreadsheetId: '1x7v0Ympgb9yFSvYdTbaKrujK9Sp4g-cpgY5B-YxzynI', // Default fallback
  apiKey: process.env.GOOGLE_SHEETS_API_KEY,
  sheetTitle: 'GCAF25C1-IN-QML-TRU [19 Apr]', // Default fallback
  range: 'A7:K1000'
};


async function initializeConfig() {
  const [spreadsheetId, sheetTitle] = await getLatestSheetId();
  SHEETS_CONFIG.spreadsheetId = spreadsheetId;
  SHEETS_CONFIG.sheetTitle = sheetTitle;
}


async function getLatestSheetId() {
  const metadataSheetId = '1vwHMsC3rHMBN_UDU7zpjyvnnAqeD9ciWeQvvQtWRckQ';
  const range = 'Sheet2!A2:B';

  const sheets = google.sheets({ version: 'v4', auth: SHEETS_CONFIG.apiKey });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: metadataSheetId,
    range,
  });

  const rows = response.data.values;
  const latest = rows[rows.length - 1];
  const spreadsheetUrl = latest[1];
  const spreadsheetId = spreadsheetUrl.match(/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)[1];

  const formattedDate = format(latest[0], "d MMM");
  const expectedSheetName = `[${formattedDate}]`;

  const metadata = await sheets.spreadsheets.get({ spreadsheetId });

  const matchedSheet = metadata.data.sheets?.find(sheet =>
    sheet.properties?.title?.includes(expectedSheetName)
  );

  const sheetTitle = matchedSheet?.properties?.title;
  if (!sheetTitle) {
    throw new Error(`No matching sheet found with date: ${expectedSheetName}`);
  }

  return [spreadsheetId, sheetTitle];
}


export const fetchSheetData = async () => {
  try {
    // Initialize config first
    await initializeConfig();

    const sheets = google.sheets({ version: 'v4', auth: SHEETS_CONFIG.apiKey });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEETS_CONFIG.spreadsheetId,
      range: `${SHEETS_CONFIG.sheetTitle}!${SHEETS_CONFIG.range}`,
    });

    const rows = res.data.values || [];
    
    // Fix 4: Add error handling for empty data
    if (rows.length === 0) {
      throw new Error('No data found in specified range');
    }

    const profiles = {};

    // Fix 5: Add column index validation
    for (const row of rows) {
      if (!row[0]) continue;

      const profile = {
        profileUrl: row[0],
        access: row[2] || 'Unknown',
        milestone: row[3] || 'No',
        skillCount: parseInt(row[4] || '0', 10),
        skillNames: row[5] || '',
        arcadeCount: parseInt(row[6] || '0', 10),
        arcadeNames: row[7] || '',
        triviaCount: parseInt(row[8] || '0', 10),
        triviaNames: row[9] || '',
        labCount: parseInt(row[10] || '0', 10),
        labNames: row[11] || '',
        arcadePoints: 0
      };

      profile.arcadePoints = calculateArcadePoints(
        profile.arcadeCount + profile.triviaCount,
        profile.skillCount
      );
      
      profiles[profile.profileUrl] = profile;
    }

    return profiles;
  } catch (error) {
    console.error('Error in fetchSheetData:', error);
    throw new Error(`Data fetch failed: ${error.message}`);
  }
};
