
const fs = require('fs');
const csv = require('fast-csv');


function parseLines(listOfRows) {
  const listFilterLines = [];
  listOfRows.forEach((row) => {
    let splitRows = row[0].split(' ');
    splitRows = splitRows.filter((element) => element !== '');
    splitRows.forEach((element, index, arr) => {
      if (element.includes('*')) {
        // eslint-disable-next-line no-param-reassign
        arr[index] = element.replace('*', '');
      }
      console.log(splitRows);
    });
    console.log(row);
    listFilterLines.push(splitRows);
  });
  return listFilterLines;
}


function calculateDifference(filteredRows, elementIndex, firstIndex, secondIndex) {
  const tempDiffPerDay = {};
  tempDiffPerDay[filteredRows[elementIndex]] = Math.abs(filteredRows[firstIndex] - filteredRows[secondIndex]);
  return tempDiffPerDay;
}

function findMinElementPair(diffPair) {
  const values = Object.values(diffPair);
  const minValue = Math.min(...values);
  let element;
  const entries = Object.entries(diffPair);
  // eslint-disable-next-line no-restricted-syntax
  for (const [entry, diff] of entries) {
    if (diff === minValue) {
      element = entry;
    }
  }
  return [element, minValue];
}

class File {
  constructor(filePath) {
    this.filePath = filePath;
    this.listOfRows = [];
    this.rowCount = 0;
  }

  async readInputFile() {
    await fs.createReadStream(this.filePath)
      .pipe(csv.parse({ ignoreEmpty: true }))
      .on('data', (line) => {
        // console.log(line);
        if (this.rowCount > 1 && line.length > 0) {
          this.listOfRows.push(line);
        }
        this.rowCount += 1;
      })
      .on('end', () => {
        const filteredLines = parseLines(this.listOfRows);
        const diffPair = calculateDifference(filteredLines, 0, 1, 2);
      });
  }
}

const fileObj = new File('./data/weather.dat');

let lines = fileObj.readInputFile();
