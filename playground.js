var moment = require('moment')();

var o = moment.add(15, 'hours').format('H');

if (10 <= o && 0 <= 16){
    console.log('Hello')
    console.log(o)
}

