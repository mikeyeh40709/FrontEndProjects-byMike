//用fetch把資料call下來放進button click事件換區域
//input 改marker
//scoll後檢查標籤有無改變 消除標籤並重放標籤
var map;
var infowindow;

function initMap() {
    map = new google.maps.Map(
        document.getElementById('map'), {
            center: new google.maps.LatLng(25.0412479, 121.5395956),
            zoom: 16,
            mapTypeId: 'roadmap',
            styles: [{
                    elementType: 'geometry',
                    stylers: [{
                        color: '#242f3e'
                    }]
                },
                {
                    elementType: 'labels.text.stroke',
                    stylers: [{
                        color: '#242f3e'
                    }]
                },
                {
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#746855'
                    }]
                },
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#263c3f'
                    }]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#6b9a76'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#38414e'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#212a37'
                    }]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#9ca5b3'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#746855'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{
                        color: '#1f2835'
                    }]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#f3d19c'
                    }]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#2f3948'
                    }]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#d59563'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{
                        color: '#17263c'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{
                        color: '#515c6d'
                    }]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{
                        color: '#17263c'
                    }]
                },
                {
                    featureType: "poi.business",
                    stylers: [{
                        visibility: "off"
                    }]
                }
            ]
        });
    // Create a <script> tag and set the USGS URL as the source.
    map.data.loadGeoJson(
        'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');

    map.data.setStyle(function (feature) {
        var maskLeft = feature.getProperty('mask_adult');
        if (maskLeft > 0) {
            return {
                icon: 'https://cdn.frankerfacez.com/emoticon/287489/2'
            };
        } else {
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
            pixelOffset: new google.maps.Size(0, -55)
        });
        infowindow.open(map);
    });
};

// function initAutocomplete() {
//     // Create the search box and link it to the UI element.
//     const input = document.getElementById("pac-input");
//     const searchBox = new google.maps.places.SearchBox(input);
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener("bounds_changed", function() {
//         searchBox.setBounds(map.getBounds());
//     });
//     let markers = [];
//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener("places_changed", function() {
//         const places = searchBox.getPlaces();

//         if (places.length == 0) {
//             return;
//         }
//         // Clear out the old markers.
//         markers.forEach(marker => {
//             marker.setMap(null);
//         });
//         markers = [];
//         // For each place, get the icon, name and location.
//         const bounds = new google.maps.LatLngBounds();
//         places.forEach(place => {
//             if (!place.geometry) {
//                 console.log("Returned place contains no geometry");
//                 return;
//             }
//             const icon = {
//                 url: place.icon,
//                 size: new google.maps.Size(71, 71),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(17, 34),
//                 scaledSize: new google.maps.Size(25, 25)
//             };
//             // Create a marker for each place.
//             markers.push(
//                 new google.maps.Marker({
//                     map,
//                     icon,
//                     title: place.name,
//                     position: place.geometry.location
//                 })
//             );

//             if (place.geometry.viewport) {
//                 // Only geocodes have viewport.
//                 bounds.union(place.geometry.viewport);
//             } else {
//                 bounds.extend(place.geometry.location);
//             }
//         });
//         map.fitBounds(bounds);
//     });
// }