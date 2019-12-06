const Football = require('./football');
const Weather = require('./weather');

const footballObj = new Football('./data/football.dat', 1, 6, 8);
footballObj.printMinDiffTeam();

const weatherObj = new Weather('./data/weather.dat', 0, 1, 2);
weatherObj.printMinTempSpread();
