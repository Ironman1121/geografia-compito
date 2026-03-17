const fs = require('fs');
const https = require('https');
const path = require('path');

const images = {
  "roma.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/de/Colosseo_2020.jpg",
  "firenze.jpg": "https://upload.wikimedia.org/wikipedia/commons/2/29/Santa_Maria_del_Fiore_August_2024_02.jpg",
  "venezia.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/51/View_of_the_Grand_Canal_from_Rialto_to_Ca%27Foscari.jpg",
  "milano.jpg": "https://upload.wikimedia.org/wikipedia/commons/7/70/Milan_Cathedral_from_Piazza_del_Duomo.jpg",
  "amalfi.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Positano_Sunset.JPG",
  "matera.jpg": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Matera_-_View_from_Sant%27Agostino.jpg",
  "sicilia.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Aerial_image_of_the_coast_of_Taormina_%28view_from_the_southeast%29.jpg",
  
  "g1.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/53/Colosseum_in_Rome%2C_Italy_-_April_2007.jpg",
  "g2.jpg": "https://upload.wikimedia.org/wikipedia/commons/0/08/Piazza_Navona_%28Rome%29_at_night.jpg",
  "g3.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/f5/Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg",
  "g4.jpg": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Cattedrale_di_Santa_Maria_del_Fiore_%E2%80%93_Il_Duomo_di_Firenze.jpg",
  "g5.jpg": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Ponte_Vecchio_from_Ponte_alle_Grazie.jpg",
  "g6.jpg": "https://upload.wikimedia.org/wikipedia/commons/8/84/Michelangelo%27s_David_2015.jpg",
  "g7.jpg": "https://upload.wikimedia.org/wikipedia/commons/e/ee/Venezia_Canal_Grande_Ponte_di_Rialto.jpg",
  "g8.jpg": "https://upload.wikimedia.org/wikipedia/commons/c/c8/Gondola_Ride.jpg",
  "g9.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/17/Piazza_San_Marco_%28Venice%29_at_night-msu-2021-6449-.jpg",
  "g10.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Milan_Duomo_at_night.jpg",
  "g11.jpg": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Galleria_Milano_%28179532365%29.jpeg",
  "g12.jpg": "https://upload.wikimedia.org/wikipedia/en/5/53/Naviglio_e_alzaia.jpg",
  "g13.jpg": "https://upload.wikimedia.org/wikipedia/commons/9/9b/Positano_Sunset.JPG",
  "g14.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Amalfi_Coast_%28Italy%2C_October_2020%29_-_75_%2850558355441%29.jpg",
  "g15.jpg": "https://upload.wikimedia.org/wikipedia/commons/b/b1/Ravello-coastline.jpg",
  "g16.jpg": "https://upload.wikimedia.org/wikipedia/commons/a/a0/Matera_boenisch_nov_2005.jpg",
  "g17.jpg": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Matera_-_View_from_Sant%27Agostino.jpg",
  "g18.jpg": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Taormina_Theatre.jpg",
  "g19.jpg": "https://upload.wikimedia.org/wikipedia/commons/3/39/Mt_Etna_and_Catania1.jpg",
  "g20.jpg": "https://upload.wikimedia.org/wikipedia/commons/1/1b/Cefalu-bjs2007-01.jpg"
};

const publicDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(publicDir, filename);
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(images)) {
    try {
      await download(url, filename);
    } catch (err) {
      console.error(err.message);
    }
  }
}

run();
