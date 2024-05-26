const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  let city = req.body.city;
  let unit = "metric";
  let apiKey = "67bae014ff5fcdd4d52e323c9168e94c";
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=" +
    unit +
    "&appid=" +
    apiKey;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      let temp = weatherData.main.temp;
      let description = weatherData.weather[0].description;
      let icon = weatherData.weather[0].icon;
      res.write("<p>The weather is " + description + "</p>");
      res.write(
        "<h1>The temperature in " +
          city +
          " is " +
          temp +
          " degree Celsius.</h1>"
      );
      res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`);
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is started");
});
