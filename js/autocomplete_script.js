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
            var coordinates = place.geometry.location;
            latitude = coordinates.lat();
            longitude = coordinates.lng();
            console.log("Lat - " + latitude + " Long - " + longitude );
        });
}