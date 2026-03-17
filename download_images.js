const fs = require('fs');
const https = require('https');
const path = require('path');

const urls = {
  // Days
  'roma.jpg': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1280&q=80',
  'firenze.jpg': 'https://images.unsplash.com/photo-1543429776-27826acbe1eb?auto=format&fit=crop&w=1280&q=80',
  'venezia.jpg': 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=1280&q=80',
  'milano.jpg': 'https://images.unsplash.com/photo-1520440229-6469a149ac59?auto=format&fit=crop&w=1280&q=80',
  'amalfi.jpg': 'https://images.unsplash.com/photo-1533676832693-021950e417fa?auto=format&fit=crop&w=1280&q=80',
  'matera.jpg': 'https://images.unsplash.com/photo-1622822165037-eb18e3ddc637?auto=format&fit=crop&w=1280&q=80',
  'sicilia.jpg': 'https://images.unsplash.com/photo-1588714477688-cf1aba81878d?auto=format&fit=crop&w=1280&q=80',
  
  // Gallery
  'g1.jpg': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
  'g2.jpg': 'https://images.unsplash.com/photo-1531572753322-ad0110ce36f1?auto=format&fit=crop&w=800&q=80',
  'g3.jpg': 'https://images.unsplash.com/photo-1581024316986-fca83bdf7baf?auto=format&fit=crop&w=800&q=80',
  'g4.jpg': 'https://images.unsplash.com/photo-1543429776-27826acbe1eb?auto=format&fit=crop&w=800&q=80',
  'g5.jpg': 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=800&q=80',
  'g6.jpg': 'https://images.unsplash.com/photo-1534359265607-b2a4de40a9e1?auto=format&fit=crop&w=800&q=80',
  'g7.jpg': 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80',
  'g8.jpg': 'https://images.unsplash.com/photo-1498307833015-e7b400441eb8?auto=format&fit=crop&w=800&q=80',
  'g9.jpg': 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
  'g10.jpg': 'https://images.unsplash.com/photo-1520440229-6469a149ac59?auto=format&fit=crop&w=800&q=80',
  'g11.jpg': 'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?auto=format&fit=crop&w=800&q=80',
  'g12.jpg': 'https://images.unsplash.com/photo-1598620617148-c9e8ddee6711?auto=format&fit=crop&w=800&q=80',
  'g13.jpg': 'https://images.unsplash.com/photo-1533676832693-021950e417fa?auto=format&fit=crop&w=800&q=80',
  'g14.jpg': 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=800&q=80',
  'g15.jpg': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  'g16.jpg': 'https://images.unsplash.com/photo-1622822165037-eb18e3ddc637?auto=format&fit=crop&w=800&q=80',
  'g17.jpg': 'https://images.unsplash.com/photo-1573152143286-0c422b4d2175?auto=format&fit=crop&w=800&q=80',
  'g18.jpg': 'https://images.unsplash.com/photo-1588714477688-cf1aba81878d?auto=format&fit=crop&w=800&q=80',
  'g19.jpg': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
  'g20.jpg': 'https://images.unsplash.com/photo-1503197979108-c824148ed116?auto=format&fit=crop&w=800&q=80'
};

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, function(response) {
      if(response.statusCode === 302 || response.statusCode === 301) {
         download(response.headers.location, dest).then(resolve);
         return;
      }
      response.pipe(file);
      file.on('finish', function() {
        file.close(resolve);
      });
    }).on('error', function(err) {
      fs.unlink(dest, () => reject(err));
    });
  });
}

(async () => {
    for (const [name, url] of Object.entries(urls)) {
        console.log(`Downloading ${name}...`);
        try {
            await download(url, path.join(dir, name));
        } catch(e) {
            console.error(`Failed: ${name}`, e.message);
        }
    }
    console.log('Done downloading images.');
})();
