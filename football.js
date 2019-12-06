File = require('./base/file.js');

class SoccerFile extends File {
  // eslint-disable-next-line no-useless-constructor
  constructor(filename, elementRow, firstIndex, secondIndex) {
    super(filename, elementRow, firstIndex, secondIndex);
    this.filename = filename;
  }

  printMinDiffTeam() {
    const team = super.readInputFileProcess();
    console.log('insdide foot', super.diffPair);
    console.log(`The Smallest diff Team is ${super.diffPair} with difference of ${super.diffPair}`);
  }
}

module.exports = SoccerFile;
