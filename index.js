const express = require("express");
const mapbox = require("mapbox-gl");
const fs = require("fs");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey: "AIzaSyCswqWb8t4NbdCrREUeTj6EP9iWgM3zfWk"});

const app = express();

// Middleware to parse JSON payloads
app.use(express.json());

const port = 8001;

app.use(express.static(__dirname));

const url = `https://mapboxtest.onrender.com`; // Replace with your Render URL
const interval = 840000; // Interval in milliseconds (840000 14mins)

//Reloader Function
//https://dev.to/harshgit98/solution-for-rendercom-web-services-spin-down-due-to-inactivity-2h8i
function reloadWebsite() {
  fetch(url)
    .then(response => {
      console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}

//setInterval(reloadWebsite, interval);


app.get("/", (req, res) => {
  let doc = fs.readFileSync("index.html", "utf8");
  res.send(doc);
});

app.get("/alertsPage", (req, res) => {
  let doc = fs.readFileSync("alertsPage.html", "utf8");
  res.send(doc);
})

app.get("/geocoding", (req, res) => {
  let doc = fs.readFileSync("alerts.html", "utf8");
  res.send(doc);
});

app.get("/geocoding", (req, res) => {
  let doc = fs.readFileSync("geocoding.html", "utf8");
  res.send(doc);
});

app.get("/leaflet", (req, res) => {
  let doc = fs.readFileSync("leaflet.html", "utf8");
  res.send(doc);
});


app.post("/alerts", async (req, res) => {
  let { long , lat } = req.body;
  console.log("coor: " + lat + " " + long);
  const url = `http://api.weatherapi.com/v1/alerts.json?key=c6661021a65d4ee9905184055251305&q=${lat},${long}`;
  try {
    const response = await fetch(url);
    const alertsJson = await response.json();
    alertsArray = alertsJson.alerts.alert;
    console.log(alertsArray)
    let html = `<p>Location: ${alertsJson.location.name}</p>`
    alertsArray.forEach((alert) => {
      html += `
        <h3>event: ${alert.event}</h3>
        <p>severity: ${alert.severity}</p>
        <p>description: ${alert.desc}</p>
      `
    });
    //console.log(alertsJson);
    res.send(html);
  } catch (error) {
    console.error("error:", error);
    res.status(500).send("an error occured");
  }
  
})

let weatherAlerts = ["flooding", "heat", "storm", "earthquake", "wildfire", "blizzard"]
app.post("/getAdaptationTip", async (req, res) => {
  let { long , lat } = req.body;
  let randomNum = Math.floor(Math.random() * 5)
  let weatherAlert = weatherAlerts[randomNum];
  const response = await ai.models.generateContent( {
    model: "gemini-2.0-flash",
    contents: 
      `Present a speculative vision summary of the climate of area  with longitude ${long} and latitude ${lat} in the 
      next 10, 20, or 50 years based on available scientific data. Do not mention the coordinates.
      Mention the name of the location. Keep it within 50 words.`
      // `What is a past climate event (within the last 50 years) that happened in the area with longitude ${long} and latitude ${lat}?
      // Do not mention coordinates. Mention the name of the location.
      // Mention the date but do not mention that it is within the last 50 years.`
  });
  let text = response.text;
  //console.log(response)
  res.send(text)
})

// app.get("/alerts", async (req, res) => {
//   let apiKey = "eee2faeb9f8922bfd9a5fad074319f2c"
//   const url = `http://api.openweathermap.org/data/3.0/triggers?appid=${apiKey}`

//   let now = new Date();
//   let yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);


//   let data =
//   {
//     "time_period": {
//       "start":{
//          "expression":"after",
//          "amount":132000000
//       },
//       "end":{
//          "expression":"after",
//          "amount":432000000
//       }
//     },
//     "conditions": [
//       {
//         "name": "temp",
//         "expression": "$lt",
//         "amount": 260
//       }
//     ],
//     "area": [
//       {
//         "type": "Point",
//         "coordinates": [ 
//           53 , 37
//         ]
//       }
//     ]
//   }
//   const options = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: JSON.stringify(data)
//   };

  
//   try {
//     const response = await fetch(url, options);
//     const jsonData = await response.json();
//     let paramId = jsonData._id;

//     //console.log(jsonData);

//     const urlAlerts = `http://api.openweathermap.org/data/3.0/triggers/${paramId}?appid=${apiKey}`

//     const alertResponse = await fetch(urlAlerts);
//     const alertJson = await alertResponse.json();

//     console.log(alertJson);
//     res.send(JSON.stringify(alertJson));
//   } catch (error) {
//     console.error("error:", error);
//     res.status(500).send("an error occured");
//   }

// })

app.listen(port, () => {
  console.log("node app listening on port " + port);
})

