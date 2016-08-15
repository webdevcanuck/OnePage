
$(document).ready(function () {
    $(window).load(function () {

        // - - - - - - - - - - OPTIONS - - - - - - - - - - - - - - //
        fadeInScroll = false;   // LAZY LOAD ELEMENTS ON SCROLL / IN VIEW
        fullPanels = false;     // MAKE ALL PANELS HEIGHT OF WINDOW
        vAlignNavbar = true;    // VERTICAL ALIGN TOP MENU
        logoScrollH = false;    // SIZE LOGO ON SCROLL
        regOnLoad = false;
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - VERTICAL ALIGN NAVBAR - - - - - - - - - - - - - - //
        function vAlignNav() {
            if (vAlignNavbar) {
                $("#navbar-container").css("margin-top", "auto");
                if (!isXS()) {
                    navH = $("#navbar-container").height() / 2;
                    navContainerH = $(".navbar").height() / 2;
                    $("#navbar-container").css("margin-top", navContainerH - navH + "px");
                }
            }
        }
        // - - - - - - - - - - RETURN WINDOW SIZE - - - - - - - - - - - - - - //
        function fullPanel() {
            if (fullPanels) {
                $(".section").css("height", winSize(false) - $(".navbar-inverse").height() + "px");
            }
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - RETURN WINDOW SIZE - - - - - - - - - - - - - - //
        function winSize(w, half) {
            divide = half ? 2 : 1;            
            if (w) {
                return $(window).width() / divide;
            } else {
                return $(window).height() / divide;
            }
        }
        // - - - - - - - - - - - - - - - - - - - - //

        var winW = winSize(true);
        var firstFire = true;

        // - - - - - - - - - - INITIAL LOAD AND RESIZE - - - - - - - - - - - - - - //
        function isLoaded(inChk) {
            // - - - - - - - - - - PAUSE ON LOAD
            setTimeout(function () {
                // - - - - - - - - - - MAKE SURE WINDOW SIZE HAS ACTUALLY CHANGED (TABLET/PHONE KEYBOARD)
                if (inChk === true || winW !== winSize(true)) {
                    fullPanel();
                    vAlignNav();
                    vAlign();
                    fadeIn();
                }
                winW = winSize(true);
                firstFire = false;
            }, 250);
        }
        isLoaded(firstFire);
        $(window).resize(function () {
            setTimeout(function () {
                if (winW !== winSize(true)) {
                    $("body").css("opacity", 0);
                    isLoaded(firstFire);
                }
            }, 250);
        });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - FADE IN BODY ON LOAD - - - - - - - - - - //
        function fadeIn() {
            navH = $(".navbar-inverse").height();
            $("body").css("padding-top", navH + "px");
            $("body").animate({
                opacity: 1
            }, 500);
        }
        // 
        // - - - - - - - - - - IS MOBI ONLY - - - - - - - - - - //
        function isCell() {
            return (/Android|webOS|iPhone|iPod|BlackBerry|BB|IEMobile|Windows Phone|Silk|Opera Mini/i.test(navigator.userAgent)) ? true : false;
        }
        // - - - - - - - - - - IS MOBI OR TABLET - - - - - - - - - - //
        function isMobi() {
            return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) ? true : false;
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // - - - - - - - - - - IS XS VISIBLE - - - - - - - - - - //
        function isXS() {
            return $("#is-xs").css("display") === "block" ? true : false;
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - IS SM VISIBLE - - - - - - - - - - //
        function isSM() {
            return $("#is-sm").css("display") === "block" ? true : false;
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - MAIN MENU SCROLLER - - - - -  - - - - - //
        $(".navit").click(function (event) {
            event.preventDefault();
            if (isXS()) {
                $(".navbar-collapse").animate({
                    height: "1px"
                }).removeClass("in");
            }

            thsNav = $(this).attr("href");

            if (thsNav !== 'body') {
                $(".panelbox").hide();
                $(thsNav).fadeIn();
            }
            if ($(thsNav).length) {
                $("body").bind('mousewheel DOMMouseScroll', function (e) {
                    return false;
                });
                getPad = $(".navbar-inverse").height(); // FIXED TOP HEADER
                //getPad = 0;
                scrollIt = setTimeout(function () {
                    $('html, body').animate({
                        scrollTop: $(thsNav).offset().top - getPad
                    }, 1500, function () {
                        $("body").unbind('mousewheel DOMMouseScroll');
                    });
                }, 500);
            }
        });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - MAIN MENU CHANGE INDICATOR ON SCROLL - - - - - - - - - - //    
        var getLast = '';

        $(window).on('scroll', function () {

            if (logoScrollH) {
                if ($(document).scrollTop() > 0) {
                    if ($('#logo').data('size') == 'big') {
                        $('#logo').data('size', 'small');
                        $('#logo').stop().animate({
                            width: '80px',
                            'margin-top': 0
                        }, 600);
                    }
                } else {
                    if ($('#logo').data('size') == 'small') {
                        $('#logo').data('size', 'big');
                        $('#logo').stop().animate({
                            width: sloganH,
                            'margin-top': -15
                        }, 600);
                    }
                }
            }

            var scrollTop = $(this).scrollTop();
            $('.section').each(function () {
                var topDistance = $(this).offset().top;
                getprev = getLast;
                if ((topDistance - ($(".navbar-inverse").height() + 1)) < scrollTop) {
                    $(".navbar-form a").removeClass("actv");
                    getLast = $(this).attr("id");
                    $("#navbar-container [href=#" + getLast + "]").addClass("actv");
                }
            });

            // - - - - - - - - - - FADE IN SECTION ON SCROLL - - - - - - - - - - //  
            if (fadeInScroll) {
                $(".section").each(function (i) {
                    var bottom_of_object = $(this).offset().top + $(this).outerHeight() / 4;
                    var bottom_of_window = $(window).scrollTop() + $(window).height();
                    var elemTop = $(this).offset().top;
                    var elemBottom = elemTop + $(this).height();

                    if (bottom_of_window > bottom_of_object) {
                        $(this).animate({'opacity': '1'}, 400);
                    } else if (elemTop < elemBottom) {
                        $(this).stop(true, false).animate({'opacity': '0'}, 250);
                    }
                });
            }

        });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - VERTICAL ALIGN ELEMENT TO PARENT - - - - - - - - - - //
        function vAlign(inParent) {
            $(".valign").each(function () {
                parentH = !inParent ? $(this).parent().height() / 2 : inParent;
                thsH = $(this).height() / 2;
                $(this).css("margin-top", parentH - thsH + "px");
            });
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - FANCYBOX - - - - - - - - - - //
        $(".fbox").fancybox({
            padding: 0
        });

        $(".fancybox").fancybox({
            padding: 0
        });

        // - - - - - - - - - - TRIGGER REGISTRATION ON LOAD - - - - - - - - - - //
        if (regOnLoad) {
            $.fancybox.open([
                {
                    href: '#registernow-pop'
                }
            ], {
                padding: 0,
                maxWidth: 950
            });
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - HASHTAG LISTENER ON LOAD (THANK YOU)- - - - - - - - - - //
        var hash = window.location.hash;
        if (hash === "#thankyou") {
            $("#registernow-pop .title2").html("THANK YOU FOR REGISTERING<br/>WITH SUMMERFIELDS");
            thankYou = "<div class='col-md-12 text-center'><p style='color:#756724'>Thank you for registering with Riverside Trail. Stay tuned for your first exclusive update coming soon.</p></div>";
            $("#registernow-pop #regform-container .row").html(thankYou);
            getPad = $(".navbar-header").height();

            $("#regbox-title").html("THANK YOU FOR REGISTERING<br/>WITH RIVERSIDE SUMMERFIELDS");
            $("#regbox-text").html("<p class='text-center'>Stay tuned for your first exclusive update coming soon.</p>");
            $('html, body').animate({
                scrollTop: $("#registernow-pop").offset().top
            }, 1500);
        }
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - FORM VALIDATION - - - - - - - - - - //
        $("#submitform-btn-box").click(function () {
            err = false;
            $("#regbox-container .req").removeClass("input-err");
            $(".err-msg").hide();
            $("#regbox-container .req").each(function () {
                if (!$(this).val()) {
                    $(this).addClass("input-err");
                    $("#regbox-container .err-msg").show();
                    err = true;
                }
            });
            if (err) {
                return false;
            }
        });
        $("input[type=text], input[type=email]").bind("click focus", function () {
            $(".err-msg").hide();
            $(this).removeClass("input-err");
        });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - ONLY NUMBERS IN PHONE FIELD - - - - - - - - - - //
        $(".numonly").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                    // Allow: Ctrl+A, Command+A
                            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                            // Allow: home, end, left, right, down, up
                                    (e.keyCode >= 35 && e.keyCode <= 40)) {
                        // let it happen, don't do anything
                        return;
                    }
                    // Ensure that it is a number and stop the keypress
                    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                        e.preventDefault();
                    }
                });
        // - - - - - - - - - - - - - - - - - - - - //
        // 
        // - - - - - - - - - - SLIDER - - - - - - - - - - //
        var _SlideshowTransitions = [
            //Fade
            {$Duration: 1200, $Opacity: 2}
        ];

        var options = {
            $BulletNavigatorOptions: {//[Optional] Options to specify and enable navigator or not
                $Class: $JssorBulletNavigator$, //[Required] Class to create navigator instance
                $ChanceToShow: 2, //[Required] 0 Never, 1 Mouse Over, 2 Always
                $ActionMode: 1, //[Optional] 0 None, 1 act by click, 2 act by mouse hover, 3 both, default value is 1
                $AutoCenter: 1, //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1, //[Optional] Steps to go for each navigation request, default value is 1
                $Lanes: 1, //[Optional] Specify lanes to arrange items, default value is 1
                $SpacingX: 5, //[Optional] Horizontal space between each item in pixel, default value is 0
                $SpacingY: 0, //[Optional] Vertical space between each item in pixel, default value is 0
                $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
            },
            $FillMode: 2, //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
            $AutoPlay: true, //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
            $AutoPlayInterval: 2000, //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
            $PauseOnHover: 1, //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

            $ArrowKeyNavigation: true, //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
            $SlideEasing: $JssorEasing$.$EaseOutQuint, //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
            $SlideDuration: 800, //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
            $MinDragOffsetToSlide: 20, //[Optional] Minimum drag offset to trigger slide , default value is 20
            //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
            //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
            $SlideSpacing: 0, //[Optional] Space between each slide in pixels, default value is 0
            $DisplayPieces: 1, //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
            $ParkingPosition: 0, //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
            $UISearchMode: 1, //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
            $PlayOrientation: 1, //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
            $DragOrientation: 3, //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
            $ArrowNavigatorOptions: {//[Optional] Options to specify and enable arrow navigator or not
                $Class: $JssorArrowNavigator$, //[Requried] Class to create arrow navigator instance
                $ChanceToShow: 1, //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 2, //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
            },
            $SlideshowOptions: {//[Optional] Options to specify and enable slideshow or not
                $Class: $JssorSlideshowRunner$, //[Required] Class to create instance of slideshow
                $Transitions: _SlideshowTransitions, //[Required] An array of slideshow transitions to play slideshow
                $TransitionsOrder: 1, //[Optional] The way to choose transition to play slide, 1 Sequence, 0 Random
                $ShowLink: true                                    //[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false
            },
        };
        //var jssor_slider1 = new $JssorSlider$("slider1_container", options);
        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizes
        function ScaleSlider() {
            var bodyWidth = $("body").width();
            if (bodyWidth)
                jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 3200));
            else
                window.setTimeout(ScaleSlider, 30);
        }
        //ScaleSlider();
        //$(window).bind("load", ScaleSlider);
        //$(window).bind("resize", ScaleSlider);
        //$(window).bind("orientationchange", ScaleSlider);

        // - - - - - - - - - - HIGHRISE FLOORPLANS - - - - - - - - - - //
        function FloorplansOut() {
            // - - - - FLOORPLAN ARRAY - - - - - //
            floorPlans = [
                ["Paradise", "1bd", "ConsMirage-ParadiseSeries.pdf", "ConsMirage-Paradise", "1 BEDROOM", "583 SQ.FT."],
                ["Oasis", "1bd", "ConsMirage-OasisSeries.pdf", "ConsMirage-Oasis", "1 BEDROOM", "602 SQ.FT."],
                ["Dream", "1bdden", "ConsMirage-DreamSeries.pdf", "ConsMirage-Dream", "1 BEDROOM + DEN", "627 SQ.FT."],
                ["Jewel", "1bdden", "ConsMirage-JewelSeries.pdf", "ConsMirage-Jewel", "1 BEDROOM + DEN", "633 SQ.FT."],
                ["Universe", "1bdden", "ConsMirage-UniverseSeries.pdf", "ConsMirage-Universe", "1 BEDROOM + DEN", "645 SQ.FT."],
                ["Eden", "1bdden", "ConsMirage-EdenSeries.pdf", "ConsMirage-Eden", "1 BEDROOM + DEN", "645 SQ.FT."],
                ["Prestige", "2bd", "ConsMirage-PrestigeSeries.pdf", "ConsMirage-Prestige", "2 BEDROOM", "752 SQ.FT."],
                ["Riviera", "2bd", "ConsMirage-RivieraSeries.pdf", "ConsMirage-Riviera", "2 BEDROOM", "781 SQ.FT."],
                ["Harmony", "2bd", "ConsMirage-HarmonySeries.pdf", "ConsMirage-Harmony", "2 BEDROOM", "790 SQ.FT."],
                ["Jubile", "2bd", "ConsMirage-JubileeSeries.pdf", "ConsMirage-Jubilee", "2 BEDROOM", "843 SQ.FT."],
                ["Destiny", "2bdden", "ConsMirage-DestinySeries.pdf", "ConsMirage-Destiny", "2 BEDROOM + DEN", "858 SQ.FT."],
                ["Infinity", "2bdden", "ConsMirage-InfinitySeries.pdf", "ConsMirage-Infinity", "2 BEDROOM + DEN", "874 SQ.FT."],
                ["Grande", "2bdden", "ConsMirage-GrandeSeries.pdf", "ConsMirage-Grande", "2 BEDROOM + DEN", "950 SQ.FT."]
            ];
            // - - - - LOOP THROUGH FLOORPLANS AND APPEND TO ELEMENT - - - - - //
            for (i = 0; i < floorPlans.length; i++) {
                $("#floorplansout").append('<div class="col-md-4 ' + floorPlans[i][1] + ' fpsingle"><div>' + floorPlans[i][0] + '</div>');
            }
        }
        FloorplansOut();
        // - - - - - - - - - - FILTER FLOORPLANS - - - - - - - - - - //
        $("#fpfilter .btn-red").click(function () {
            thsFilter = $(this).attr("data-filter");            
            $(".fpsingle").hide();
            $(thsFilter).fadeIn(250);
        });
        // - - - - - - - - - - END FLOORPLANS - - - - - - - - - - //
    });
});
    