// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

app.listen(port,()=>{
	console.log(`Connected to local server: Port ${port}`);
});

app.get("/", (req,res)=>{
	res.send("connected to the server");
});

//GET route that returns the projectData object in the server code
app.get("/recent", (req,res)=>{
	res.send(projectData);
});

//POST route that adds incoming data to projectData
app.post("/add", (req,res)=>{
	projectData.date = req.body.date;
	projectData.weather = req.body.weather;
	projectData.temp = req.body.temp;
	projectData.userResponse = req.body.userResponse;
	console.log("projectData has been updated with new user input");
});