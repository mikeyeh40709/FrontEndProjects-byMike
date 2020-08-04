var map;
// var infowindow;
var markers = [];
var destinationlatlng;

function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    map = new google.maps.Map(
        document.getElementById('map'), {
            center: new google.maps.LatLng(25.0412479, 121.5395956),
            zoom: 12,
            mapTypeId: 'roadmap',
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER,
            },
            fullscreenControlOptions: {
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
                                        <p class="my-1 h6 text-secondary"><span>數據更新時間：</span>${feature.getProperty('updated')}</p><button>${feature.getGeometry().get(0)}</button>
                                    </div>`,
                // 設定訊息視窗最大寬度
                maxWidth: 450
            });
            marker.addListener("click", function () {
                infowindow.open(map, marker);
                document.querySelector('#clearInput').value = `${feature.getProperty('name')}`;
            });

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
    autoComplete();
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
var myLatLng;

function getUserLocation(map) {
    if (navigator.geolocation) {
        function showPosition(position) {
            myLatLng = {
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
            alert('Unable to get your location');
        }
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Your device does not support location function");
    }
}
var xhr = new XMLHttpRequest();
var url = "https://raw.githubusercontent.com/mikeyeh40709/FileStorage/master/TaiwanCity.json";
var citydata = [];

function getCityData() {
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            citydata = JSON.parse(this.responseText);
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

function autoComplete() {
    const googleMap = new Vue({
        el: '#app',
        data: {
            map: null,
            autocomplete: null, // google map Autocomplete method
            site: '', // place API要綁定的搜尋框
            place: null // 存place確定後回傳的資料
        },
        methods: {
            // init google map
            // initMap() {
            //     let location = {
            //         lat: 25.0412479,
            //         lng: 121.5395956
            //     };
            // },
            // 地址自動完成 + 地圖的中心移到輸入結果的地址上
            siteAuto() {
                let options = {
                    componentRestrictions: {
                        country: 'tw'
                    } // 限制在台灣範圍
                };
                this.autocomplete = new google.maps.places.Autocomplete(this.$refs.site, options);

                // 地址的輸入框，值有變動時執行
                this.autocomplete.addListener('place_changed', () => {
                    this.place = this.autocomplete.getPlace(); // 地點資料存進place
                    console.log(this.place);
                    // 確認回來的資料有經緯度
                    if (this.place.geometry) {
                        document.querySelector('#clearInput').textContent = this.place.name;
                        // 改變map的中心點
                        var searchCenter = this.place.geometry.location;

                        // panTo是平滑移動、setCenter是直接改變地圖中心
                        map.panTo(searchCenter);

                        var icon = {
                            url: "https://pbs.twimg.com/profile_images/866586642823426048/V7o0Qf0K_400x400.png", // url
                            scaledSize: new google.maps.Size(60, 60), // scaled size
                            origin: new google.maps.Point(0, 0), // origin
                            anchor: new google.maps.Point(0, 0) // anchor
                        };
                        // 在搜尋結果的地點上放置標記
                        var searchmarker = new google.maps.Marker({
                            position: searchCenter,
                            map: map,
                            icon: icon,
                        });
                        //搜尋後zoom近標記
                        map.setZoom(16);
                        //把標記放到array裡
                        var searchmarkers = [];
                        searchmarkers.push(searchmarker);
                        // info window
                        // var infowindow = new google.maps.InfoWindow({
                        //     content: this.place.formatted_address
                        // });
                        // infowindow.open(map, searchmarker);
                        //清除所有搜尋後放置的標記
                        document.querySelectorAll(".input-group-append button").forEach(x => x.addEventListener("click", function () {
                            searchmarkers.forEach(function (item) {
                                item.setMap(null);
                            });
                            searchmarkers = [];
                            map.setZoom(12);
                            document.querySelector("#app").style.height = "96px";
                            document.querySelector("#app").style.overflow = "hidden";
                            document.querySelector('#clearInput').value = "";
                            map.setCenter(myLatLng);
                        }));
                    }

                });
            }
        },
        mounted() {
            window.addEventListener('load', () => {
                // this.initMap();
                this.siteAuto();
            });
        }
    });
}

function unfoldSearch() {
    document.querySelector("#app").style.height = "100vh";
    document.querySelector("#app").style.overflow = "auto";
}

function foldSearch() {
    document.querySelector("#app").style.height = "96px";
    document.querySelector("#app").style.overflow = "hidden";
    document.querySelector('#clearInput').value = "";
}

function changeHeight() {
    document.querySelector("#app").style.height = "100vh";
    document.querySelector("#app").style.overflow = "auto";
}

function clearInput() {
    // document.querySelector('#clearInput').value = "";
    // for (var i = 0; i < markers.length; i++) {
    //     markers[i].setMap(null);
    // }
    // markers = [];
}