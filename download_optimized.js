const fs = require('fs');
const https = require('https');
const path = require('path');

const imageList = [
  { name: "roma.jpg", title: "File:Colosseo_2020.jpg", width: 1600 },
  { name: "firenze.jpg", title: "File:Firenze_-_Santa_Maria_del_Fiore.jpg", width: 1600 },
  { name: "venezia.jpg", title: "File:View_of_the_Grand_Canal_from_Rialto_to_Ca%27Foscari.jpg", width: 1600 },
  { name: "milano.jpg", title: "File:Milan_Cathedral_from_Piazza_del_Duomo.jpg", width: 1600 },
  { name: "amalfi.jpg", title: "File:Positano_Sunset.JPG", width: 1600 },
  { name: "matera.jpg", title: "File:Matera_-_View_from_Sant%27Agostino.jpg", width: 1600 },
  { name: "sicilia.jpg", title: "File:Aerial_image_of_the_coast_of_Taormina_%28view_from_the_southeast%29.jpg", width: 1600 },
  
  { name: "g1.jpg", title: "File:Colosseum_in_Rome%2C_Italy_-_April_2007.jpg", width: 800 },
  { name: "g2.jpg", title: "File:Piazza_Navona_%28Rome%29_at_night.jpg", width: 800 },
  { name: "g3.jpg", title: "File:Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg", width: 800 },
  { name: "g4.jpg", title: "File:Cattedrale_di_Santa_Maria_del_Fiore_%E2%80%93_Il_Duomo_di_Firenze.jpg", width: 800 },
  { name: "g5.jpg", title: "File:Ponte_Vecchio_from_Ponte_alle_Grazie.jpg", width: 800 },
  { name: "g6.jpg", title: "File:Michelangelo%27s_David_2015.jpg", width: 800 },
  { name: "g7.jpg", title: "File:Venezia_Canal_Grande_Ponte_di_Rialto.jpg", width: 800 },
  { name: "g8.jpg", title: "File:Gondola_Ride.jpg", width: 800 },
  { name: "g9.jpg", title: "File:Piazza_San_Marco_%28Venice%29_at_night-msu-2021-6449-.jpg", width: 800 },
  { name: "g10.jpg", title: "File:Milan_Duomo_at_night.jpg", width: 800 },
  { name: "g11.jpg", title: "File:Galleria_Milano_%28179532365%29.jpeg", width: 800 },
  { name: "g12.jpg", title: "File:Naviglio_e_alzaia.jpg", width: 800 },
  { name: "g13.jpg", title: "File:Positano_Sunset.JPG", width: 800 },
  { name: "g14.jpg", title: "File:Amalfi_Coast_%28Italy%2C_October_2020%29_-_75_%2850558355441%29.jpg", width: 800 },
  { name: "g15.jpg", title: "File:Ravello-coastline.jpg", width: 800 },
  { name: "g16.jpg", title: "File:Matera_boenisch_nov_2005.jpg", width: 800 },
  { name: "g17.jpg", title: "File:Matera_-_View_from_Sant%27Agostino.jpg", width: 800 },
  { name: "g18.jpg", title: "File:Taormina_Theatre.jpg", width: 800 },
  { name: "g19.jpg", title: "File:Mt_Etna_and_Catania1.jpg", width: 800 },
  { name: "g20.jpg", title: "File:Cefalu-bjs2007-01.jpg", width: 800 }
];

const publicDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function getThumbUrl(title, width) {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=imageinfo&iiprop=url&iiurlwidth=${width}&format=json`;
    https.get(url, { headers: { 'User-Agent': 'ItaliaApp/1.0' } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          const thumbUrl = pages[pageId].imageinfo[0].thumburl;
          resolve(thumbUrl);
        } catch (e) {
          reject(new Error(`No thumb for ${title}`));
        }
      });
    }).on('error', reject);
  });
}

function download(url, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(publicDir, filename);
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'ItaliaApp/1.0' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Status ${res.statusCode} for ${filename}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const img of imageList) {
    try {
      console.log(`Getting thumb for ${img.name}...`);
      const thumbUrl = await getThumbUrl(img.title, img.width);
      await download(thumbUrl, img.name);
    } catch (e) {
      console.error(`Error ${img.name}: ${e.message}`);
    }
  }
}

run();
