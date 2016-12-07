 /*
            

            for i in obj["crimes"]:
                # checking number of individual crimes occuring
                if i["type"] in crime["crime_type_count"]:
                    crime["crime_type_count"][i["type"]] += 1
                else:
                    crime["crime_type_count"][i["type"]] = 1
                #checking time
                date= str(obj['crimes'][tCount]['date'])
                time = date[8:17]
                hr,min=time.split(":",1)
                min,dn=min.split(" ",1)
                hr=int(hr)
                min=int(min)
                if ((hr == 12 and min >= 1) or (hr >= 1 and hr <= 3)):
                    if ((min == 0 and dn == "AM") or (min >= 1 and dn == "AM" and (hr==12 or hr<3))):
                        crime["event_time_count"]["12:01am-3am"] += 1
                if ((hr == 3 and min >= 1) or (hr >= 4 and hr <= 6)):
                    if ((min == 0 and dn == "AM") or (min >= 1 and dn == "AM" and (hr==3 or hr<6))):
                        crime["event_time_count"]["3:01am-6am"] += 1
                if ((hr == 6 and min >= 1) or (hr >= 7 and hr <= 9)):
                    if ((min == 0 and dn == "AM") or (min >= 1 and dn == "AM" and (hr==6 or hr<9))):
                        crime["event_time_count"]["6:01am-9am"] += 1
                if ((hr == 9 and min >= 1) or (hr >= 10 and hr <= 12 )):
                    if ((min == 0 and dn == "AM" and hr!=12) or (min==0 and hr==12 and dn=="PM") or (min >= 1 and dn == "AM" and (hr==9 or hr<12))):
                        crime["event_time_count"]["9:01am-12noon"] += 1
                if ((hr == 12 and min >= 1) or (hr >= 1 and hr <= 3)):
                    if ((min == 0 and dn == "PM") or (min >= 1 and dn == "PM" and (hr==12 or hr<3))):
                        crime["event_time_count"]["12:01pm-3pm"] += 1
                if ((hr == 3 and min >= 1) or (hr >= 4 and hr <= 6)):
                    if ((min == 0 and dn == "PM") or (min >= 1 and dn == "PM" and (hr==3 or hr<6))):
                        crime["event_time_count"]["3:01pm-6pm"] += 1
                if ((hr == 6 and min >= 1) or (hr >= 7 and hr <= 9)):
                    if ((min == 0 and dn == "PM") or (min >= 1 and dn == "PM" and (hr==6 or hr<9))):
                        crime["event_time_count"]["6:01pm-9pm"] += 1
                if ((hr == 9 and min >= 1) or (hr >= 10 and hr <= 12)):
                    if ((min == 0 and dn == "PM") or (min==0 and hr==12 and dn=="AM") or (min >= 1 and dn == "PM" and (hr==9 or hr<12))):
                        crime["event_time_count"]["9:01pm-12midnight"] += 1
                tCount += 1


                # checking streets
                if "BLOCK OF" in i["address"]:
                    a, st = i["address"].split("OF", 1)
                    if st in addr["street"]:
                        addr["street"][st] += 1
                    else:
                        addr["street"][st] = 1
                elif "&" in i["address"]:
                    a, st = i["address"].split("&", 1)
                    if st in addr["street"] :
                        addr["street"][st] += 1
                    else:
                        addr["street"][st] = 1
                    if a in addr["street"]:
                        addr["street"][a] += 1
                    else:
                        addr["street"][a] = 1
                elif "BLOCK BLOCK" in i["address"]:
                    a, st = i["address"].split("BLOCK BLOCK", 1)
                    if st in addr["street"]:
                        addr["street"][st] += 1
                    else:
                        addr["street"][st] = 1
                elif "AND" in i["address"]:
                    a, st = i["address"].split("AND", 1)
                    if st in addr["street"] :
                        addr["street"][st] += 1
                    else:
                        addr["street"][st] = 1
                    if a in addr["street"]:
                        addr["street"][a] += 1
                    else:
                        addr["street"][a] = 1
            danList=sorted(addr["street"],key=addr["street"].get,reverse=True)
            crime["the_most_dangerous_streets"].append(danList[0])
            crime["the_most_dangerous_streets"].append(danList[1])
            crime["the_most_dangerous_streets"].append(danList[2])
            crime["total_crime"]= tCount

*/




var http = require('http');
var crimeResult=[];
function getCrime(lat,lon){
       
    var crimeRequest = "https://api.spotcrime.com/crimes.json?lat="+lat+"&lon="+lon+"&radius="+5+"&key=."
    var tCount=0;
    /*var crime = {
                "total_crime": 0,
                "crime_type_count": {
                },
                "the_most_dangerous_streets": [
                ],
                "event_time_count": {
                    "12:01am-3am": 0,
                    "3:01am-6am": 0,
                    "6:01am-9am": 0,
                    "9:01am-12noon": 0,
                    "12:01pm-3pm": 0,
                    "3:01pm-6pm": 0,
                    "6:01pm-9pm": 0,
                    "9:01pm-12midnight": 0
                }
    };
    var addr = {
             "street": {}
    };*/
    http.get(crimeRequest, function(resp){
        var body = "";
        resp.on('data', function(chunk){
            body += chunk;
        });
        resp.on('end', function(){
            if(resp.statusCode === 200) {
                try {
                    //Parse the data
                    var crimeDetails = JSON.parse(body);
                    /*data = filterJSON(crimeDetails, place);
                    crimeResult.push(data);  */                              
                    console.log(crimeDetails);
                } catch(error) {
                  //Parse Error
                  console.log("hiiiiii");
                  console.log(error.message);
                }

            }
        });
    }); 

}

/*function filterJSON(crimeDetails, location){
    var data = {
        place:location,
        temp: Math.round(weatherDetails.main.temp),
        description: weatherDetails.weather[0].description,
        humidity: weatherDetails.main.humidity + " % Humidity"
    };
    return data;
}
*/
module.exports.getCrime = getCrime();