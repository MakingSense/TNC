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
        anchors:['gif', '', 'maps', '', '', '', '', '', ''],
        scrollingSpeed: 800,
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
    closeModal();
    shares();


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
            }
            else {
                changeSection(direction, section_index);
            }
            break;
        case 3:

            break;
        case 4:
            setTimeout(function(){
                changeSection(direction, section_index);
            }, 500)
            break;
        case 5:

            break;
        case 6:
            var svg = $('#svg_third');
            if (!svg.hasClass('animated')) {
                svg_third();
                svg.addClass('animated');
            }
            else {
                changeSection(direction, section_index);
            }
            break;
        case 7:
            var svg = $('#svg_second');
            if (!svg.hasClass('animated')) {
                svg_second();
                svg.addClass('animated');
            }
            break;
        case 8:
            var svg = $('#svg_first');
            if (!svg.hasClass('animated')) {
                svg_first();
                svg.addClass('animated');
            }
            else {
                changeSection(direction, section_index);                
            }
            break;
        case 9:
            var svg = $('#svg_first');
            if(direction == "down" && $('#svg_first').hasClass('animated')){
                $('#player_1').YTPStop();
            }
            break;
        default:
            break;
    }
}

function changeSection(direction, index) {
    if(direction == 'down') {
        setTimeout(function(){
            $.fn.fullpage.moveTo((index + 1), 0);
        }, 1000)
        
    }
    else{
        setTimeout(function(){
            $.fn.fullpage.moveTo((index - 1), 0);
        }, 1000)
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
            $(this).parent().siblings('.people__modal').addClass('anim__people__full');
        });
    });
}

function closeModal() {
    var modalClose = $('.modal__close');
    $.each(modalClose, function(index, val) {
        $(this).on('click', function(event) {
            event.preventDefault();
            $.each($('.people__modal'), function(index, val) {
                if($(this).hasClass('anim__people__full')){
                    $(this).removeClass('anim__people__full');
                }
            });
        });
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
        height = 955,
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
            "stroke-width": 4
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
    var width = 370,
        height = 955,
        scale = 1.25;
    var tnc_line_2 = new Raphael('svg_second', width, height);
    var tnc_line_2_pathString = 'M426.002,77.961a6,6 0 1,0 12,0a6,6 0 1,0 -12,0 M597.032,295.488a6,6 0 1,0 12,0a6,6 0 1,0 -12,0 M523.72,678.308a6,6 0 1,0 12,0a6,6 0 1,0 -12,0 M354 800s-12.746-12.362-6.105-30.583c13.196-36.207 205.31-70.38 205.307-123.018-.002-26.532-27.545-38.363-30.487-59.427-4.556-32.608 64.985-43.4 64.985-87.282 0-38.606-60.363-64.268-60.698-99.69-.45-47.543 91.6-94.882 85.877-132.192-5.997-39.087-143.265-82.215-170.018-135.725-32.853-65.706 7.54-75.165 25.18-98.558C479.576 18.225 481 0 481 0';

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
            "stroke-width": 4
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_2.setViewBox(((width * scale)), 0, width, height, false);
    };
    tween = TweenMax.to(triangle, 2, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
    });
};

svg_third = function() {
    var width = 260,
        height = 955,
        scale = 1.25;
    var tnc_line_3 = new Raphael('svg_third', width, height);
    var tnc_line_3_pathString = 'M376.159,671.922c0-3.313,2.687-6,6-6s6,2.687,6,6s-2.687,6-6,6S376.159,675.235,376.159,671.922 M551.464,496.459 c0-3.313,2.687-6,6-6s6,2.687,6,6s-2.687,6-6,6S551.464,499.772,551.464,496.459 M530.172,147.636c0-3.313,2.687-6,6-6s6,2.687,6,6 c0,3.314-2.687,6-6,6S530.172,150.95,530.172,147.636 M395.668,800c0,0,10.418-13.028,16.946-35.225 c15.938-54.218-44.042-68.08-29.208-115.551c23.425-74.961,153.641-77.382,178.895-120.564c17.647-30.169-58.138-83.259-60-124.867 c-1.871-41.842,69.024-49.872,66.614-96.437c-1.535-29.69-38.464-41.412-47.23-69.79c-7.766-25.144,47.292-35.786,33.982-67.5 C540.923,134.931,429.373,90.114,396.3,58.674C363.783,27.764,426.006,0,426.006,0';

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
            "stroke-width": 4
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_3.setViewBox(((width * scale) + (width / 2)), 0, width, height, false);
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
    var width = 260,
        height = 955,
        scale = 1.25;
    var tnc_line_3 = new Raphael('svg_four', width, height);
    var tnc_line_3_pathString = 'M376.159,671.922c0-3.313,2.687-6,6-6s6,2.687,6,6s-2.687,6-6,6S376.159,675.235,376.159,671.922 M551.464,496.459 c0-3.313,2.687-6,6-6s6,2.687,6,6s-2.687,6-6,6S551.464,499.772,551.464,496.459 M530.172,147.636c0-3.313,2.687-6,6-6s6,2.687,6,6 c0,3.314-2.687,6-6,6S530.172,150.95,530.172,147.636 M395.668,800c0,0,10.418-13.028,16.946-35.225 c15.938-54.218-44.042-68.08-29.208-115.551c23.425-74.961,153.641-77.382,178.895-120.564c17.647-30.169-58.138-83.259-60-124.867 c-1.871-41.842,69.024-49.872,66.614-96.437c-1.535-29.69-38.464-41.412-47.23-69.79c-7.766-25.144,47.292-35.786,33.982-67.5 C540.923,134.931,429.373,90.114,396.3,58.674C363.783,27.764,426.006,0,426.006,0';

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
            "stroke-width": 4
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_3.setViewBox(((width * scale) + (width / 2)), 0, width, height, false);
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