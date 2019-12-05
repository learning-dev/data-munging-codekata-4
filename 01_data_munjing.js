const fs = require('fs');
const csv = require('fast-csv');

fs.createReadStream('./data/weather.dat')
  .pipe(csv.parse({ delimiter: '\t' }))
  .on('data', (entry) => {
    if (entry.length > 0) {
      const word = entry[0].split(' ');
      console.log(word);
      console.log(Array.isArray(word));
      word.forEach((element) => {
        if (element) {
          console.log(element);
        }
      });
    }
  });

const fileData = fs.readFile('./data/weather.dat', "utf8", (err, data) => {
  console.log(data[1]);
  return data;
});

//console.log('fileData:', fileData);
