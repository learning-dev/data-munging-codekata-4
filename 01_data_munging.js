const fs = require('fs');
const csv = require('fast-csv');


const listOfTempSpread = [];
let count = 0;
let innerCount =0;

fs.createReadStream('./data/weather.dat')
  .pipe(csv.parse({ header: true }))
  .on('data', (entry) => {
    //console.log(entry);
    count += 1;
    if (count > 2) {
      let listOfStats = [];
      const word = entry[0].split(' ');
      listOfStats = word.filter((element) => element !== '');
      console.log(listOfStats);
    }
   });

// const fileData = fs.readFile('./data/weather.dat', "utf8", (err, data) => {
//   console.log(data);
// });

// console.log('fileData:', fileData);
