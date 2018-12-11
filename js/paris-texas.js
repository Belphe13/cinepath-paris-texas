/*
*   Route animation based on actual film locations of
*   Paris, Texas by Wim Wender in 1984 using Google
*   Maps API.
*
*   Solid line indicates walk/drive;
*   Dashed line indicates fly/jumps;
*
*   Possible Future Improvements:
*     1. Detailed line colors?
*     2. Potential smooth PanTo?
*     3. jump2/3(map) discard???
*/

var map;

async function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 5,
         disableDefaultUI: true,
         center: new google.maps.LatLng(28.633439, -106.071533),
         styles: [{elementType: 'geometry', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
           {featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}]},
           {featureType: 'poi', elementType: 'labels.text.fill', stylers: [{color: '#d59563'}]},
           {featureType: 'poi.park', elementType: 'geometry', stylers: [{color: '#263c3f'}]},
           {featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{color: '#6b9a76'}]},
           {featureType: 'road', elementType: 'geometry', stylers: [{color: '#38414e'}]},
           {featureType: 'road', elementType: 'geometry.stroke', stylers: [{color: '#212a37'}]},
           {featureType: 'road', elementType: 'labels.text.fill', stylers: [{color: '#9ca5b3'}]},
           {featureType: 'road.highway', elementType: 'geometry', stylers: [{color: '#746855'}]},
           {featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{color: '#1f2835'}]},
           {featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{color: '#f3d19c'}]},
           {featureType: 'transit', elementType: 'geometry', stylers: [{color: '#2f3948'}]},
           {featureType: 'transit.station',elementType: 'labels.text.fill',stylers: [{color: '#d59563'}]},
           {featureType: 'water', elementType: 'geometry', stylers: [{color: '#17263c'}]},
           {featureType: 'water', elementType: 'labels.text.fill', stylers: [{color: '#515c6d'}]},
           {featureType: 'water', elementType: 'labels.text.stroke', stylers: [{color: '#17263c'}]}
         ]
       });

       getDirections1(map);     // 2000 * 2

       setTimeout(function(){
         jump1(map);            // 100 * 2
       }, 4000);

       setTimeout(function(){
         getDirections2(map);   // 2900 * 2
       }, 4200);

      setTimeout(function(){
        getDirections3(map);    // 2000 * 2
      }, 10000);

      setTimeout(function(){
        getDirections4(map);    // 3000 * 2
      }, 14000);

      setTimeout(function(){
        jump2(map);             // 250 * 2
      }, 20000);

      setTimeout(function(){
        getDirections5(map);    // (2000 + 13 * 60) * 2
      }, 20500);

      setTimeout(function(){
        getDirections6(map);    // (2000 + 20 * 60) * 2
      }, 26060);

      setTimeout(function(){
        jump3(map);
      }, 32460);

}

/* Travel Modes
*  Walking speed: 15
*  Driving speed: 15
*  Fast Driving: 10
*/
function walking(map, pathCoords) {
    var route = new google.maps.Polyline({
        path: [],
        geodesic : true,
        strokeColor: 'white',
        strokeOpacity: 0.5,
        strokeWeight: 5,
        editable: false,
        map:map
    });

    for (var i = 0; i < pathCoords.length; i++) {
        setTimeout(function(coords) {
            route.getPath().push(coords);
        }, 15 * i, pathCoords[i]);
    }
}

function driving(map, pathCoords) {
    var route = new google.maps.Polyline({
        path: [],
        geodesic : true,
        strokeColor: 'white',
        strokeOpacity: 0.5,
        strokeWeight: 5,
        editable: false,
        map:map
    });

    for (var i = 0; i < pathCoords.length; i++) {
        setTimeout(function(coords) {
            route.getPath().push(coords);
        }, 15 * i, pathCoords[i]);
    }
}

