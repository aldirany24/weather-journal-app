// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express")
// Start up an instance of app
const app = express()
/* Middleware*/
const bodyParser = require("body-parser")

//Here we are configuring express to use body-parser as middle-ware.
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors")
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

// creating my local server

const server = app.listen(port, listening);
// callback to debug
function listening(){
    console.log("server running");
    console.log(`running on localhost: ${port}`);
};

// Get data
app.get('/all', (req, res) => {
  res.send(projectData);
})

// post data (spread operator)
app.post('/add', (req, res) => {
  projectData = {...req.body} 
  res.send()
})

