/*----------------------------------*\
/*----------------------------------*\
         TNC MAIN UI SCRIPT
/*----------------------------------*\
\*----------------------------------*/


/*------------------------------------*\
  #Ready
\*------------------------------------*/

$(document).ready(function() {
    $('#section__container').fullpage({
        anchors: ['gif', '', 'maps', '', '', '', '', '', ''],
        scrollingSpeed: 1200,
        navigation: true,
        navigationPosition: 'left',

        onLeave: function(index, nextIndex, direction) {
            sectionCheck(nextIndex, direction);
        }
    });
    hideSlidesDots()
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);

    initPlayer(); //Init main video player
    bingindGIF();
    peopleBinding();
    peopleModalBinding();
    closeModal();
    shares();
    scrollLocation();


    $.fn.fullpage.silentMoveTo(9);
});

/*------------------------------------*\
  #Control Slides Functionalities
\*------------------------------------*/
function hideSlidesDots() {
    $('#fp-nav ul li:nth-child(2), #fp-nav ul li:nth-child(4), #fp-nav ul li:nth-child(6), #fp-nav ul li:nth-child(8)').css('display', 'none');
}

/*------------------------------------*\
  #Video Functionalities
\*------------------------------------*/
var player = $("#player_1");

function initPlayer() {
    player.YTPlayer();
    player.on('YTPReady', function(event) {
        var preloader = $('.preloader__container');
        preloader.fadeOut('400', function() {
            // your code that shows the map div
            $('#map-one').show();

        });
        $.fn.fullpage.setAllowScrolling(true);
        $.fn.fullpage.setKeyboardScrolling(true);
    });
    player.on('YTPEnd', function(event) {
        parent.location.hash = '#!';
    });
    player.on('YTPPlay', function(event) {
        event.preventDefault();
        if(parent.location.hash != '#c-video') {
            player.YTPStop();
        }
    });
    $('#player_1_close').on('click', function() {
        player.YTPStop();
    });

    $('#player_1_open').on('click', function() {
        player.YTPPlay();
    });
}

/*------------------------------------*\
  #Sections Manipulation
\*------------------------------------*/
function sectionCheck(section_index, direction) {
    switch (section_index) {
        case 1:

            break;
        case 2:
            var svg = $('#svg_four');
            if (!svg.hasClass('animated')) {
                svg_four();
                svg.addClass('animated');
            } else {
                //changeSection(direction, section_index);
            }
            break;
        case 3:

            break;
        case 4:
            setTimeout(function() {
                //changeSection(direction, section_index);
            }, 500)
            break;
        case 5:

            break;
        case 6:
            var svg = $('#svg_third');
            if (!svg.hasClass('animated')) {
                svg_third();
                svg.addClass('animated');
            } else {
                //changeSection(direction, section_index);
            }
            break;
        case 7:
            var svg = $('#svg_second');
            if (!svg.hasClass('animated')) {
                svg_second();
                svg.addClass('animated');
            }
            bulletInformation();
            break;
        case 8:
            var svg = $('#svg_first');
            if (!svg.hasClass('animated')) {
                svg_first();
                svg.addClass('animated');
            } else {
                //changeSection(direction, section_index);
            }
            break;
        case 9:
            var svg = $('#svg_first');
            if (direction == "down" && $('#svg_first').hasClass('animated')) {
                $('#player_1').YTPStop();
            }
            break;
        default:
            break;
    }
}

function changeSection(direction, index) {
    if (direction == 'down') {
        setTimeout(function() {
            $.fn.fullpage.moveTo((index + 1), 0);
        }, 1500)

    } else {
        setTimeout(function() {
            $.fn.fullpage.moveTo((index - 1), 0);
        }, 1500)
    }
}

/*------------------------------------*\
  #GIF Section Binding
\*------------------------------------*/
function bingindGIF() {
    var itemList = $('.gif__list li a img');
    var gifMain = $('.gif__main img');
    var twitter = $('#twitter');
    var facebook = $('#facebook');
    $.each(itemList, function(index, val) {
        $(this).on('click', function(event) {
            event.preventDefault();
            var src = $(this).attr('src');
            gifMain.attr('src', (src.substr(0, src.length - 3) + 'gif'));
            gifMain.attr('data-name', $(this).attr('data-name'));
            twitter.attr('data-name', $(this).attr('data-name'));
            facebook.attr('data-name', $(this).attr('data-name'));
        });
    });
}

