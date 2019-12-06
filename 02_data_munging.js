const fs = require('fs');
const csv = require('fast-csv');

const listOfRows = [];
let count = 0;
const tempSpreads = {};

fs.createReadStream('./data/football.dat')
  .pipe(csv.parse({ header: true }))
  .on('data', (entry) => {
    count += 1;
    let listOfStats = [];
    if (count > 1) {
      const word = entry[0].split(' ');
      listOfStats = word.filter((element) => element !== '');
      if (listOfStats.length > 1) {
        listOfRows.push(listOfStats);
      }
    }
  })
  .on('end', () => {
    listOfRows.forEach((statsRow) => {
      tempSpreads[statsRow[1]] = Math.abs(statsRow[6] - statsRow[8]);
    });

    const leastDiff = Math.min(...Object.values(tempSpreads));
    let leastDiffTeam;

    // eslint-disable-next-line no-restricted-syntax
    for (const day in tempSpreads) {
      if (tempSpreads[day] === leastDiff) {
        leastDiffTeam = day;
        break;
      }
    }
    console.log(`The Smallest diff Team is ${leastDiffTeam} with difference of ${leastDiff}`);
  });
