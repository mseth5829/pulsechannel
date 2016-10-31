// Map functionality

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(0, 0),
    zoom: 1
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      map.setZoom(12)

      var markers = [
              ['East Coast Park', 1.3007842,103.9121866],
              ['Marina Bay Sands', 1.283732,103.8592637]
      ];

      // Display multiple markers on a map
      var infoWindow = new google.maps.InfoWindow(), marker, i;
      var geocoder = new google.maps.Geocoder(), marker, i;
      var service = new google.maps.places.PlacesService(map);

      //Create home marker
      var homeMarker
      homeMarker = new google.maps.Marker({
          position: pos,
          map: map,
          title: 'Current Location'
      });

      homeMarker.setAnimation(google.maps.Animation.BOUNCE)
      google.maps.event.addListener(homeMarker, 'click', (function() {
        console.log("Getting to home click")
        geocoder.geocode({'location': homeMarker.position}, function(results) {
            var area = results[1].address_components[0].long_name
            var address= results[0].formatted_address
            infoWindow.setContent('<div><strong>' + homeMarker.title + '</strong><br>' +
              address + '</div>');
            infoWindow.open(map, homeMarker)
          })
        })
      )


      // Loop through our array of markers & place each one on the map
      for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        google.maps.event.addListener(marker, 'click', (function(marker) {
          return function() {
            geocoder.geocode({'location': marker.position}, function(results) {
                var area = results[1].address_components[0].long_name
                var address= results[0].formatted_address
                infoWindow.setContent('<div><strong>' + marker.title + '</strong><br>' +
                  address + '</div>');
                infoWindow.open(map, marker)
              });
          }
        })(marker, i));
      }
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
