var map;
function map() {
  // Styles a map in night mode.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 29.321359,lng: -103.615976},
    zoom: 5,
    disableDefaultUI: true,
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
/*
// Markers may not be necessery
  // Add markers to the map
  var markers = locations.map(function(locations) {
    return new google.maps.Marker({position: locations});
  });
  // Add a marker clusterer to manage the markers.

  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });
*/
  startAnimation();
}
/*
function animate(jsonData, index, path, lastTimestamp){
  var data = JSON.parse(jsonData);
  var location = data.locations[index];
  var thisTimestamp = data.locations[index].mElapsedRealtimeNanos;
  var timeout = (thisTimestamp - lastTimestamp)/30000000;
  var gLocation = new google.maps.LatLng(location.mLatitude,location.mLongitude);
  map.panTo(gLocation);
  path.push(gLocation);
  index++;
  setTimeout(function(){
    animate(jsonData,index,path,thisTimestamp);
  },timeout)
}

function initPlot(line){
  line.setMap(map);
}

function startAnimation(){
  var line = new google.maps.Polyline({
    geodesic: false,
    strokeColor: "white",
    strokeOpacity: 1.0,
    strokeWeight: 100
  });

  initPlot(line);


//locations
/*    var locations = [
  {lat: 29.124088,lng: -103.242066},  //big bend
  {lat: 29.321359,lng: -103.615976},  //terlingua
  {lat: 29.623064,lng: -103.573552},  //md clinic
  {lat: 29.623064,lng: -103.573552}  //md clinic
]

animate(JSON.stringify({"locations":[
  {"mLatitude":29.124088,"mLongtitude":-103.242066,"mElapsedRealtimeNanos":1392341645370,"mTime":1490276398000},  //big bend
  {"mLatitude":29.321359,"mLongtitude":-103.615976,"mElapsedRealtimeNanos":1395348296980,"mTime":1490276401000},  //terlingua
  {"mLatitude":29.623064,"mLongtitude":-103.573552,"mElapsedRealtimeNanos":1398349975777,"mTime":1490276404000},  //md clinc

  {"mLatitude":34.052261,"mLongtitude":-118.233881,"mElapsedRealtimeNanos":1401347974572,"mTime":1490276404000},  //la

  {"mLatitude":29.623064,"mLongtitude":-103.573552,"mElapsedRealtimeNanos":1404341535919,"mTime":1490276410000},  //md clinc
  {"mLatitude":29.622680,"mLongtitude":-103.572845,"mElapsedRealtimeNanos":1407340933725,"mTime":1490276413000},  //american legion rd
  {"mLatitude":30.208263,"mLongtitude":-103.254390,"mElapsedRealtimeNanos":1410352255022,"mTime":1490276416000},  //marathon motel
  {"mLatitude":30.206028,"mLongtitude":-103.241448,"mElapsedRealtimeNanos":1413344515641,"mTime":1490276419000},  //shoemaker store
  {"mLatitude":30.208263,"mLongtitude":-103.254390,"mElapsedRealtimeNanos":1416346185114,"mTime":1490276422000},  //marathon motel
  {"mLatitude":30.893305,"mLongtitude":-102.870327,"mElapsedRealtimeNanos":1419347023962,"mTime":1490276425000},  //el rancho motel
  {"mLatitude":30.893293,"mLongtitude":-102.873053,"mElapsedRealtimeNanos":1422350494322,"mTime":1490276428000},  //gas station

  {"mLatitude":31.798908,"mLongtitude":-106.394487,"mElapsedRealtimeNanos":1425403525574,"mTime":1490276431000},  //el paso airport
  {"mLatitude":31.799097,"mLongtitude":-106.396152,"mElapsedRealtimeNanos":1428368234788,"mTime":1490276434000},  //avis car rental

  {"mLatitude":32.977879,"mLongtitude":-116.776368,"mElapsedRealtimeNanos":1431345212907,"mTime":1490276437000},  //four corners
  {"mLatitude":35.041475,"mLongtitude":-115.471527,"mElapsedRealtimeNanos":1434381478754,"mTime":1490276440000},  //mojave desert
  {"mLatitude":32.977879,"mLongtitude":-116.776368,"mElapsedRealtimeNanos":1437366203128,"mTime":1490276443000},  //four corners

  {"mLatitude":34.219878,"mLongtitude":-118.350022,"mElapsedRealtimeNanos":1440422932367,"mTime":1490276446000},  //walter's home
  {"mLatitude":34.219730,"mLongtitude":-118.350115,"mElapsedRealtimeNanos":1443352109035,"mTime":1490276449000},  //backyard
  {"mLatitude":34.198446,"mLongtitude":-118.321350,"mElapsedRealtimeNanos":1446357562104,"mTime":1490276452000},  //elem school
  {"mLatitude":34.219878,"mLongtitude":-118.350022,"mElapsedRealtimeNanos":1449350422985,"mTime":1490276455000},  //home
  {"mLatitude":34.198446,"mLongtitude":-118.321350,"mElapsedRealtimeNanos":1452348095794,"mTime":1490276458000},  //school
  {"mLatitude":34.220059,"mLongtitude":-118.348308,"mElapsedRealtimeNanos":1455376879698,"mTime":1490276461000},  //walk home
  {"mLatitude":34.219878,"mLongtitude":-118.350022,"mElapsedRealtimeNanos":1458353663912,"mTime":1490276464000},  //home
  {"mLatitude":34.219730,"mLongtitude":-118.350115,"mElapsedRealtimeNanos":1461352570376,"mTime":1490276467000},  //backyard

  {"mLatitude":34.490968,"mLongtitude":-118.203032,"mElapsedRealtimeNanos":1464351185995,"mTime":1490276470000},  //universe talk
  {"mLatitude":33.919858,"mLongtitude":-116.773296,"mElapsedRealtimeNanos":1467348448125,"mTime":1490276473000},  //payphone
  {"mLatitude":34.219878,"mLongtitude":-118.350022,"mElapsedRealtimeNanos":1470351002389,"mTime":1490276476000},  //home
  {"mLatitude":33.919858,"mLongtitude":-116.773296,"mElapsedRealtimeNanos":1473335741550,"mTime":1490276479000},  //payphone
  {"mLatitude":34.219878,"mLongtitude":-118.350022,"mElapsedRealtimeNanos":1476349375462,"mTime":1490276482000},  //home
  {"mLatitude":33.919858,"mLongtitude":-116.773296,"mElapsedRealtimeNanos":1479342745144,"mTime":1490276485000},  //payphone
  {"mLatitude":34.219878,"mLongtitude":-118.350022,"mElapsedRealtimeNanos":1482349068056,"mTime":1490276488000},  //home
  {"mLatitude":33.919858,"mLongtitude":-116.773296,"mElapsedRealtimeNanos":1485366749094,"mTime":1490276491000},  //hotel room

  {"mLatitude":29.764011,"mLongtitude":-95.362674,"mElapsedRealtimeNanos":1488341518985,"mTime":1490276494000},  //chase bank
  {"mLatitude":29.871551,"mLongtitude":-93.934962,"mElapsedRealtimeNanos":1491350930699,"mTime":1490276497000},  //port auther
  {"mLatitude":29.871065,"mLongtitude":-93.934972,"mElapsedRealtimeNanos":1494328595693,"mTime":1490276500000},  //travis enter building
  {"mLatitude":29.871193,"mLongtitude":-93.935046,"mElapsedRealtimeNanos":1497350753722,"mTime":1490276503000},  //keyhole klub

  {"mLatitude":28.921138,"mLongtitude":-97.609307,"mElapsedRealtimeNanos":1500364365853,"mTime":1490276506000},  //not westoff
  {"mLatitude":28.921919,"mLongtitude":-97.610754,"mElapsedRealtimeNanos":1503342776107,"mTime":1490276509000},  //boardway bar
  {"mLatitude":28.922325,"mLongtitude":-97.610163,"mElapsedRealtimeNanos":1506394287007,"mTime":1490276512000},  //grocery

  {"mLatitude":29.757957,"mLongtitude":-95.371180,"mElapsedRealtimeNanos":1509363440599,"mTime":1490276515000},  //doubletree
  {"mLatitude":29.871193,"mLongtitude":-93.935046,"mElapsedRealtimeNanos":1512386446238,"mTime":1490276518000},  //keyhole klub

  {"mLatitude":29.758249,"mLongtitude":-95.369281,"mElapsedRealtimeNanos":1515376280196,"mTime":1490276521000},  //parking
  {"mLatitude":29.757957,"mLongtitude":-95.37118,"mElapsedRealtimeNanos":1518346860045,"mTime":1490276524000},  //doubletree
  {"mLatitude":29.758249,"mLongtitude":-95.369281,"mElapsedRealtimeNanos":1521345084520,"mTime":1490276527000} //parking

  ]}),0, line.getPath(),1392341645370)
*/
}
