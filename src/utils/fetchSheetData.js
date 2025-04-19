import { google } from 'googleapis';
import { SHEETS_CONFIG } from './sheetsConfig.js';
import { calculateArcadePoints } from './calculateArcadePoints.js';

export const fetchSheetData = async () => {
  try {
    const sheets = google.sheets({ version: 'v4', auth: SHEETS_CONFIG.apiKey });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEETS_CONFIG.spreadsheetId,
      range: `'${SHEETS_CONFIG.sheetTitle}'!A7:L`,
    });

    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      console.log('No data found.');
      return {};
    }

    const profiles = {};

    for (const row of rows) {
      const profileUrl = row[0]; // Assuming 'Profile URL' is column B (index 1)
      if (!profileUrl) continue;

      const profile = {
        profileUrl,
        access: row[2] || 'Unknown', // Access - column C
        milestone: row[3] || 'No', // Milestone - column D
        skillCount: parseInt(row[4] || '0', 10), // # of Skill - column F
        skillNames: row[5] || '', // Names of Skill - column G
        arcadeCount: parseInt(row[6] || '0', 10), // # of Arcade - column H
        arcadeNames: row[7] || '', // Names of Arcade - column I
        triviaCount: parseInt(row[8] || '0', 10), // # of Trivia - column J
        triviaNames: row[9] || '', // Names of Trivia - column K
        labCount: parseInt(row[10] || '0', 10), // # of Lab - column L
        labNames: row[11] || '', // not present in this range
        arcadePoints: 0,
      };

      profile.arcadePoints = calculateArcadePoints(
        profile.arcadeCount + profile.triviaCount,
        profile.skillCount
      );
      profiles[profileUrl] = profile;
    }

    return profiles;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    throw new Error('Failed to fetch profile data');
  }
};
