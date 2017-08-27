var moment = require('moment')();

var hour = moment.format('H');

console.log(hour)
if (10 <= hour && hour <= 16){
    console.log('Hello')
    console.log(hour)
}