function peopleBinding() {
    var people = $('.people__nav a');

    $.each(people, function(index, val) {
        $(this).on('click', function(event) {
            event.preventDefault();
            var typeAnim = $(this).attr('data-anim');
            switch (typeAnim) {
                case "center":
                    $(this).parent().siblings('.people__modal').addClass('anim__people__full--center');
                    break;
                case "right":
                    $(this).parent().siblings('.people__modal').addClass('anim__people__full--right');
                    break;
                case "left":
                    $(this).parent().siblings('.people__modal').addClass('anim__people__full--left');
                    break;
                default:
                    break;
            }
        });
    });
}

function peopleModalBinding() {
    var drops = $('.people__container .people__modal__content .item__info .ms-icon');
    $.each(drops, function(index, val) {
        $(this).on('click', function(event) {
            event.preventDefault();
            $(this).parent().toggleClass('active');
        });
    });
}

function closeModal() {
    var modalClose = $('.modal__close');
    $.each(modalClose, function(index, val) {
        $(this).on('click', function(event) {
            event.preventDefault();
            var typeAnim = $(this).attr('data-anim');
            switch (typeAnim) {
                case "center":
                    $(this).parent().parent().removeClass('anim__people__full--center');
                    break;
                case "right":
                    $(this).parent().parent().removeClass('anim__people__full--right');
                    break;
                case "left":
                    $(this).parent().parent().removeClass('anim__people__full--left');
                    break;
                default:
                    break;
            }
        });
    });
}

function scrollLocation() {
    var scroll = $('.scrollLocation');
    $.each(scroll, function(index, val) {
        $(this).on('click', function(event) {
            event.preventDefault();
            $.fn.fullpage.moveSectionUp();
        });
    });
}

function bulletInformation() {
    var bullets = $('.bullet__information');
    $.each(bullets, function(index, val) {
        $(this).addClass('anim__fade-in');
    });
}

/*------------------------------------*\
    Shares Functions
\*------------------------------------*/

function shares() {
    var shareUrl = $("link[rel=canonical]").attr("href");

    var facebookPromise = jQuery('#facebook').socialShare({
        network: 'facebook',
        jsonURL: '//graph.facebook.com/?id=' + shareUrl,
        typeofcount: 'shares'
    });

    var twitterPromise = jQuery('#twitter').socialShare({
        network: 'twitter',
        jsonURL: '//graph.facebook.com/?id=' + shareUrl,
        cachecontrol: true,
        typeofcount: 'count'
    });
}

