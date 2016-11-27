 var wayPts=[];
 var latLngPlaces=[];
 var boxCount = 1;
 var map;
 var origin_id;
 var dest_id;
function initMap() {       
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          center: {lat: 41.85, lng: -87.65}
        });
        directionsDisplay.setMap(map);
        document.getElementById('submit').addEventListener('click', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });                  
      }

function getPlaces(pac_input){
   var input = document.getElementById(pac_input);
        var options = {
            types : ['address']
        };
        var latitude;
        var longitude;
        autocomplete = new google.maps.places.Autocomplete(input, options);
        autocomplete.addListener('place_changed', function(){
            var place = autocomplete.getPlace();
            if (!place.geometry) {
              window.alert("Autocomplete's returned place contains no geometry");
              return;
            }
            
            latitude = place.geometry.location.lat();
            longitude = place.geometry.location.lng();
            var presentBox=pac_input.substring(9,10);
            latLngPlaces.splice(parseInt(presentBox),0,{latitude,longitude});
            if(parseInt(presentBox)==0)
              origin_id=place.place_id;
            else
            if(parseInt(presentBox)==1)
              dest_id=place.place_id;
            else
            wayPts.splice(parseInt(presentBox),0,{location:document.getElementById(pac_input).value, stopover: true});
            console.log("Lat - " + latitude + " Long - " + longitude +" boxno -"+presentBox );
            console.log(wayPts);                      
            console.log(latLngPlaces);
        });
}

//This function calculates the route and places markers on the recieved input... This is final function dont change anything in this..  
      function calculateAndDisplayRoute(directionsService, directionsDisplay) {              
        
        directionsService.route({
          origin: {'placeId': origin_id},
          destination: {'placeId': dest_id},
          waypoints: wayPts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);            
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      }

$(function () {  
    $(".add-button").bind("click", function () {
      boxCount++;
        var div = $("<div />");
        div.html('<input type="text" class="form-control address" id="pac-input'+ boxCount +'" onfocus="getPlaces(this.id)" placeholder="Intermediate Destination" />&nbsp;' +
            '<input type="button" value="X" class="btn btn-primary text-center remove" id="remove'+boxCount +'" />');
        $(".address-boxes").append(div);
    });    
    $("body").on("click", ".remove", function () {     
      boxCount--;            
        $(this).closest("div").remove();
    });
});
