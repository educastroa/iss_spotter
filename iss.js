const request = require('request');

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API

  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      return callback(`Something went wrong ${error}`, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {

  request(`https://api.ipbase.com/v2/info?apikey=SgxF2EePr8xjxt6hHpstdzhNIWhLYIDI1O3Flkta&language=en&ip=${ip}`, (error, response, body) => {
    if (error) {
      return callback(`Something went wrong ${error}`, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }

    const lon = JSON.parse(body).data.location.longitude;
    const lat = JSON.parse(body).data.location.latitude;
    const coord = {
      latitude: lat,
      longitude: lon
    };
    callback(null, coord);
  });

};

const fetchISSFlyOverTimes = (coords, callback) => {

  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(`Something went wrong ${error}`, null);
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates. Response: ${body}`), null);
      return;
    }

    const data = JSON.parse(body).response;

    callback(null, data);
  });
};


const nextISSTimesForMyLocation = function (callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, times);
      });
    });
  });
};




module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};
