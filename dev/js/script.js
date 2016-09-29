/*----------------------------------*\
/*----------------------------------*\
         TNC MAIN UI SCRIPT
/*----------------------------------*\
\*----------------------------------*/

var __device = Detectizr.device.model;
/*------------------------------------*\
  #Ready
\*------------------------------------*/
$(document).ready(function() {
    $('#section__container').fullpage({
        anchors: ['gif', '', 'map', '', '', '', '', '', ''],
        navigation: true,
        navigationPosition: 'left',
        easingcss3: 'ease-in-out',
        scrollingSpeed: 2300,
        fitToSectionDelay: 1000,
        touchSensitivity: 25,

        afterLoad: function(anchorLink, index) {
            sectionAction(index);
        },
        onLeave: function(index, nextIndex, direction) {
            sectionSVG(index);
        }
    });
    initPlayer(); //Init main video player
    hideSlidesDots();
    bingindGIF();
    peopleBinding();
    peopleModalBinding();
    closeModal();
    shares();
    scrollLocation();
    scrollBinding();
    checkHash();

    var scrolled=0;



    $("#downClick").on("click" ,function(){
        scrolled=scrolled+20;

        $("#reservoirs").animate({
                scrollTop:  scrolled
           });

    });

    $("#upClick").on("click" ,function(){
        scrolled=scrolled-20;

        $("#reservoirs").animate({
                scrollTop:  scrolled
           });

    });

});

/*------------------------------------*\
  #Hash manipulation
\*------------------------------------*/
function checkHash() {
    var hash = parent.location.hash;
    switch (hash) {
        case '#map':
            $.fn.fullpage.moveTo(3, 0);
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
            removePreloader();
            break;
        case '#gif':
            $.fn.fullpage.moveTo(1, 0);
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
            removePreloader();
            break;
        default:
            $.fn.fullpage.moveTo(9, 0);
            $.fn.fullpage.setAllowScrolling(false);
            $.fn.fullpage.setKeyboardScrolling(false);
            removePreloader();
            break;
    }
}

function removePreloader() {
    setTimeout(function() {
        preloader();
    }, 4000);
}

/*------------------------------------*\
  #Control Slides Functionalities
\*------------------------------------*/
function hideSlidesDots() {
    $('#fp-nav ul li:nth-child(2), #fp-nav ul li:nth-child(4), #fp-nav ul li:nth-child(6), #fp-nav ul li:nth-child(8)').css('display', 'none');
}

function preloader() {
    var preloader = $('.preloader__container');
        preloader.fadeOut('400', function() {
    });
}

/*------------------------------------*\
  #Video Functionalities
\*------------------------------------*/


function initPlayer() {
    var player = $("#video5");

    player.mediaelementplayer({
        success: function(media, domNode) {

            // add HTML5 events to the YouTube API media object
            media.addEventListener('play', function() {
            }, false);

            media.addEventListener('ended', function() {
                media.stop();
                parent.location.hash = '#!';
            }, false);

            $('#player_1_close').on('click touchstart', function() {
                media.stop();
                parent.location.hash = '#!';
            });

            $('#player_1_open').on('click touchstart', function() {
                if(!(Detectizr.device.type == 'tablet' || Detectizr.device.type == 'mobile') && (Detectizr.os.name != 'ios')){
                    setTimeout(function(){
                        $('#c-video .mejs-overlay-button').trigger('click');
                    }, 1000);
                }

            });
        },
        features: ['playpause','progress','current','duration','tracks']
    });
}

function closeMap() {
    $('.map__container').removeClass('anim__fade-in');
    $('.text__container').removeClass('text__container--out');
    $(this).removeAttr('href');
};

/*------------------------------------*\
  #Sections Manipulation
\*------------------------------------*/
function sectionSVG(section_index) {
    switch (section_index) {
        case 3:
            var svg = $('#svg_four');
            setTimeout(closeMap(), 1000);
            if (!svg.hasClass('animated')) {
                svg_four();
                svg.addClass('animated');
            }
            break;
        case 7:
            var svg = $('#svg_third');
            if (!svg.hasClass('animated')) {
                svg_third();
                svg.addClass('animated');
            }
            break;
        case 9:
            var svg = $('#svg_first');
            if (!svg.hasClass('animated')) {
                svg_first();
                svg.addClass('animated');
            }
            break;
        default:
            break;
    }
}

/*------------------------------------*\
  #Sections Manipulation
\*------------------------------------*/
function sectionAction(section_index) {
    switch (section_index) {
        case 7:
            var svg = $('#svg_second');
            if (!svg.hasClass('animated')) {
                svg_second();
                bulletInformation();
                svg.addClass('animated');
            }
            break;
        case 9:

            break;
        default:
            break;
    }
}

function bulletInformation() {
    var bullets = $('.bullet__information');

    $.each(bullets, function(index, val) {
        var auxClass = 'anim__info-' + (index + 1);

        $(this).addClass(auxClass);
    });
}

/*------------------------------------*\
  #Scroll Manipulation
\*------------------------------------*/
var ts;

function scrollBinding(){
    var sections = $('.main__section, .section-7, .section-5, .section-3, .share__section');

    $.each(sections, function(index, val) {
        $(this).on('touchstart', function(event) {
            ts = event.originalEvent.touches[0].clientY;
        });
        $(this).on('touchmove', function(event) {
            event.preventDefault();
            var active = parseInt($(this).attr('data-index'));
            var amount = 0;
            var te = event.originalEvent.changedTouches[0].clientY;
            if (ts < te && amount < 1 && active != 1 && $(this).hasClass('active')) {
                $.fn.fullpage.moveTo(active - 2, 0);
                amount++;
            }
            if(ts > te && amount < 1 && active != 9 && $(this).hasClass('active')) {
                $.fn.fullpage.moveTo(active + 2, 0);
                amount++;
            }
        });
        $(this).on('mousewheel DOMMouseScroll', function(event) {
            event.preventDefault();
            var active = parseInt($(this).attr('data-index'));
            var amount = 0;
            if(event.deltaY == 1 && amount < 1 && active != 1 && $(this).hasClass('active')){
                $.fn.fullpage.moveTo(active - 2, 0);
                amount++;
            }
            if(event.deltaY == -1 && amount < 1 && active != 9 && $(this).hasClass('active')){
                $.fn.fullpage.moveTo(active + 2, 0);
                amount++;
            }
        })
    });
};

