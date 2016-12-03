var http = require('http');
var weatherResult=[];
function getWeather(place){
	
	var apiKey = "26dc0300970ed498d0a15171d0cd79c4";
	var	weatherRequest = "http://api.openweathermap.org/data/2.5/weather?q="+ place +"&units=metric&appid="+apiKey;

	http.get(weatherRequest, function(resp){
		var body = "";
		resp.on('data', function(chunk){
			body += chunk;
		});
		resp.on('end', function(){
			if(resp.statusCode === 200) {
		        try {
		          	//Parse the data
		          	var weatherDetails = JSON.parse(body);
		          	data = filterJSON(weatherDetails, place);
		          	weatherResult.push(data);
		          	//Reading the file Synchronously
					/*html = fs.readFileSync('views/weather.html');
					html = html.toString();*/
					//Filter only the details we want from the entire JSON we got
					
				/*	for(var key in data){
						html = html.replace("[["+ key +"]]", data[key]);
					}
					response.write(html);
					response.end();
				*/	
				
				console.log(weatherResult);
		        } catch(error) {
		          //Parse Error
		          console.log("hiiiiii");
		          console.log(error.message);
		        }

		    }
		});
	});	

}

function filterJSON(weatherDetails, location){
	var data = {
		place:location,
		temp: Math.round(weatherDetails.main.temp),
		description: weatherDetails.weather[0].description,
		humidity: weatherDetails.main.humidity + " % Humidity"
	};
	return data;
}

module.exports.getWeather = getWeather;