const File = require('./base/file.js');

class WeatherFile extends File {
  // eslint-disable-next-line no-useless-constructor
  constructor(filename, elementRow, firstIndex, secondIndex) {
    super(filename, elementRow, firstIndex, secondIndex);
    this.filename = filename;
  }

  printMinTempSpread() {
    super.readInputFileProcess().then((element) => {
      console.log(`Minimum Temperature Spread is on day ${element[0]} with Temperature spread of ${element[1]}.`);
    });
  }
}

module.exports = WeatherFile;