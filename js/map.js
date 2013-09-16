        var map;
        var infowindow;
        var loc;
        $(document).ready(function () {
            console.log('document ready');
        function initialize() {
            getDefaultLocation()
            var mapOptions = {
                zoom: 13,
                center: loc,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById('map-canvas'),
                  mapOptions);
            var newLocation = new google.maps.LatLng(33.748995, -84.387982);
            var request = {
                location: newLocation,
                radius: 500,
                types: ['food']
            };
            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
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
            pos1 = position.coords.latitude;
            pos2 = position.coords.longitude;
            map.setCenter(loc, 13);
        }

        function error(msg) {
            alert('error: ' + msg);
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