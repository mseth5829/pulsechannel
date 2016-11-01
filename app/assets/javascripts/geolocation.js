$(document).on('turbolinks:load', function () {

var current_event_address
// Map functionality
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(0, 0),
    zoom: 1
  });

  map.setOptions({styles: styles['night']});


  if ("true" == gon.inChannel){
    //Create marker for current location for event if it exists
    var eventPos = {
      lat: parseFloat(gon.current_location_coordinates[0]),
      lng: parseFloat(gon.current_location_coordinates[1])
    }

    var eventMarker
    eventMarker = new google.maps.Marker({
        position: eventPos,
        map: map,
        title: gon.current_slug,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    });

    var eventgeocoder = new google.maps.Geocoder()
    var eventinfoWindow = new google.maps.InfoWindow()

    google.maps.event.addListener(eventMarker, 'click', (function() {
      eventgeocoder.geocode({'location': eventMarker.position}, function(results) {
          var area = results[1].address_components[0].long_name
          var address= results[0].formatted_address
          current_event_address = address
          eventinfoWindow.setContent('<div><strong>' + eventMarker.title + '</strong><br>' +
            address + '</div>');
          eventinfoWindow.open(map, eventMarker)
        })
      })
    )


    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    })

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      var tempmarkers = [];
      var tempmarker
      tempmarkers.forEach(function(tempmarker) {
        tempmarker.setMap(null);
      });

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        console.log(place.geometry)
        newLocLatitude = place.geometry.location.lat()
        newLocLongitude = place.geometry.location.lng()
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        // Create a marker for each place.
        tempmarkers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      map.setZoom(12)

      var markers = [];
      var channels = gon.channels

      if (undefined == gon.inChannel) {
        for(i=0;i<channels.length;i++){
          var locDetails = [channels[i].event, channels[i].locationLatitude,channels[i].locationLongitude]
          markers.push(locDetails)
          console.log(markers)
        }
      }

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
        geocoder.geocode({'location': homeMarker.position}, function(results) {
            var area = results[1].address_components[0].long_name
            var address= results[0].formatted_address
            infoWindow.setContent('<div><strong>' + homeMarker.title + '</strong><br>' +
              address + '</div>');
            infoWindow.open(map, homeMarker)
          })
        })
      )

      if (undefined == gon.inChannel) {
        // Loop through array of markers & place each one on the map
        for( i = 0; i < markers.length; i++ ) {
          var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
          marker = new google.maps.Marker({
              position: position,
              map: map,
              title: markers[i][0],
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
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
      }
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}


//Save longitude and latitude data to be passed to controller
var newLocLongitude
var newLocLatitude
var locationArray = [newLocLatitude, newLocLongitude];


$(document).ready(function() {
  $("#addLocation").click(function(){
    $.ajax({
     type: "PUT",
     url: "/pulsechannels/"+gon.current_slug,
     data: { pulsechannel: {locationLongitude: newLocLongitude, locationLatitude: newLocLatitude} },
     error: function(e) {
        console.log(e);
      }
    })
 })

 $('#pac-input').keydown(function (event) {
   if (event.keyCode == 13) {
     $.ajax({
      type: "PUT",
      url: "/pulsechannels/"+gon.current_slug,
      data: { pulsechannel: {locationLongitude: newLocLongitude, locationLatitude: newLocLatitude} },
      error: function(e) {
         console.log(e);
       }
     })
   }
 })

})

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


var styles = {
  night: [
   {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
   {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
   {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
   {
     featureType: 'administrative.locality',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'poi',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'poi.park',
     elementType: 'geometry',
     stylers: [{color: '#263c3f'}]
   },
   {
     featureType: 'poi.park',
     elementType: 'labels.text.fill',
     stylers: [{color: '#6b9a76'}]
   },
   {
     featureType: 'road',
     elementType: 'geometry',
     stylers: [{color: '#38414e'}]
   },
   {
     featureType: 'road',
     elementType: 'geometry.stroke',
     stylers: [{color: '#212a37'}]
   },
   {
     featureType: 'road',
     elementType: 'labels.text.fill',
     stylers: [{color: '#9ca5b3'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'geometry',
     stylers: [{color: '#746855'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'geometry.stroke',
     stylers: [{color: '#1f2835'}]
   },
   {
     featureType: 'road.highway',
     elementType: 'labels.text.fill',
     stylers: [{color: '#f3d19c'}]
   },
   {
     featureType: 'transit',
     elementType: 'geometry',
     stylers: [{color: '#2f3948'}]
   },
   {
     featureType: 'transit.station',
     elementType: 'labels.text.fill',
     stylers: [{color: '#d59563'}]
   },
   {
     featureType: 'water',
     elementType: 'geometry',
     stylers: [{color: '#17263c'}]
   },
   {
     featureType: 'water',
     elementType: 'labels.text.fill',
     stylers: [{color: '#515c6d'}]
   },
   {
     featureType: 'water',
     elementType: 'labels.text.stroke',
     stylers: [{color: '#17263c'}]
   }
  ]
}

$('#editchannel').click(function(){
 initMap()
});


})
