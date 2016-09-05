/*----------------------------------*\
/*----------------------------------*\
         TNC MAIN MAPS SCRIPT
/*----------------------------------*\
\*----------------------------------*/

/*------------------------------------*\
  #Global Vars
\*------------------------------------*/
var map, geocoder, locations, directions;
var listings = document.getElementById('reservoirs');
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
    // invalidate the size of your map    

    //Binding input
    $('#search-input-btn').on('click', function(event) {
        event.preventDefault();
        searchInMap();
        $('#search-input').attr('value', '').val('');
    });

    $('.city__button').on('click', function(event) {
        event.preventDefault();
        hideCity();
    });

    $('#iconMap').on('click', function(event) {
        event.preventDefault();
        $('.map__container').addClass('anim__fade-in');
        $('.text__container').addClass('text__container--out');
        $(this).removeAttr('href');
    });

    map.setView([38.5842213, -97.4564217], 5, {
        reset: true
    })
});

function displayCity() {
    var map_front = $('.map');
    var search = $('.form');
    var city = $('.city');
    map.invalidateSize(16);

    map_front.removeClass('map__height-middle--out').addClass('map__height-middle--in');
    search.removeClass('search__fade-out--reverse').addClass('search__fade-out');
    city.removeClass('item-list__fade-in--reverse').addClass('item-list__fade-in');
}

function displayDataCity(cityName) {
    var title = $('#cityTitle');
    var name = $('#cityName');
    var sources = $('#citySources');
    var km = $('#cityKmAverage');

    title.html(cityName);
    name.html('About ' + cityName);

    locations.eachLayer(function(locale) {
        prop = locale.feature.properties;
        if (prop.type == "city" && prop.city_name == cityName) {
            sources.html(prop.sources_count);
        }
    });

    km.html(calcutaKMAVG(cityName));
}

function calcutaKMAVG(cityName){
    var wsIDs = [];
    var ws = [];
    var totalKM = 0;
    locations.eachLayer(function(locale) {
        prop = locale.feature.properties;
        if (prop.type == "city" && prop.city_name == cityName) {
            wsIDs = prop.sources;
        }
    });

    locations.eachLayer(function(locale) {
        prop = locale.feature.properties;
        if (prop.type == "water_source" && wsIDs.indexOf(prop.id) > -1) {
            var aux = locale.getLatLng();
            ws.push(aux);
        }
    });

    $.each(ws, function(index, val) {
        var distance = getDistance(origin, [val.lat, val.lng]);
        totalKM = totalKM + distance;
    });    

    return distanceConvert(totalKM/ws.length);
}

function hideCity() {
    var map_front = $('.map');
    var search = $('.form');
    var city = $('.city');

    map_front.removeClass('map__height-middle--in').addClass('map__height-middle--out');
    search.removeClass('search__fade-out').addClass('search__fade-out--reverse');
    city.removeClass('item-list__fade-in').addClass('item-list__fade-in--reverse');
}

function initMap() {
    map = L.mapbox.map('map-one', 'tnc-globalwater.026wsirr').setView(L.latLng(origin.lat, origin.lng), 17);

    directions = L.mapbox.directions({
        profile: 'mapbox.driving',
        units: 'metric'
    });

    var routeStyle = {
        "readonly": true,
        "routeStyle": {
            color: '#00bfff',
            weight: 6,
            opacity: .85
        }
    };
    var map_directions = L.mapbox.directions.layer(directions, routeStyle).addTo(map);



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

                //2. Set active the markers associated listing.
                setActive(listing);
            });

            popup += '</div>';
            //WaterSourcesPrinter(locale);
            locale.bindPopup(popup);
        });

    });

    locations.on('layeradd', function(e) {
        var marker = e.layer;
        var prop = marker.feature.properties;

        if (prop.type == "city") {
            marker.setIcon(L.icon({
                iconUrl: 'http://image.flaticon.com/icons/svg/71/71696.svg',
                iconSize: [0, 0],
                // iconAnchor: [28, 28],
                popupAnchor: [0, -34]
            }));
        } else {
            marker.setIcon(L.icon({
                iconUrl: 'http://image.flaticon.com/icons/svg/179/179529.svg',
                iconSize: [32, 32],
                // iconAnchor: [28, 28],
                popupAnchor: [0, -34]
            }));
        }
    });

    map.invalidateSize();
}

function getDistance(_origin, _destination) {
    var _origin = L.latLng(_origin[0], _origin[1]);
    var _destination = L.latLng(_destination[0], _destination[1]);
    var distance = _origin.distanceTo(_destination);
    //distance = distanceConvert(distance);
    //console.log("DISTANCE: " + distance);
    return distance;
}

function distanceConvert(distance) {
    if (distance >= 100000) return (distance / 1000).toFixed(0) + ' km';
    if (distance >= 10000) return (distance / 1000).toFixed(1) + ' km';
    if (distance >= 100) return (distance / 1000).toFixed(2) + ' km';
    return distance.toFixed(0) + ' Km';
}

function setActive(el) {
    var siblings = listings.getElementsByTagName('li');
    for (var i = 0; i < siblings.length; i++) {
        siblings[i].className = siblings[i].className
            .replace(/active/, '').replace(/\s\s*$/, '');
    }

    el.className += ' active';
}

function traceRoute() {

    // Set the origin and destination for the direction and call the routing service
    directions.setOrigin(L.latLng(origin[0], origin[1]));
    directions.setDestination(L.latLng(destination.lat, destination.lng));

    var aux = {
        proximity: L.latLng(origin[0], origin[1])
    }

    directions.query(aux, function(err, results) {
        console.log(distanceConvert(results.routes[0].distance));
    });

    getDistance(origin, [destination.lat, destination.lng]);

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
    displayCity();
    displayDataCity(data.results.features[0].text);
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
    var listing = listings.appendChild(document.createElement('li'));

    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';

    link.innerHTML = prop.name;

    link.onclick = function() {
        setActive(listing);

        // When a menu item is clicked, animate the map to center
        // its associated locale and open its popup.
        map.panTo(locale.getLatLng());
        destination = locale.getLatLng();
        traceRoute();
        map.setView(locale.getLatLng(), 18);
        locale.openPopup();
        return false;
    };
}



/*------------------------------------*\
  #Prevent Scroll Down
\*------------------------------------*/