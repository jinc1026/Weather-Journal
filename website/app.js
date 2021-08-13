/* Global Variables */
// Web API URL and apiKey info
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&units=imperial&appid=eb5a120ff7fc79e89928882f7c56d924";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add an event listener to the generate button to start async function to get weather info
document.getElementById("generate").addEventListener("click", weatherInfoCallBack);

function weatherInfoCallBack(){
	// Retreive the zipcode that user typed in
	const zipcode = document.getElementById("zip").value;

	getWeatherInfo(zipcode)
	.then(function(response){
		
		let feelings = document.getElementById("feelings").value;

		// Post the weather info on the server
		postWeatherInfo("/add",{
			date: newDate,
			weather: response.weather[0].main,
			temp: response.main.temp,
			userResponse: feelings
		})

	}).then(function(){
			// Retreive the most recent weather info and upate UI
			updateUI();

			// After successfully update UI, clear textboxes
			document.getElementById("zip").value = "";
			document.getElementById("feelings").value = "";
	})
};

const getWeatherInfo = async function(zip){
	const response = await fetch(baseUrl + zip + apiKey);

	if (!response.ok) {
		document.getElementById("date").innerHTML = "";
		document.getElementById("weather").innerHTML = "";
		document.getElementById("temp").innerHTML = "";
		document.getElementById("content").innerHTML = "";
		document.getElementById("error").innerHTML = "Incorrect Zipcode! Please double check the zipcode";
		throw new Error("Bad response from server");
	};

	try {
		const data = await response.json();
		return data;
	} catch(error) {
		console.log(`Error: ${error}`);
	}
};

const postWeatherInfo = async function(url="", data={}){
	const reponse = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
 	})

	try {
		const newData = await response.json();
		return newData;
	} catch (error){
		console.log("Error", error);
	}

};

const updateUI = async function(){
	const request = await fetch("/recent");

	try {
		const recentEntry = await request.json();
		console.log(recentEntry);
		document.getElementById("date").innerHTML = `Date: ${recentEntry.date}`;
		document.getElementById("weather").innerHTML = `Weather: ${recentEntry.weather}`;
		document.getElementById("temp").innerHTML = `Temperature(F): ${recentEntry.temp}`;
		document.getElementById("content").innerHTML = `User's Feeling: ${recentEntry.userResponse}`;
		document.getElementById("error").innerHTML = "";
	} catch (error) {
		console.log("Error", error);
	}
}