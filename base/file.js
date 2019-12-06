
const fs = require('fs');
const csv = require('fast-csv');


function parseLines(listOfRows) {
  const listFilterLines = [];
  listOfRows.forEach((row) => {
    let splitRows = row[0].split(' ');
    splitRows = splitRows.filter((element) => element !== '' || element.includes('-'));
    splitRows.forEach((element, index, arr) => {
      if (element.includes('*')) {
        // eslint-disable-next-line no-param-reassign
        arr[index] = element.replace('*', '');
      }
    });
    listFilterLines.push(splitRows);
  });
  return listFilterLines;
}


function calculateDifference(filteredRows, elementIndex, firstIndex, secondIndex) {
  const tempDiffPerDay = {};
  let minimum = null;
  let diffPair = [];
  let count = 0;
  filteredRows.forEach((row) => {
    tempDiffPerDay[row[elementIndex]] = Math.abs(row[firstIndex] - row[secondIndex]);
    if (count === 0) {
      minimum = tempDiffPerDay[row[elementIndex]];
      count += 1;
    }
    if (minimum > tempDiffPerDay[row[elementIndex]]) {
      minimum = tempDiffPerDay[row[elementIndex]];
      diffPair = [row[elementIndex], minimum];
    }
  });
  return diffPair;
}

class File {
  constructor(filePath, elementRow, firstIndex, secondIndex) {
    this.filePath = filePath;
    this.listOfRows = [];
    this.rowCount = 0;
    this.elementRow = elementRow;
    this.firstIndex = firstIndex;
    this.secondIndex = secondIndex;
    this.diffPair = '';
  }

  async readInputFileProcess() {
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csv.parse({ ignoreEmpty: true }))
        .on('data', (line) => {
          if (this.rowCount > 1 && line.length > 0) {
            this.listOfRows.push(line);
          }
          this.rowCount += 1;
        })
        .on('end', () => {
          const filteredLines = parseLines(this.listOfRows);
          this.diffPair = calculateDifference(filteredLines, this.elementRow, this.firstIndex, this.secondIndex);
          return resolve(this.diffPair);
        });
    });
  }
}

module.exports = File;
