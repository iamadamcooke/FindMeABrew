        var map;
        var infowindow;
        var loc;
        $(document).ready(function () {
            console.log('document ready');
        function initialize() {
            getDefaultLocation();
            var mapOptions = {
                zoom: 15,
                center: loc,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map-canvas'),
                  mapOptions);
            
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
            newPlacesRequest(loc, 1609);

        }

        function newPlacesRequest(location, radius) {
            var request = {
                location: location,
                radius: radius,
                types: ['bar']
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
            return document.getElementById('TEXTBOX_ID').value;
            
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
        
        function plotZip(){
            var zip = getZip();
            if (validateZip(zip)){
                //logic for plotting
            }
            else {
                alert('Please enter a Numeric 5 Digit ZIP code');
            }
        }