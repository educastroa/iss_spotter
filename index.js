// const { fetchMyIP } = require('./iss');
// const { fetchCoordsByIP } = require('./iss');
// const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });



// fetchCoordsByIP('174.119.117.54', (error, location) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned coordinates:' , location);
// });



// fetchISSFlyOverTimes({ latitude: 42.99271011352539, longitude: -81.16863250732422 }, (error, risetime) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned rise time and duration:' , risetime);
// });



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (let x of passTimes) {
    console.log(`Next pass at ${x.risetime} for ${x.duration} seconds!`);
  }
  
});