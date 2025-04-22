import axios from 'axios';
import * as cheerio from 'cheerio';

try {
    // Await the axios call and get the response
    const response = await axios.get('https://www.cloudskillsboost.google/public_profiles/0201af2b-c2ca-46ab-92ce-2c2fca6a536d');
    // Load the HTML into cheerio
    const $ = cheerio.load(response.data);
    // Extract the name
    const name = $('#jump-content > div > h1').text();
    console.log(name);
  } catch (error) {
    console.error('Error fetching the profile:', error);
  }