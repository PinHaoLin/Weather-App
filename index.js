let weather = {
	"apiKey": "cc2bf3f19e65f1e40205480ff10d4b63",
	fetchWeather: function (city) {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q="
			+ city
			+ "&units=metric&appid="
			+ this.apiKey
		)
			.then((response) => response.json())
			.then((data) => this.displayWeather(data));
	},
	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		console.log(name, icon, description, temp, humidity, speed);
		document.querySelector(".city").innerText = "Weather in " + name;
		document.querySelector(".temp").innerText = temp + "°C";
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".description").innerText = description;
		document.querySelector(".humidity").innerText = "Humnidity: " + humidity + "%";
		document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
		document.querySelector(".weather").classList.remove("loading");
		document.body.style.backgroundImage = "url('https://source.unsplash.com/random/?" + name + "')";
	},
	search: function () {
		this.fetchWeather(document.querySelector(".search-bar").value);
	}
}

document.querySelector(".search button").addEventListener("click", function () {
	weather.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
	if (event.key == "Enter") {
		weather.search();
	}
})

weather.fetchWeather("Denver");
