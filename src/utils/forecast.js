const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=06d59545dd1267cfcc5e86900ef71baa&query=" +
    lat +
    "," +
    long;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Prognoza nema!!!", undefined);
    } else if (body.error) {
      callback("Prognoza ima lose koordinate", undefined);
    } else {
      callback(
        undefined,
        "Temperatura : " +
          body.current.temperature +
          ", subjektivni osecaj : " +
          body.current.feelslike +
          "Vlaznost:" +
          body.current.humidity
      );
    }
  });
};

module.exports = forecast;
