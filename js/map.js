        var map;
        var infowindow;
        var loc;
        var geocoder;
        var MILE_RADIUS = 1609;
        $(document).ready(function () {
            console.log('document ready');
            function initialize() {
                getDefaultLocation();
                var mapOptions = {
                    zoom: 14,
                    center: loc,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById('map-canvas'),
                  mapOptions);
                geocoder = new google.maps.Geocoder();
                
            }
            initialize();
        //google.maps.event.addDomListener(window, 'load', initialize);
    });
        
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
        }
        
        function createMarker(place) {
            var placeLoc = place.geometry.location;
            var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent(place.name);
              infowindow.open(map, this);
          });
        }

        function getDefaultLocation() {
            if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(success, error);
           } else {
            alert('geolocation not supported');
        }
    }

    function success(position) {
        loc = new google.maps.LatLng(position.coords.latitude,
         position.coords.longitude);
        map.setCenter(loc, 13);
        newPlacesRequest(loc, MILE_RADIUS);
        latLngToZip(loc);
        
        

    }

    function newPlacesRequest(location, radius) {
        var typesToPlot = new Array();
        if(document.getElementById('bar-checkbox').checked) {
            typesToPlot.push('bar');
        }
        if(document.getElementById('liquorStore-checkbox').checked) {
            typesToPlot.push('liquor_store');
        }
        if(document.getElementById('nightClub-checkbox').checked) {
            typesToPlot.push('night_club');
        }
        
        var request = {
            location: location,
            radius: radius,
            types: typesToPlot
        };
        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }

    function error(msg) {

        return alert('error: ' + msg);
    }       
    

    function getZip()
    {
        return document.getElementById('zip-textbox').value;
        
    }
    
    function IsNumeric(input)
    {
        return (input - 0) == input && (input+'').replace(/^\s+|\s+$/g, "").length > 0;
    }
    
    function validateZip(zipcode) {
        if (zipcode.length == 5 && IsNumeric(zipcode)){
            return true;
        }
        return false;
    }

    function latLngToZip(location) {
       geocoder.geocode({'latLng': location}, function (res, status) {  
        var zipArray = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);  
        document.getElementById('zip-textbox').value = zipArray[1];
        

    });  
       
   }
   
   function plotZip(){
    var zip = getZip();
    if (validateZip(zip)){
        geocoder.geocode( { 'address': zip}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
        //Got result, center the map and put it out there
        var newLocation = results[0].geometry.location;
        map.setCenter(newLocation);
        newPlacesRequest(newLocation, MILE_RADIUS);
    } else {
        alert("Geocode was not successful for the following reason: " + status);
    }
});
    }
    else {
        alert('Please enter a Numeric 5 Digit ZIP code');
    }
}