$(document).ready(function () {
    var jqxhr = $.getJSON("js/points.json", function () {
        console.log("success");
    })
            .done(function (data) {
                console.log("second success: " + jqxhr.name);
            })
            .fail(function () {
                console.log("error");
            })
            .always(function () {
                console.log("complete");
            });

// Perform other work here ...

// Set another completion function for the request above
    jqxhr.complete(function () {
        console.log("second complete");
    });
})