/*------------------------------------*\
  #GIF Section Binding
\*------------------------------------*/
function bingindGIF() {
    var itemList = $('.gif__list li a img');
    var gifMain = $('.gif__main img');
    var twitter = $('#twitter');
    var facebook = $('#facebook');
    $.each(itemList, function(index, val) {
        $(this).on('click touchstart', function(event) {
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
        $(this).on('click touchstart', function(event) {
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
        var container = $(this).parent();
        var player = $(this).siblings('.player');
        if(container.hasClass('video__item')){
            player.mediaelementplayer({
                success: function(media, domNode) {
                    var modalClose = $('.modal__close');

                    // add HTML5 events to the YouTube API media object
                    media.addEventListener('play', function() {
                    }, false);

                    media.addEventListener('ended', function() {
                        media.stop();
                        var id = $('#' + media.attributes.id);
                        id.closest('.video__item').toggleClass('active');
                    }, false);

                    $.each(modalClose, function(index, val) {
                        $(this).on('click touchstart', function(event) {
                            media.stop();
                        });
                    });
                },
                features: ['playpause','progress','current','duration','tracks']
            });
        }
        $(this).on('click touchstart', function(event) {
            event.preventDefault();
            container.toggleClass('active');

            var aux = container.siblings();

            $.each(aux, function(index, val) {
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    if($(this).hasClass('video__item')){
                        var player = $(this).children('.player').find('.player');
                        var l_player = player[0].player;
                        l_player.pause();
                    }
                }
            });

            if(container.hasClass('active') && container.hasClass('video__item')){
                var l_player = player[0].player;
                var aux = player.parent().siblings('.mejs-layers').find('.mejs-overlay-button');
                if(!(Detectizr.device.type == 'tablet' || Detectizr.device.type == 'mobile') && (Detectizr.os.name != 'ios')){
                    setTimeout(aux.trigger('click'), 1000);
                }
            }
            else if(container.hasClass('video__item')) {
                var l_player = player[0].player;
                l_player.pause();
            }
        });
    });
}

function closeModal() {
    var modalClose = $('.modal__close');

    $.each(modalClose, function(index, val) {
        $(this).on('click touchstart', function(event) {
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
        var active = parseInt($(this).parent().parent().parent().attr('data-index'));
        $(this).on('click touchstart', function(event) {
            event.preventDefault();
            $.fn.fullpage.moveTo(active - 2);
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
        height = window.innerHeight,
        scale = 1.0;
    var tnc_line_1 = new Raphael('svg_first', width, height);
    var tnc_line_1_pathString = 'M201.608-136.906c0-1.657,1.344-3,3-3s3,1.343,3,3s-1.344,3-3,3 S201.608-135.249,201.608-136.906 M41.5,59.4c0-1.657,1.344-3,3-3s3,1.343,3,3s-1.344,3-3,3S41.5,61.057,41.5,59.4 M187.867,395.908 c0-1.657,1.344-3,3-3s3,1.343,3,3s-1.344,3-3,3S187.867,397.565,187.867,395.908 M184.867,395.908c0-3.313,2.687-6,6-6s6,2.687,6,6 s-2.687,6-6,6S184.867,399.221,184.867,395.908 M38.467,59.008c0-3.312,2.687-6,6-6s6,2.688,6,6s-2.687,6-6,6 S38.467,62.322,38.467,59.008 M198.175-136.814c0-3.313,2.687-6,6-6s6,2.687,6,6c0,3.314-2.687,6-6,6S198.175-133.5,198.175-136.814 M562.695,542.401c0-13.428,2.104-32.441,24.387-47.856c33.333-23.058,158.278-11.313,163.98-31.977 c17.188-62.281-606.597-23.756-605.867-94.238c-1.097-22.275,25.562-38.708,18.989-56.603 c-15.792-42.987-85.089-27.754-73.402-89.471c4.748-26.658,38.733-40.842,36.884-82.167c-1.857-41.558-99.78-69.514-102.174-115.764 c-0.007-41.251,176.135-80.72,180.252-144.548c3.973-61.581-70.724-58.164-96.944-83.511 c-73.893-71.434,337.307-89.312,432.888-127.273c41.414-16.445,40.989-76.592,40.989-76.592';

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

        tnc_line_1.setViewBox(-220, -409.45, width, 950, false);
    };
    tween = TweenMax.to(triangle, 1.8, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
    });
};

svg_second = function() {
    var width = 1600,
        height = window.innerHeight,
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

        tnc_line_2.setViewBox(-170, 0, width, 950, false);
    };
    tween = TweenMax.to(triangle, 4, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
    });
};

svg_third = function() {
    var width = 300,
        height = window.innerHeight,
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

        tnc_line_3.setViewBox(-70, 0, width, 950, false);
    };
    tween = TweenMax.to(triangle, 1.6, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
    });
};

svg_four = function() {
    var width = 300,
        height = window.innerHeight,
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

        tnc_line_4.setViewBox(0, 0, width, 950, false);
    };
    tween = TweenMax.to(triangle, 1.6, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
    });
};