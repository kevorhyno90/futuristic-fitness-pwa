import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public', 'exercises');

const exercisesToScrape = [
  { file: 'Walking.gif', slug: 'walking' },
  { file: 'Briskly-Walking.gif', slug: 'briskly-walking' }, // Guessing slug
  { file: 'Fast-Feet-Run.gif', slug: 'fast-feet-run' },
  { file: 'High-Knee-Skips.gif', slug: 'high-knee-skips' },
  { file: 'Running.gif', slug: 'running' },
  { file: 'Half-Kneeling-Hip-Flexor-Stretch.gif', slug: 'half-kneeling-hip-flexor-stretch' },
  { file: 'Inner-Thigh-Side-Stretch.gif', slug: 'inner-thigh-side-stretch' },
  { file: 'Standing-Cross-Leg-Hamstring-Stretch.gif', slug: 'standing-cross-leg-hamstring-stretch' },
  { file: 'Standing-Quadriceps-Stretch.gif', slug: 'standing-quadriceps-stretch' },
  { file: 'Mountain-Climber.gif', slug: 'mountain-climber' },
  { file: 'Crunches.gif', slug: 'crunches' },
  { file: 'Alternate-Heel-Touchers.gif', slug: 'alternate-heel-touchers' }
];

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const ex of exercisesToScrape) {
    const dest = path.join(publicDir, ex.file);
    try {
      console.log(`Fetching HTML for ${ex.slug}...`);
      const html = await fetchHTML(`https://fitnessprogramer.com/exercise/${ex.slug}/`);
      
      // Match the GIF url
      // e.g. src="https://fitnessprogramer.com/wp-content/uploads/2021/02/Mountain-climber.gif"
      const match = html.match(/src="([^"]+wp-content\/uploads\/[^"]+\.gif)"/i);
      
      if (match && match[1]) {
        const gifUrl = match[1];
        console.log(`Found GIF URL: ${gifUrl}. Downloading...`);
        await downloadFile(gifUrl, dest);
        console.log(`Successfully downloaded ${ex.file}`);
      } else {
        console.log(`Could not find GIF URL for ${ex.slug}`);
      }
    } catch (e) {
      console.error(`Error processing ${ex.slug}:`, e.message);
    }
  }
}

run();
