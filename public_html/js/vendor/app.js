
'use strict';

var app = angular.module("phonecatApp", ["firebase"]);

app.controller("PhoneListCtrl", function ($scope, $firebaseObject) {
    var ref = new Firebase("https://commtest.firebaseio.com");

    // download the data into a local object
    $scope.photos = $firebaseObject(ref);

    // putting a console.log here won't work, see below
}).directive('ngRepeatEndWatch', function () {
    return function (scope, element, attrs) {
        console.log("watch complete");

        angular.element(element).css('color', 'blue');
        if (scope.$last) {
            var images = $('#modelinfo-floorplans img');
            var counter = images.length;  // initialize the counter

            images.one("load", function () {
                // do stuff
            }).each(function () {
                imageLoaded();
            });
        }
    };
});

function imageLoaded() {
    // function to invoke for loaded image
    // decrement the counter
    counter--;
    if (counter === 0) {
        $("#modelinfo-floorplans .fp-slide").css("left", "1200px");
        $("#modelinfo-floorplans .fp-slide").eq(0).css("left", "0");

        if ($(".fp-slide").length === 1) {
            $(".slidenavigation, .slidenav").hide();
        } else {
            $(".slidenavigation, .slidenav").show();
        }

        activeSlide = 0;

        $("#modelinfo-floorplans-container").animate({
            opacity: 1
        }, 1000);

    }
}
