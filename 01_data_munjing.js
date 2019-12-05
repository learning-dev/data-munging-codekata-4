const fs = require('fs');

const contents = fs.readFileSync('./data/weather.dat', 'utf8');
console.log(contents.length);
let json = JSON.parse(contents);
console.log(contents);
