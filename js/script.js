function initMap() {
        var myLatLng = {lat: 37.3352, lng: -121.8811};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
      }



$(function(){

    var boxCount = 2;

   $(".add-button").click(function(){
      boxCount++;
      var boxNum = boxCount;
      $(".address-boxes").append("<input type='text' class='form-control address' id='pac-input" + boxNum + "' onfocus='getPlaces(this.id)' placeholder='Destination'>");

   });

});