const request = require('request-promise-native');

const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
}

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip
  return request(`https://api.ipbase.com/v2/info?apikey=SgxF2EePr8xjxt6hHpstdzhNIWhLYIDI1O3Flkta&language=en&ip=${ip}`);
}

const fetchISSFlyOverTimes = (body) => {
  const latitude = JSON.parse(body).data.location.latitude
  const longitude = JSON.parse(body).data.location.longitude
  const url = (`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
  return request(url);
}


const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


module.exports = { nextISSTimesForMyLocation,
                   printPassTimes
                 };





