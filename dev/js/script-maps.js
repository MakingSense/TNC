/*----------------------------------*\
/*----------------------------------*\
         TNC MAIN MAPS SCRIPT
/*----------------------------------*\
\*----------------------------------*/

/*------------------------------------*\
  #Global Vars
\*------------------------------------*/
var map, geocoder, locations;
var listings = document.getElementById('listings');
var origin = {
    lat: 22.3077423,
    lng: 114.2287582
};
var destination = {
    lat: 28.274,
    lng: -25.878269
};


/*------------------------------------*\
  #Load
\*------------------------------------*/

$(window).load(function() {
    //Access Token Map
    L.mapbox.accessToken = 'pk.eyJ1IjoidG5jLWdsb2JhbHdhdGVyIiwiYSI6ImNpcjVveDV0YTAwOGZnN25uNTltdjdpbzMifQ.2Ff5ioAO5z2s5ltmcBx7cA';
    initMap();

    //Binding input
    $('#search-input').on('input', function(event) {
        event.preventDefault();
        searchInMap();
    });

});


function initMap() {
    map = L.mapbox.map('map-one', 'tnc-globalwater.026wsirr')
        .setView(L.latLng(origin.lat, origin.lng), 18);
    geocoder = L.mapbox.geocoder('mapbox.places');
    locations = L.mapbox.featureLayer().addTo(map);
    locations.loadURL('data/data.geojson'); // load in your own GeoJSON file here   
    map.attributionControl.setPosition('bottomleft');

    locations.on('ready', function() {
        locations.eachLayer(function(locale) {

            // Shorten locale.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = locale.feature.properties;

            // Each marker on the map.
            var popup = '<h3>Type:</h3><div>' + prop.type;

            if (prop.crossStreet) {
                popup += '<br /><small class="quiet">' + prop.name + '</small>';
            }

            // Marker interaction
            locale.on('click', function(e) {
                // 1. center the map on the selected marker.
                map.panTo(locale.getLatLng());
                destination = locale.getLatLng();
                traceRoute();

                // 2. Set active the markers associated listing.
                //setActive(listing);
            });

            popup += '</div>';
            WaterSourcesPrinter(locale);
            locale.bindPopup(popup);
        });
    });

    locations.on('layeradd', function(e) {
        var marker = e.layer;
        var prop = marker.feature.properties;

        if (prop.type == "city") {
            marker.setIcon(L.icon({
                iconUrl: 'http://image.flaticon.com/icons/svg/71/71696.svg',
                iconSize: [36, 36],
                iconAnchor: [28, 28],
                popupAnchor: [0, -34]
            }));
        } else {
            marker.setIcon(L.icon({
                iconUrl: 'http://image.flaticon.com/icons/svg/179/179529.svg',
                iconSize: [32, 32],
                iconAnchor: [28, 28],
                popupAnchor: [0, -34]
            }));
        }
    });
}

function setActive(el) {
    var siblings = listings.getElementsByTagName('div');
    for (var i = 0; i < siblings.length; i++) {
        siblings[i].className = siblings[i].className
            .replace(/active/, '').replace(/\s\s*$/, '');
    }

    el.className += ' active';
}

function traceRoute() {
    var directions = L.mapbox.directions({
        profile: 'mapbox.driving'
    });

    // Set the origin and destination for the direction and call the routing service
    directions.setOrigin(L.latLng(origin[0], origin[1]));
    directions.setDestination(L.latLng(destination.lat, destination.lng));
    var aux = directions.query();

    var routeStyle = {
        "routeStyle": {
            color: '#46775a',
            weight: 6,
            opacity: .75
        }
    };

    var directionsLayer = L.mapbox.directions.layer(directions, routeStyle).addTo(map);
    var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
        .addTo(map);
}


//Search and position in map
function searchInMap() {
    var text = document.getElementById('search-input').value;
    if (text.length >= 5) {
        geocoder.query(text, showMap);
    }
}

function showMap(err, data) {
    filterLocations(data.results.features[0].text);
    origin = data.latlng;
    if (data.lbounds) {
        map.fitBounds(data.lbounds);
    } else if (data.latlng) {
        map.setView([data.latlng[0], data.latlng[1]], 18);
    }
}

function filterLocations(cityName) {
    $('.listings .item').remove();
    filterWaterSourcesbyID(nametoID(cityName));
}

function nametoID(cityName) {
    var id;
    locations.eachLayer(function(locale) {
        prop = locale.feature.properties;
        if (prop.type == "city" && prop.city_name == cityName) {
            id = prop.id;
        }
    });
    return id;
}

function filterWaterSources() {
    var waterSources = [];
    locations.eachLayer(function(locale) {
        prop = locale.feature.properties;
        if (prop.type == "water_source") {
            waterSources.push(locale);
        }
    });
    return waterSources;
}

function filterWaterSourcesbyID(cityID) {
    var waterSources = filterWaterSources();
    var filteredSources = [];
    $('.listings .item').remove();
    $.each(waterSources, function(index, val) {
        prop = val.feature.properties;
        if (prop.cities.indexOf(cityID) > -1) {
            WaterSourcesPrinter(val);
            filteredSources.push(val);
        }
    });
    return filteredSources;
}

function WaterSourcesPrinter(locale) {
    var prop = locale.feature.properties;
    var listing = listings.appendChild(document.createElement('div'));
    listing.className = 'item';

    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';

    link.innerHTML = prop.name;
    link.innerHTML += '<small class="quiet">' + prop.type + '</small>';

    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.id;

    link.onclick = function() {
        setActive(listing);

        // When a menu item is clicked, animate the map to center
        // its associated locale and open its popup.
        map.setView(locale.getLatLng(), 18);
        locale.openPopup();
        return false;
    };
}



/*------------------------------------*\
  #Prevent Scroll Down
\*------------------------------------*/