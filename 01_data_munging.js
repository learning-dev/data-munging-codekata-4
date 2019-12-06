const fs = require('fs');
const csv = require('fast-csv');


const listOfRows = [];
let count = 0;
const tempSpreads = {};

fs.createReadStream('./data/weather.dat')
  .pipe(csv.parse({ header: true }))
  .on('data', (entry) => {
    count += 1;
    let listOfStats = [];
    if (count > 2) {
      const word = entry[0].split(' ');
      listOfStats = word.filter((element) => element !== '');
      listOfRows.push(listOfStats);
    }
  })
  .on('end', () => {
    listOfRows.forEach((statsRow) => {
      let i = 1;
      while (i < 3) {
        if (statsRow[i].indexOf('*') !== 1) {
          const filteredItem = statsRow[i].replace('*', '');
          statsRow[i] = filteredItem;
        }
        tempSpreads[statsRow[0]] = statsRow[1] - statsRow[2];
        i += 1;
      }
    });
    const leastTempSpread = Math.min(...Object.values(tempSpreads));
    let leastTempDay;
    // eslint-disable-next-line no-restricted-syntax
    for (let day in tempSpreads) {
      if (tempSpreads[day] === leastTempSpread) {
        leastTempDay = day;
        break;
      }
    }
    console.log(`The least temp spread is on the day ${leastTempDay} with temperature spread of ${leastTempSpread}`);
  });
