const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoidmxhZGltaXJtYXRpYzIxIiwiYSI6ImNrOThyaXlncTA0bGszbW80ZG5qNTk4NTMifQ.KvZ8wOav8pXhQG67HoX-4w&limit=1";

  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback("Nema interneta il tako nesto!!", undefined);
    } else if (features.length === 0) {
      callback("Losa je lokacija,probaj drugu", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
