var map;
var infowindow;
var markers = [];

function initMap() {
    map = new google.maps.Map(
        document.getElementById('map'), {
            center: new google.maps.LatLng(25.0412479, 121.5395956),
            zoom: 12,
            mapTypeId: 'roadmap',
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            styles: [{
                featureType: "poi",
                stylers: [{
                    visibility: "off"
                }]
            }],
        });
    map.data.loadGeoJson('https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json', null, function (features) {
        features.map(function (feature) {
            var count = feature.getProperty("mask_adult");
            var marker = new google.maps.Marker({
                position: feature.getGeometry().get(0),
                icon: count < 1 ? "https://cdn.frankerfacez.com/emoticon/243754/2" : "https://cdn.frankerfacez.com/emoticon/287489/2"
            });
            markers.push(marker);
            var infowindow = new google.maps.InfoWindow({
                content: `<div class="infoWindow bg-light">
                                        <h5 class="my-2">${feature.getProperty('name')}</h5>
                                        <p class="my-1 h5 text-primary"><span>成人口罩數量：</span>${feature.getProperty('mask_adult')}</p>
                                        <p class="my-1 h5 text-primary"><span>兒童口罩數量：</span>${feature.getProperty('mask_child')}</p>
                                        <p class="my-1 h6">
                                            <i class="fas fa-map-marked-alt"></i>
                                            <a target="_blank" href="https://www.google.com.tw/maps/place/${feature.getProperty('address')}" class="text-info">${feature.getProperty('address')}</a>
                                        </p>                
                                        <p class="my-1 h6"><i class="fas fa-phone-alt"></i>${feature.getProperty('phone')}</p>
                                        <p class="my-1 h6"><i class="fas fa-calendar-alt"></i>${feature.getProperty('note')}</p>
                                        <p class="my-1 h6 text-secondary"><span>數據更新時間：</span>${feature.getProperty('updated')}</p>
                                    </div>`,
                // 設定訊息視窗最大寬度
                maxWidth: 450
            });
            marker.addListener("click", function () {
                infowindow.open(map, marker);
            })
        });
        var clusterOptions = {
            imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            gridSize: 130, //群集網格內的像素數
            zoomOnClick: true, //單擊時是否放大群集
            maxZoom: 15, //始終顯示常規標記之前，您可以放大的最遠級別
        };
        var markerCluster = new MarkerClusterer(map, markers, clusterOptions);
        map.data.setMap(null);
    });
    getUserLocation(map);
    getCityData();
    // map.data.setStyle(function (feature) {
    //     var maskLeft = feature.getProperty('mask_adult');
    //     if (maskLeft > 0) {
    //         return {
    //             icon: 'https://cdn.frankerfacez.com/emoticon/287489/2'
    //         };
    //     } else {
    //         return {
    //             icon: "https://cdn.frankerfacez.com/emoticon/243754/2"
    //         };
    //     }
    // });

    // infowindow = new google.maps.InfoWindow();

    // map.data.addListener('click', function (event) {
    //     var title = `藥局:<h4>${event.feature.getProperty('name')}</h4>`;
    //     var adult = `Adult:<h4>${event.feature.getProperty('mask_adult')}</h4>`;
    //     var child = `Child:<h4>${event.feature.getProperty('mask_child')}</h4>`;
    //     var updated = `Last Updated:<h4>${event.feature.getProperty('updated')}</h4>`;
    //     var address = `Address:<h4>${event.feature.getProperty('address')}</h4>`;
    //     var phone = `Phone:<h4>${event.feature.getProperty('phone')}</h4>`;

    //     infowindow.setContent(title + adult + child + updated + address + phone);
    //     infowindow.setPosition(event.latLng);
    //     infowindow.setOptions({
    //         pixelOffset: new google.maps.Size(0, -55)
    //     });
    //     infowindow.open(map);
    // });
}

function EnableDarkMode() {
    map.setOptions({
        styles: [{
                featureType: "poi",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                elementType: "geometry",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#242f3e"
                }]
            },
            {
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#746855"
                }]
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }]
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{
                    color: "#263c3f"
                }]
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#6b9a76"
                }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{
                    color: "#38414e"
                }]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#212a37"
                }]
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#9ca5b3"
                }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{
                    color: "#746855"
                }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{
                    color: "#1f2835"
                }]
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#f3d19c"
                }]
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{
                    color: "#2f3948"
                }]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#d59563"
                }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    color: "#17263c"
                }]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{
                    color: "#515c6d"
                }]
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{
                    color: "#17263c"
                }]
            }
        ]
    });
}

function DisableDarkMode() {
    map.setOptions({
        styles: [{
            featureType: "poi",
            stylers: [{
                visibility: "off"
            }]
        }]
    });
}

function getUserLocation(map) {
    if (navigator.geolocation) {
        function showPosition(position) {
            var myLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: myLatLng,
                icon: 'http://earth.google.com/images/kml-icons/track-directional/track-8.png',
                map: map
            });
            map.setCenter(myLatLng);
        }

        function showError() {
            console.log('無法取得你的地理位置。')
        }
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log('你的裝置不支援定位功能。');
    }
}
var xhr = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/mikeyeh40709/FileStorage/master/TaiwanCity.json";

function getCityData() {
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var citydata = JSON.parse(this.responseText);
            document.querySelectorAll('.card-body button').forEach(item => item.addEventListener('click', function () {
                var matchdata = citydata.find(x => x.name == item.innerText);
                map.setCenter({
                    lat: matchdata.latlng.lat,
                    lng: matchdata.latlng.lng
                });
            }));
        } else {
            alert(`Error! ${xhr.status}`);
        }
    };
    xhr.open("GET", url);
    xhr.send();
}