function fastDriving(map, pathCoords) {
    var route = new google.maps.Polyline({
        path: [],
        geodesic : true,
        strokeColor: 'white',
        strokeOpacity: 0.5,
        strokeWeight: 5,
        editable: false,
        map:map
    });

    for (var i = 0; i < pathCoords.length; i++) {
        setTimeout(function(coords) {
            route.getPath().push(coords);
        }, 5 * i, pathCoords[i]);
    }
}

// Travis Walking 0:58 - 6:59
function getDirections1(map) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
              origin: new google.maps.LatLng(29.127178, -103.242195),       // Big Bend National Park
              waypoints: google.maps.LatLng(29.321473, -103.615719),        // Terlingua
              destination: new google.maps.LatLng(29.622680, -103.572845),   // Terlingua M.D. Clinc
              travelMode: google.maps.TravelMode.WALKING
          };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            walking(map, result.routes[0].overview_path);
        }
    });
}

// Walter flys from LA 6:59
function jump1(map) {
  var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 0.5,
    scale: 4
  };

  var line = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: 'white',
    strokeOpacity: 0,
    strokeWeight: 5,
    editable: false,
    icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }],
    map:map
  });

  var locations = [{lat: 34.219878, lng: -118.350022},    // ? Walter's Home
                   {lat: 31.798908, lng: -106.394487}   // El Paso Airport
                 ];

  for (var i = 0; i < locations.length; i++) {
    setTimeout(function(coords) {
        latlng = new google.maps.LatLng(coords.lat, coords.lng);
//        map.panTo(latlng);
        line.getPath().push(latlng);
    }, 25 * i, locations[i]);
  }
}

// Walter Picks Up Travis 8:39
function getDirections2(map) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
              origin: new google.maps.LatLng(31.798908, -106.394487),            // El Paso Airport
              waypoints: [
                {location: new google.maps.LatLng(29.622680, -103.572845)},     // Terlingua M.D. Clinc
                {location: new google.maps.LatLng(30.208263, -103.254390)},     // Marathon Motel & RV Park
                {location: new google.maps.LatLng(30.206028, -103.241448)},     // Shoemaker Hardware Store
                {location: new google.maps.LatLng(30.893629, -102.870452)},     // El Rancho Motel
                {location: new google.maps.LatLng(30.893293, -102.873053)},     // Stop at the Gas Station
                {location: new google.maps.LatLng(31.798908, -106.394487)},     // El Paso Airport
                {location: new google.maps.LatLng(31.799097, -106.396152)},     // Avid Car Rental
                {location: 'Four Courners, CA'},
                {location: 'Mojave Desert, CA'}
              ],
              destination: new google.maps.LatLng(34.219878, -118.350022),      // Walter's Home
  //            destination: 'Chicago, IL',
              travelMode: google.maps.TravelMode.DRIVING
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            driving(map, result.routes[0].overview_path);
        }
    });
}


// Travis in LA 37:58
function getDirections3(map) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
              origin: new google.maps.LatLng(34.219878, -118.350022),      // Walter's Home
              waypoints: [
                {location: new google.maps.LatLng(34.219730, -118.350115)},     // Backyard
                {location: new google.maps.LatLng(34.198446, -118.321350)},     // Hunter's School
                {location: new google.maps.LatLng(34.219878, -118.350022)},     // Walter's Home
                {location: new google.maps.LatLng(34.198446, -118.321350)},     // Hunter's School
                {location: new google.maps.LatLng(34.220059, -118.348308)},     // Walking home midpoint
                {location: new google.maps.LatLng(34.219878, -118.350022)},     // Walter's home
                {location: new google.maps.LatLng(34.219730, -118.350115)},     // Backyard
                {location: '13795 Balboa Blvd, Sylmar, CA 91342'}               // Travis Nightwalking
              ],
              destination: new google.maps.LatLng(34.198446, -118.321350),      // Hunter's School
              travelMode: google.maps.TravelMode.WALKING
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            walking(map, result.routes[0].overview_path);
        }
    });
}

