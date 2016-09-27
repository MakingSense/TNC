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
$(window).on('load', function() {
    //Access Token Map
    L.mapbox.accessToken = 'pk.eyJ1IjoidG5jLWdsb2JhbHdhdGVyIiwiYSI6ImNpcjVveDV0YTAwOGZnN25uNTltdjdpbzMifQ.2Ff5ioAO5z2s5ltmcBx7cA';
    initMap();
    // invalidate the size of your map

    //Binding input
    $('#search-input-btn, #search-inner-button, #search-inner-button-a').on('click touchstart', function(event) {
        event.preventDefault();
        $('.reservoirs__controller').removeClass('control--visible')
        var wsList = $('.reservoirs__list');
        wsList.empty();
        searchInMap($(this).siblings('.search').val());

        $(this).siblings('.search').attr('value', '').val('');
        $(this).siblings('.search').blur();
    });

    $('#iconMap').on('click touchstart', function(event) {
        $('.map__container').addClass('anim__fade-in');
        $('.text__container').addClass('text__container--out');
    });

    map.setView([38.5842213, -97.4564217], 4, {
        reset: true
    })
});

function displayCity() {
    var map_front = $('.map');
    var search = $('.form');
    var city = $('.city');
    var cityData = $('.city .city__founded');
    var cityWrong = $('.city .city__wrong');
    //map.invalidateSize(16);

    map_front.removeClass('map__height-middle--out').addClass('map__height-middle--in');
    search.removeClass('search__fade-out--reverse').addClass('search__fade-out');
    city.removeClass('item-list__fade-in--reverse').addClass('item-list__fade-in');
    cityWrong.removeClass('city__founded-anim-out').addClass('city__founded-anim-out');
    cityData.removeClass('city__founded-anim-out').addClass('city__founded-anim-in');
}

function displayCityWrong() {
    var map_front = $('.map');
    var search = $('.form');
    var city = $('.city');
    var cityData = $('.city .city__founded');
    var cityWrong = $('.city .city__wrong');
    //map.invalidateSize(16);

    map_front.removeClass('map__height-middle--out').addClass('map__height-middle--in');
    search.removeClass('search__fade-out--reverse').addClass('search__fade-out');
    city.removeClass('item-list__fade-in--reverse').addClass('item-list__fade-in');
    cityData.removeClass('city__founded-anim-out').addClass('city__founded-anim-out');
    cityWrong.removeClass('city__founded-anim-out').addClass('city__founded-anim-in');

}

function displayDataCity(cityName, placename) {
    var title = $('#cityTitle');
    var name = $('#cityName');
    var sources = $('#citySources');
    var km = $('#cityKmAverage');

    title.html(placename);
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

    var route = $('.route__line');

    map_front.removeClass('map__height-middle--in').addClass('map__height-middle--out');
    search.removeClass('search__fade-out').addClass('search__fade-out--reverse');
    city.removeClass('item-list__fade-in').addClass('item-list__fade-in--reverse');

    $('#destination, #origin').val('');
    route.children('div').removeClass('active');
}

