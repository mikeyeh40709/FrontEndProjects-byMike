var map;
var infowindow;
function initMap() {
    map = new google.maps.Map(
        document.getElementById('map'), {
            center: new google.maps.LatLng(25.0412479, 121.5395956),
            zoom: 16,
            mapTypeId: 'roadmap',
            gestureHandling: 'greedy'
        });
    // Create a <script> tag and set the USGS URL as the source.
    map.data.loadGeoJson(
        'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');

    map.data.setStyle(function(feature){
        var maskLeft = feature.getProperty('mask_adult');
        if ( maskLeft > 0){
            return {
                icon: 'https://cdn.frankerfacez.com/emoticon/287489/2'
            };
        } else{
            return {
                icon: "https://cdn.frankerfacez.com/emoticon/243754/2"
            };
        }
    });

    infowindow = new google.maps.InfoWindow();

    map.data.addListener('click', function (event) {
        var title = `藥局:<h4>${event.feature.getProperty('name')}</h4>`;
        var adult = `Adult:<h4>${event.feature.getProperty('mask_adult')}</h4>`;
        var child = `Child:<h4>${event.feature.getProperty('mask_child')}</h4>`;
        var updated = `Last Updated:<h4>${event.feature.getProperty('updated')}</h4>`;
        var address = `Address:<h4>${event.feature.getProperty('address')}</h4>`;
        var phone = `Phone:<h4>${event.feature.getProperty('phone')}</h4>`;

        infowindow.setContent(title + adult + child + updated + address + phone);
        infowindow.setPosition(event.latLng);
        infowindow.setOptions({
            pixelOffset: new google.maps.Size(0, -34)
        });
        infowindow.open(map);
    });
}

// function changeArea(place){

// }