// Father and Son Driving 1:15:09
function getDirections4(map) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
              origin: new google.maps.LatLng(34.198446, -118.321350),      // Hunter's School
              waypoints: google.maps.LatLng(34.490968, -118.203032),      // Hunter about Universe
              destination: new google.maps.LatLng(33.919858, -116.773296),      // Payphone
  //            destination: 'Chicago, IL',
              travelMode: google.maps.TravelMode.DRIVING
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            driving(map, result.routes[0].overview_path);
        }
    });
}

// Hunter Calls Home 1:18:40
function jump2(map) {
  var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
  };

  var line = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: 'white',
    strokeOpacity: 0.5,
    strokeWeight: 5,
    editable: false,
    icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }],
    map:map
  });

  var locations = [{lat: 34.219878, lng: -118.350022},    // Walter's Home
                   {lat: 33.919858, lng: -116.773296},  // Payphone
                   {lat: 34.219878, lng: -118.350022},    // Walter's Home
                   {lat: 33.919858, lng: -116.773296},  // Payphone
                   {lat: 34.219878, lng: -118.350022},    // Walter's Home
                 ];

  for (var i = 0; i < locations.length; i++) {
    setTimeout(function(coords) {
      latlng = new google.maps.LatLng(coords.lat, coords.lng);
//        map.panTo(latlng);
      line.getPath().push(latlng);
    }, 100 * i, locations[i]);
  }
}

// Travis and Hunter to Texas 1:22:25 - 1:34:57
function getDirections5(map) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
              origin: new google.maps.LatLng(33.919858, -116.773296),      // Father and Son in Hotel
              waypoints: [
                {location: new google.maps.LatLng(29.764011, -95.362674)},     // Chase Bank Drive Up
                {location: new google.maps.LatLng(29.871551, -93.934962)},     // Port Auther
                {location: new google.maps.LatLng(29.871065, -93.934972)}     // Travis enters building
              ],
              destination: new google.maps.LatLng(29.871193, -93.935046),      // Keyhole Klub
              travelMode: google.maps.TravelMode.DRIVING
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            fastDriving(map, result.routes[0].overview_path);
        }
    });
}

// First Vist at Keyhole Klub 13'07

// Travis leaves Keyhole Klub 1:48:04 - 1:58:54
function getDirections6(map) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
              origin: new google.maps.LatLng(29.871193, -93.935046),      // Keyhole Klub
              waypoints: [
                {location: new google.maps.LatLng(28.921138, -97.609307)},     // Westhoff ??? Nordheim
                {location: new google.maps.LatLng(28.921919, -97.610754)},     // Broadway Bar
                {location: new google.maps.LatLng(28.922325, -97.610163)},     // Grocery
                {location: new google.maps.LatLng(29.757957, -95.371180)}       // DoubleTree Houston Downtown
              ],
              destination: new google.maps.LatLng(29.871193, -93.935046),      // Keyhole Klub
              travelMode: google.maps.TravelMode.DRIVING
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            driving(map, result.routes[0].overview_path);
        }
    });
}

// The Famouse Scene 20'46

// Mother and Son Reunion 2:19:40
function jump3(map) {
  var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 0.5,
    scale: 4
  };

  var line = new google.maps.Polyline({
    path: [],
    geodesic: true,
    strokeColor: 'white',
    strokeOpacity: 0,
    strokeWeight: 5,
    editable: false,
    icons: [{
            icon: lineSymbol,
            offset: '0',
            repeat: '20px'
          }],
    map:map
  });

  var locations = [{lat: 29.758249, lng: -95.369281},    // Downtown Parking Garage
                   {lat: 29.757957, lng: -95.371180},    // DoubleTree Houston Downtown
                   {lat: 29.758249, lng: -95.369281}    // Downtown Parking Garage
                 ];

  for (var i = 0; i < locations.length; i++) {
    setTimeout(function(coords) {
      latlng = new google.maps.LatLng(coords.lat, coords.lng);
//        map.panTo(latlng);
      line.getPath().push(latlng);
    }, 100 * i, locations[i]);
  }
}




google.maps.event.addDomListener(window, 'load', initMap);
