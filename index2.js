const { nextISSTimesForMyLocation } = require('./iss_promissed');
const { printPassTimes } = require('./iss_promissed');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });