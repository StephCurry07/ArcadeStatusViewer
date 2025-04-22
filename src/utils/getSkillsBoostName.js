import axios from 'axios';
import * as cheerio from 'cheerio';

async function getSkillsBoostName(profileUrl) {
  const response = await axios.get(profileUrl);
  const $ = cheerio.load(response.data);
  const name = $('#jump-content > div > h1').text();
  return name;
}

export default getSkillsBoostName;