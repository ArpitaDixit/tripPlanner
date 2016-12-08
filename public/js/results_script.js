$(document).ready(function(){
    $("ul li").click(function() {
        $(".active").removeClass("active");
        $(this).addClass("active");

        $(".overview-tab").click(function() {
            $(".weather").hide();
            $(".overview").show();
        });

        $(".weather-tab").click(function() {
            
            $(".overview").hide();
            $(".weather").show();
        });

    });

    var rows = $("#rows").html();
    console.log(rows);
    var total = 0;
    for(var i=1; i<=rows; i++){
    	 var uberPriceID =  "#uber" + i;
    	 var lyftPriceID =  "#lyft" + i;
    	 var resultPriceID =  "#result" + i;
    	 console.log(uberPriceID);
    	 var uberPrice = $(uberPriceID).html();
    	 var lyftPrice = $(lyftPriceID).html();
    	 console.log(uberPrice);
    	 console.log(lyftPrice);
         lyftPrice=parseFloat(lyftPrice);
         uberPrice=parseFloat(uberPrice);
    	 if(uberPrice<lyftPrice){
    	 	$(resultPriceID).html(uberPrice + '<img src="uber.png">');
    	 	total = parseFloat(total) + parseFloat(uberPrice);
    	 }
    	 else{
    	 	$(resultPriceID).html(lyftPrice + '<img src="lyft.png">');
    	 	total = total + parseFloat(lyftPrice);
    	 }

    }
    $("#total").html(total);
    $("#rows").hide();

});