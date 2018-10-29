var map;
async function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         zoom: 4,
	 disableDefaultUI: true,
         center: new google.maps.LatLng(29.321359,-103.615976),
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
       getDirections1(map);

       setTimeout(function(){
                   getDirections2(map);
                },3029);

}



function autoRefresh1(map, pathCoords) {
    var i, route;

    route = new google.maps.Polyline({
        path: [],
        geodesic : true,
        strokeColor: 'white',
        strokeOpacity: 1.0,
        strokeWeight: 5,
        editable: false,
        map:map
    });

    for (i = 0; i < pathCoords.length; i++) {
        setTimeout(function(coords) {
            route.getPath().push(coords);
        }, 10 * i, pathCoords[i]);
    }



}

function autoRefresh2(map, pathCoords) {
    var i, route;

    route = new google.maps.Polyline({
        path: [],
        geodesic : true,
        strokeColor: 'white',
        strokeOpacity: 1.0,
        strokeWeight: 5,
        editable: false,
        map:map
    });


    for (i = 0; i < pathCoords.length; i++) {
        setTimeout(function(coords) {
            route.getPath().push(coords);
        }, 3 * i, pathCoords[i]);
    }



}



async function getDirections1(map, callback) {



    var waypts = [{location: 'Dallas, TX'}, {location: 'El Paso, TX'}];
    var directionsService1 = new google.maps.DirectionsService();

    var request = {
              origin: 'Big Bend National Park, TX',
              destination: new google.maps.LatLng(34.219878, -118.350022),
              waypoints: waypts,
              travelMode: google.maps.TravelMode.DRIVING
          };

    directionsService1.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            autoRefresh1(map, result.routes[0].overview_path);
        }
});
}

async function getDirections2(map) {


    var waypts = [{location: 'San Francisco, CA'}, {location: 'Yellowstone National Park, WY'}];
    var directionsService2 = new google.maps.DirectionsService();

    var request = {
              origin: new google.maps.LatLng(34.219878, -118.350022),
              destination: 'Chicago, IL',
              waypoints: waypts,
              travelMode: google.maps.TravelMode.WALKING
          };

    directionsService2.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            autoRefresh2(map, result.routes[0].overview_path);
        }
});

}

google.maps.event.addDomListener(window, 'load', initMap);