/*------------------------------------*\
  #SVG Drawing
\*------------------------------------*/
svg_first = function() {
    var width = 1600,
        height = 960,
        scale = 1.0;
    var tnc_line_1 = new Raphael('svg_first', width, height);
    var tnc_line_1_pathString = 'M200.608-136.906c0-1.657 1.344-3 3-3s3 1.343 3 3-1.344 3-3 3-3-1.343-3-3M40.5 60.4c0-1.657 1.344-3 3-3s3 1.343 3 3-1.344 3-3 3-3-1.343-3-3M187.867 397.908c0-1.657 1.344-3 3-3s3 1.343 3 3-1.344 3-3 3-3-1.343-3-3 M184.867 397.908c0-3.313 2.687-6 6-6s6 2.687 6 6-2.687 6-6 6-6-2.687-6-6m-147.4-337.9c0-3.312 2.687-6 6-6s6 2.688 6 6-2.687 6-6 6-6-2.686-6-6m159.708-196.822c0-3.313 2.687-6 6-6s6 2.687 6 6c0 3.314-2.687 6-6 6s-6-2.686-6-6m386.707 682.45s2.118-32.662 24.553-48.182c33.56-23.215 139.356-11.39 145.097-32.195 17.305-62.705-610.728-23.918-609.993-94.88-1.104-22.427 25.736-38.972 19.118-56.988-15.9-43.28-85.668-27.943-73.902-90.08 4.78-26.84 38.997-41.12 37.135-82.727C124.02 98.743 25.43 70.597 23.02 24.032 23.013-17.5 200.355-57.238 204.5-121.5c4-62-71.206-58.56-97.604-84.08C32.5-277.5 446.5-295.5 542.732-333.72 584.428-350.277 584-410.834 584-410.834';

    var triangle = tnc_line_1.path(tnc_line_1_pathString).attr({
        stroke: '#00bfff',
        opacity: 0
    });
    var obj = {
        length: 0,
        pathLength: triangle.getTotalLength()
    };
    var drawLine = function() {
        var offset, subpath;
        offset = obj.pathLength * tween.progress();

        subpath = triangle.getSubpath(0, offset);
        tnc_line_1.clear();
        tnc_line_1.path(subpath).attr({
            stroke: '#00bfff',
            "stroke-width": 3
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_1.setViewBox(-220, -409.45, width, height, false);
    };
    tween = TweenMax.to(triangle, 2, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this,
        onComplete: function() {
            $.fn.fullpage.moveSectionUp();
        }
    });
};

svg_second = function() {
    var width = 1600,
        height = 960,
        scale = 1.00;
    var tnc_line_2 = new Raphael('svg_second', width, height);
    var tnc_line_2_pathString = 'M103.08 428.967c0-3.312 2.685-6 6-6 3.313 0 6 2.688 6 6 0 3.313-2.687 6-6 6-3.315 0-6-2.687-6-6 M627.242 469.374c0-3.312 2.685-6 6-6 3.313 0 6 2.688 6 6 0 3.313-2.687 6-6 6-3.315 0-6-2.686-6-6M106.08 428.967c0-1.657 1.346-3 3-3s3 1.343 3 3c0 1.653-1.346 3-3 3s-3-1.347-3-3 M914.558 197.85c0-3.313 2.685-6 6-6 3.313 0 6 2.687 6 6 0 3.312-2.687 5.998-6 5.998-3.316 0-6-2.686-6-6M630.24 469.374c0-1.657 1.348-3 3.002-3s3 1.343 3 3c0 1.653-1.346 3-3 3s-3-1.347-3-3 M917.557 197.85c0-1.66 1.347-3.002 3-3.002s3 1.343 3 3c0 1.654-1.345 3-3 3s-3-1.346-3-3 M626.5 982.5c60.993-122.188 43.71-82.25 75.478-158.69 3.947-9.497 6.538-25.893 4.58-35.973-.683-3.508-1.014-3.53-1.7-7.037-2.12-10.805-155.483-100.586-164.995-106.273-50.728-30.336-206.07-115.89-206.07-115.89-18.355-11.517-42.648-5.936-54.346 12.238L183.2 711.905c-11.698 18.176-35.63 23.576-53.986 12.417L19.084 657.56C.008 645.862-5.75 620.852 6.306 601.958l96.454-148.46c11.876-18.357 6.837-42.83-11.517-54.887l-21.415-14.036c-18.536-12.057-23.574-37.07-11.336-55.424l128.125-190.93c12.237-18.174 37.07-23.033 55.244-10.795l157.458 106.71c17.996 12.237 22.855 36.71 10.8 54.886l-38.33 57.585c-12.418 18.534-7.02 43.728 11.876 55.604 44.088 27.892 123.626 75.576 172.394 104.55 22.852 13.68 52.365 5.94 65.68-17.275 22.315-38.868 54.888-96.092 74.502-131.903 10.978-19.975 36.35-26.633 55.603-14.576l256.61 159.257c18.36 11.336 42.29 6.117 54.167-11.876l65.864-100.414c15.835-24.113 8.636-56.504-15.836-71.8L599.605-2.5';

    var triangle = tnc_line_2.path(tnc_line_2_pathString).attr({
        stroke: '#00bfff',
        opacity: 0
    });
    var obj = {
        length: 0,
        pathLength: triangle.getTotalLength()
    };
    var drawLine = function() {
        var offset, subpath;
        offset = obj.pathLength * tween.progress();

        subpath = triangle.getSubpath(0, offset);
        tnc_line_2.clear();
        tnc_line_2.path(subpath).attr({
            stroke: '#00bfff',
            "stroke-width": 3
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_2.setViewBox(-170, 0, width, height, false);
    };
    tween = TweenMax.to(triangle, 2, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
    });
};

svg_third = function() {
    var width = 300,
        height = 960,
        scale = 1.00;
    var tnc_line_3 = new Raphael('svg_third', width, height);
    var tnc_line_3_pathString = 'M22.616 101.71c0 3.313 2.685 6 6 6 3.313 0 6-2.687 6-6 0-3.312-2.687-6-6-6-3.315 0-6 2.688-6 6 M188.582 372.097c0 3.313 2.685 6 6 6 3.313 0 6-2.687 6-6 0-3.312-2.688-6-6.002-6-3.313 0-6 2.688-6 6M25.615 101.71c0 1.653 1.345 3 3 3s3-1.347 3-3c0-1.657-1.347-3-3-3s-3 1.343-3 3 M165.326 789.102c0 3.313 2.684 6 6 6 3.313 0 6-2.687 6-6 0-3.312-2.688-6-6-6-3.317 0-6 2.688-6 6m26.254-417.005c0 1.653 1.346 3 3 3 1.655 0 3-1.347 3-3 0-1.657-1.347-3-3-3s-3 1.343-3 3 M168.324 789.102c0 1.653 1.346 3 3 3 1.655 0 3-1.347 3-3 0-1.656-1.347-3-3-3s-3 1.343-3 3 M44.93 960l-23.05-16.205c-19.99-14.047-19.63-43.945.9-57.265l154.867-101.39c23.77-15.666 25.93-49.7 4.32-68.246L168.82 705.73c-13.143-11.348-14.585-31.155-3.24-44.122l33.5-38.537c20.165-23.046 16.02-58.524-9.007-75.994-34.938-24.488-70.95-61.045-45.02-97.24 1.803-2.52 31.872-50.782 55.286-86.256 13.323-19.99 5.76-47.18-16.033-57.446l-121.55-57.266C29.803 233.2-3.333 192.503.27 154.146c2.52-26.65 24.49-39.076 33.314-62.486 8.284-22.33 7.024-47.362-3.602-68.61L18.457 0';

    var triangle = tnc_line_3.path(tnc_line_3_pathString).attr({
        stroke: '#00bfff',
        opacity: 0
    });
    var obj = {
        length: 0,
        pathLength: triangle.getTotalLength()
    };
    var drawLine = function() {
        var offset, subpath;
        offset = obj.pathLength * tween.progress();

        subpath = triangle.getSubpath(0, offset);
        tnc_line_3.clear();
        tnc_line_3.path(subpath).attr({
            stroke: '#00bfff',
            "stroke-width": 3
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_3.setViewBox(-70, 0, width, height, false);
    };
    tween = TweenMax.to(triangle, 2, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this,
        onComplete: function() {
            $.fn.fullpage.moveSectionUp();
        }
    });
};

svg_four = function() {
    var width = 300,
        height = 960,
        scale = 1.00;
    var tnc_line_4 = new Raphael('svg_four', width, height);
    var tnc_line_4_pathString = 'M109.615 99.223c0 3.313 2.684 6 6 6 3.313 0 6-2.687 6-6 0-3.312-2.688-6-6-6-3.317 0-6 2.688-6 6 M188.582 372.097c0 3.313 2.685 6 6 6 3.313 0 6-2.687 6-6 0-3.312-2.688-6-6.002-6-3.313 0-6 2.688-6 6M112.613 99.223c0 1.653 1.346 3 3 3 1.655 0 3-1.347 3-3 0-1.657-1.347-3-3-3s-3 1.343-3 3 M165.326 789.102c0 3.313 2.684 6 6 6 3.313 0 6-2.687 6-6 0-3.312-2.688-6-6-6-3.317 0-6 2.688-6 6m26.254-417.005c0 1.653 1.346 3 3 3 1.655 0 3-1.347 3-3 0-1.657-1.347-3-3-3s-3 1.343-3 3 M168.324 789.102c0 1.653 1.346 3 3 3 1.655 0 3-1.347 3-3 0-1.656-1.347-3-3-3s-3 1.343-3 3 M44.93 960l-23.05-16.205c-19.99-14.047-19.63-43.945.9-57.265l154.867-101.39c23.77-15.666 25.93-49.7 4.32-68.246L168.82 705.73c-13.143-11.348-14.585-31.155-3.24-44.122l33.5-38.537c20.165-23.046 16.02-58.524-9.007-75.994-34.938-24.488-70.95-61.045-45.02-97.24 1.803-2.52 31.872-50.782 55.286-86.256 13.323-19.99 5.056-45.8-16.033-57.446-25.756-14.222-74.48-47.616-100.866-60.634-35.165-17.35-60.955-35.994-53.17-91.354 8.217-58.43 146.36-35.794 109.59-113.904C129.84 18.958 118.457 6.442 118.457 0';

    var triangle = tnc_line_4.path(tnc_line_4_pathString).attr({
        stroke: '#00bfff',
        opacity: 0
    });
    var obj = {
        length: 0,
        pathLength: triangle.getTotalLength()
    };
    var drawLine = function() {
        var offset, subpath;
        offset = obj.pathLength * tween.progress();

        subpath = triangle.getSubpath(0, offset);
        tnc_line_4.clear();
        tnc_line_4.path(subpath).attr({
            stroke: '#00bfff',
            "stroke-width": 3
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_4.setViewBox(0, 0, width, height, false);
    };
    tween = TweenMax.to(triangle, 2, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this,
        onComplete: function() {
            $.fn.fullpage.moveSectionUp();
        }
    });
};