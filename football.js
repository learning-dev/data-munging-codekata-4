const File = require('./base/file.js');

class SoccerFile extends File {
  // eslint-disable-next-line no-useless-constructor
  constructor(filename, elementRow, firstIndex, secondIndex) {
    super(filename, elementRow, firstIndex, secondIndex);
    this.filename = filename;
  }

  printMinDiffTeam() {
    super.readInputFileProcess().then((element) => {
      console.log(`The Smallest diff Team is ${element[0]} with difference of ${element[1]} goal.`);
    });
  }
}

module.exports = SoccerFile;
