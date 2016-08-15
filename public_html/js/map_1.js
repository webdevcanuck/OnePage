$(document).ready(function () {

    numberedPins = false;

    // JSON FILE, PIN FOLDER
    jsonMapInfo = [
        ["amenities1.json", "pin1.png"],
        ["amenities2.json", "pin2.png"],
        ["amenities3.json", "pin3.png"]
    ];
    // POINT VARIABLES
    var allPtsAR = [];
    var sectionCount = 0;
    jsonPts(jsonMapInfo);
    function jsonPts(inFile, inFolder) {
        var singlePtsAR = [];
        var points = $.getJSON("js/" + inFile[sectionCount][0], function () {
        }).done(function (data) {
            count = 0;
            $.each(data, function (key, val) {
                var singlePtAR = [];
                count++;
                singlePtAR.push(val.name);
                singlePtAR.push(val.Point.coordinates);
                singlePtsAR.push(singlePtAR);
            });
            singlePtsAR.push(inFile[sectionCount][1]);
            allPtsAR.push(singlePtsAR);
            sectionCount++;
            if (sectionCount === jsonMapInfo.length) {
                initializeMaps(allPtsAR);
            } else {
                jsonPts(jsonMapInfo);
            }
        }).fail(function () {
            console.log("error");
        }).always(function () {
        });
    }

    function initializeMaps(allPtsAR) {
        var myOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            disableDefaultUI: true,
            ZoomControlOptions: true,
            panControl: false,
            zoomControl: true,
            scrollwheel: false,
            styles: [{"featureType": "all", "elementType": "labels.text.fill", "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]}, {"featureType": "all", "elementType": "labels.text.stroke", "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]}, {"featureType": "all", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "administrative", "elementType": "geometry.fill", "stylers": [{"color": "#fefefe"}, {"lightness": 20}]}, {"featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]}, {"featureType": "landscape", "elementType": "geometry", "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]}, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]}, {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#dedede"}, {"lightness": 21}]}, {"featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}, {"lightness": 17}]}, {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]}, {"featureType": "road.arterial", "elementType": "geometry", "stylers": [{"color": "#ffffff"}, {"lightness": 18}]}, {"featureType": "road.local", "elementType": "geometry", "stylers": [{"color": "#ffffff"}, {"lightness": 16}]}, {"featureType": "transit", "elementType": "geometry", "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]}, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]}]
        };
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        infowindow = new google.maps.InfoWindow();
        var marker, i;
        bounds = new google.maps.LatLngBounds();
        setMarkers(allPtsAR);
        setLogo();
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }

    function setLogo() {
        var pos = new google.maps.LatLng(43.0856544, -79.0902007);
        bounds.extend(pos);
        marker = new google.maps.Marker({
            icon: 'img/site-pin.png',
            position: pos,
            map: map,
            zIndex: 9999
        });
        google.maps.event.addListener(marker, 'click', (function (marker) {
            return function () {
                infowindow.setContent('<div>Noval Development Group</div>');
                infowindow.open(map, marker);
            }
        })(marker));
        map.fitBounds(bounds);
    }

    function setMarkers(allPtsAR, inCat) {
        allPinsAR = [];
        pinCount = 0;
        startCat = inCat ? inCat : 0;
        lenCat = inCat ? (inCat + 1) : allPtsAR.length;
        singlePinsAR = []; // SEPERATE PINS FOR EACH AMENITY IN SEPERATE ARRAYS
        allMarkers = []; // ALL PINS
        for (i = startCat; i < lenCat; i++) { // AMENITY CATEGORY       
            singlePinsTemp = [];

            for (a = 0; a < allPtsAR[i].length; a++) { // EACH AMENITY INFO

                console.log("st: " + startCat + " lc: " + lenCat + " i: " + a);
                getFolder = allPtsAR[i][(allPtsAR[i].length - 1)];
                getSetPin = allPtsAR[i][(allPtsAR[i].length)];
                console.log(getSetPin);
                allPinsAR.push(allPtsAR[i][a][0]);
                console.log("all Pins: " + allPtsAR[i][a][0]);
                var latlong = allPtsAR[i][a][1].split(',');
                var pos = new google.maps.LatLng(latlong[1], latlong[0]);
                bounds.extend(pos);

                if (numberedPins) {
                    pinImage = 'img/' + getFolder + '/number_' + (a + 1) + '.png'
                } else {
                    pinImage = 'img/' + getFolder;
                }

                marker = new google.maps.Marker({
                    icon: pinImage,
                    position: pos,
                    map: map
                });
                singlePinsTemp.push(marker);
                allMarkers.push(marker);

                google.maps.event.addListener(marker, 'click', (function (marker, pinCount) {
                    return function () {
                        infowindow.setContent('<div>' + allPinsAR[pinCount] + '</div>');
                        infowindow.open(map, marker);
                        map.setCenter(marker.getPosition());
                    };
                })(marker, pinCount));
                map.fitBounds(bounds);
                pinCount++;
            }
            singlePinsAR.push(singlePinsTemp);
        }
    }

    $("#amenity-list button").click(function () {
        
        console.log("hi");
        
        infowindow.close();

        amenityDetails = false;
        // - - - - - - - - - - AMENITY DETAILS - - - - - - - - - - //
        if ($(this).children(".amenity-info").length) {
            if ($(this).children(".amenity-info").css("display") != "block") {
                $(".amenity-info").slideUp();
                $(".glyphicon").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
                $(this).children(".glyphicon").addClass("glyphicon-menu-up").removeClass("glyphicon-menu-down");
                $(this).children(".amenity-info").slideToggle();
            } else {
                $(this).children(".glyphicon").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
                $(this).children(".amenity-info").slideToggle();
                amenityDetails = true;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - //

        if ($(this).attr("data-val") && !amenityDetails) {
            thsData = $(this).attr("data-val");
            console.log(singlePinsAR[thsData]);

            // REMOVE ALL
            for (var i = 0, n = allMarkers.length; i < n; ++i) {
                allMarkers[i].setMap(null);
            }

            var bounds = new google.maps.LatLngBounds();
            // SHOW ONLY SELECTED
            for (var i = 0, n = (singlePinsAR[thsData].length - 1); i < n; ++i) {
                singlePinsAR[thsData][i].setMap(map);
                resetBounds(singlePinsAR[thsData][i]);
            }
        } else {

            var bounds = new google.maps.LatLngBounds();
            // SHOW ALL
            for (var i = 0, n = (allMarkers.length - 1); i < n; ++i) {
                allMarkers[i].setMap(map);
                resetBounds(allMarkers[i]);
            }
        }
        map.fitBounds(bounds);
        var center = map.getCenter();
        map.setCenter(center);

        function resetBounds(inMarker) {
            var lat = inMarker.getPosition().lat();
            var lng = inMarker.getPosition().lng();
            var pos = new google.maps.LatLng(lat, lng);
            bounds.extend(pos);
        }

    });

});
