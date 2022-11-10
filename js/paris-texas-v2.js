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
*
*   V2
*   Markers added with associated screenshots
*
*/

var map;
var locations = [];

function initMap() {
/* JSON Request from Google Sheet
    Needs: Google Sheet ID, API key with Map JavaScript, Google Sheets enabled
  */
    $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/1YLRxJ94hOi5cdyps90kUJKqvAlqQHgLuPe_HCRAtuRY/values/Sheet1!A2:G?key=AIzaSyAMytzLDrJXPz7KCAaD-EhqVGDlkP6H5As", function (data) {
        $(data.values).each(function () {
          var location = {};
          location.timestamp = this[0];
          location.name = this[1];
          location.address = this[2];
          location.latitude = parseFloat(this[3]);
          location.longitude = parseFloat(this[4]);
          location.note = this[5];
          location.img = this[6];
          locations.push(location);

        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 6,
          disableDefaultUI: true,
          center: new google.maps.LatLng(28.550321, -105.068287),
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
 
        setTimeout(function(){
        getDirections1(map);     // 1250 + 500
        }, 100);

       setTimeout(function(){
         jump1(map);            // 50
       }, 1750);

         setTimeout(function(){
           getDirections2(map);   // 6350
         }, 1800);
   
        setTimeout(function(){
          getDirections3(map);    // 7750
        }, 8150);
 
        setTimeout(function(){
          getDirections4(map);    // 730
        }, 15900);
 
        setTimeout(function(){
          jump2(map);             // 800
        }, 16630);
 
        setTimeout(function(){
          getDirections5(map);    // 2600 + 2700
        }, 17430);

        setTimeout(function(){
          getDirections6(map);    // 2300 + 4350
        }, 22730);
 
        setTimeout(function(){
          jump3(map);
        }, 29380);
/*
       new google.maps.KmlLayer({
        url: "https://lilanyang.studio/kml/paris-texas.kmz",
        map: map,
      });
*/
      setLocations(map, locations);
    });

    });
}

function setLocations(map, locations) {
    var bounds = new google.maps.LatLngBounds();
    var infowindow = new google.maps.InfoWindow({
      content: "Content String"
    });
       
    for (var i = 0; i < locations.length; i++) {
      var new_marker = createMarker(map, locations[i], infowindow);
      bounds.extend(new_marker.position);
    }
  
    map.fitBounds(bounds);

  }


function createMarker(map, location, infowindow) {
    var position = {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude)
    };
  
    var icon_paris_texas = {
      url: "../icon/paris-texas.png", // url
      scaledSize: new google.maps.Size(30, 30), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(15, 15) // anchor
    };
    
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: location.name,
        icon: icon_paris_texas
    });
    
    google.maps.event.addListener(marker, "click", function () {
      infowindow.setContent(
        "<div>" + 
        (location.img === undefined ? "" : "<img src='" + location.img + "'  width='400px'/>") + 
        (location.name === undefined ? "" : "<p><strong>Location: </strong>" + location.name + "</p>") +
        (location.address === undefined ? "" : "<p><strong>Address: </strong>" + location.address + "</p>") +
        (location.timestamp === undefined ? "" : "<p><strong>Timestamp: </strong>" + location.timestamp + "</p>") +
        (location.note === undefined ? "" : "<p><strong>Note: </strong>" + location.note + "</p>") +
        "</div>"
      );
      
      infowindow.open(map, marker);
      });
  
    return marker;
  }




/* Travel Modes Abandoned
*  Tuning paramter is no witchcraft but mathmatics.
*/
function route1(map, pathCoords) {
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
        }, 4 * i, pathCoords[i]);
    }
}

function route2(map, pathCoords) {
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
        }, 31 * i, pathCoords[i]);
    }
}

function route3(map, pathCoords) {
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
        }, 23 * i, pathCoords[i]);
    }
}

function route4(map, pathCoords) {
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
        }, 2.3 * i, pathCoords[i]);
    }
}

function route5(map, pathCoords) {
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
        }, 12 * i, pathCoords[i]);
    }
}


function route6(map, pathCoords) {
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
        }, 10 * i, pathCoords[i]);            // playing safe
    }
}

// Travis Walking 0:58 - 6:59
function getDirections1(map) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
              origin: "Emory Peak, Texas 79834",       // Big Bend National Park
              destination: "51470 TX-118, Alpine, TX 79830",   // Terlingua M.D. Clinc
              travelMode: 'WALKING',
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            route1(map, result.routes[0].overview_path);
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
    }, 50 * i, locations[i]);
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
                {location: "Mojave Deseart, California"}      // Mojave Desert
              ],
              destination: new google.maps.LatLng(34.219878, -118.350022),      // Walter's Home
              travelMode: google.maps.TravelMode.DRIVING
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            route2(map, result.routes[0].overview_path);
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
                {location: '13276 Van Nuys Blvd, Pacoima, CA 91331'},              // Travis Nightwalking
                {location: '13795 Balboa Blvd, Sylmar, CA 91342'}               // Nightwalking at Bridge
              ],
              destination: new google.maps.LatLng(34.198446, -118.321350),      // Hunter's School
              travelMode: google.maps.TravelMode.WALKING
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            route3(map, result.routes[0].overview_path);
        }
    });
}

// Father and Son Driving 1:15:09
function getDirections4(map) {
    var directionsService = new google.maps.DirectionsService();
    var request = {
              origin: new google.maps.LatLng(34.198446, -118.321350),      // Hunter's School
              waypoints: new google.maps.LatLng(34.490968, -118.203032),      // Hunter about Universe
              destination: new google.maps.LatLng(33.919858, -116.773296),      // Payphone
              travelMode: google.maps.TravelMode.DRIVING
          };

    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            route4(map, result.routes[0].overview_path);
        }
    });
}

// Hunter Calls Home 1:18:40
function jump2(map) {
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
    }, 200 * i, locations[i]);
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
            route5(map, result.routes[0].overview_path);
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
            route6(map, result.routes[0].overview_path);
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
    }, 100 * i, locations[i]);        // playing safe
  }
}

google.maps.event.addDomListener(window, 'load', initMap);