function initMap() {
    map = L.mapbox.map('map-one', 'tnc-globalwater.026wsirr').setView(L.latLng(origin.lat, origin.lng), 8);

    geocoder = L.mapbox.geocoder('mapbox.places');
    locations = L.mapbox.featureLayer().addTo(map);
    locations.loadURL('data/data.geojson'); // load in your own GeoJSON file here
    //locations.loadURL('data/data-b.geojson'); // Develop DB
    map.attributionControl.setPosition('bottomleft');

    locations.on('ready', function() {
        locations.eachLayer(function(locale) {

            // Shorten locale.feature.properties to just `prop` so we're not
            // writing this long form over and over again.
            var prop = locale.feature.properties;

            // Each marker on the map.
            var popup = '<h3>Water Source Name:</h3><div>' + prop.name;

            if (prop.crossStreet) {
                popup += '<br /><small class="quiet">' + prop.name + '</small>';
            }
            popup += '</div>';
            locale.bindPopup(popup);

            // Marker interaction
            locale.on('click touchstart', function(e) {
                // 1. center the map on the selected marker.
                map.panTo(locale.getLatLng());
                destination = locale.getLatLng();
                traceRoute();
            });
            locale.on('hover', function(event) {
                if (e.type == "mouseenter") {
                   locale.openPopup();
                }
            });
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
                iconUrl: './img/icon-drop.svg',
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
    return distance;
}

function distanceConvert(distance) {
    if (distance >= 100000) return ((distance / 1000) * 0.621).toFixed(0) + ' MI';
    if (distance >= 10000) return ((distance / 1000) * 0.621).toFixed(1) + ' MI';
    if (distance >= 100) return ((distance / 1000) * 0.621).toFixed(2) + ' MI';
    return (distance * 0.621).toFixed(0) + ' MI';
}

function setActive(el) {
    var siblings = listings.getElementsByTagName('li');
    for (var i = 0; i < siblings.length; i++) {
        siblings[i].className = siblings[i].className
            .replace(/active/, '').replace(/\s\s*$/, '');
    }

    el.className += ' active';
}

$('#routeButton').on('click touchstart', function(event) {
    event.preventDefault();
    bindButtonRoute();
});

function bindButtonRoute(){
    var link = "https://www.google.com/maps?";
    var loc_origin = "saddr=" + $('#origin').val();
    //var loc_origin = "saddr=" + origin[0] + ',' + origin[1];//Old Approach
    var loc_destination = "&daddr=" + destination.lat + ',' + destination.lng;
    link = link.concat(loc_origin.concat(loc_destination));
    var win = window.open(link, 'blank');
    win.focus();
}

function traceRoute() {
    var distance = getDistance(origin, [destination.lat, destination.lng]);
    drawLineKM(distanceConvert(distance));
}

function drawLineKM(km) {
    var route = $('.route__line');
    route.children('div').removeClass('active');
    route.children('div').children('span').html(km);
    route.children('div').addClass('active');
}


//Search and position in map
function searchInMap(text) {
    if (text.length >= 5) {
        geocoder.query(text, showMap);
    }
}

function showMap(err, data) {
    if(data.results.features.length > 0) {
        if(checkCityExist(data.results.features[0].text)) {
            filterLocations(data.results.features[0].text);
            origin = data.latlng;
            if (data.lbounds) {
                map.fitBounds(data.lbounds);
            } else if (data.latlng) {
                map.setView([data.latlng[0], data.latlng[1]], 18);
            }
            displayCity();
            displayDataCity(data.results.features[0].text, data.results.features[0].place_name);
            $('#origin').val(data.results.features[0].text);
            $('#origin').attr({
                geolat: data.latlng[0],
                geolon: data.latlng[1]
            });
        }
        else {
            displayCityWrong();
        }
    }
    else {
        displayCityWrong();
    }
}

function filterLocations(cityName) {
    $('.listings .item').remove();
    filterWaterSourcesbyID(nametoID(cityName));
}

function checkCityExist(city) {
    var aux = false;
    locations.eachLayer(function(locale) {
        prop = locale.feature.properties;
        if (prop.type == "city") {
            if(prop.city_name == city){
                aux = true;
            }
        }
    });
    return aux;
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
    filteredSources
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
        locale.openPopup();
        return false;
    };

    var reservoirsDIV = $('.reservoirs__list').outerHeight();
    var divHeight = $('.city__information-sources').outerHeight();
    var sourcesHeight = $('.city__information-sources').innerHeight();

    if(reservoirsDIV >= sourcesHeight) {
        $('.reservoirs__list').css('height', (divHeight - 70));
        $('.reservoirs__controller').addClass('control--visible');
    }
    else if(!$('.reservoirs__controller').hasClass('control--visible')) {
        $('.reservoirs__list').css('height', 'initial');
        $('.reservoirs__controller').removeClass('control--visible');
    }
}