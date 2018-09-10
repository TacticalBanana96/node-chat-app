const moment = require('moment');


// let date = new Date();
// console.log(date.getMonth());

// const date = moment();
//
// date.add(100, 'years').subtract(9, 'months');
// console.log(date.format('Do MMMM, YYYY'));


const someTimeStamp = moment().valueOf(); // just like new Date().getTime() but using moment
console.log(someTimeStamp);
const createdAt = 123456;
const date = moment(createdAt);
console.log(date.format('h:mm a'));
