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
        scrollingSpeed: 1200,
        navigation: true,
        navigationPosition: 'left',

        onLeave: function(index, nextIndex, direction) {
            sectionCheck(nextIndex);
        },
        // afterLoad: function(anchorLink, index){
        //     sectionCheck(index);
        // }
    });

    // $(document).mousewheel(function(event) {
    //     $('#scroll').html(event.clientX);
    //     console.log(event.clientX, event.clientY, event.deltaFactor);
    // });


    $.fn.fullpage.silentMoveTo(9);
    $.fn.fullpage.setAllowScrolling(false, 'down');
    $.fn.fullpage.setKeyboardScrolling(false, 'down');
});

/*------------------------------------*\
  #Sections Manipulation
\*------------------------------------*/
function sectionCheck(section_index) {
    switch (section_index) {
        case 1:

            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

            break;
        case 6:
            var svg = $('#svg_third');
            if (!svg.hasClass('animated')) {
                svg_third();
                svg.addClass('animated');
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
            break;
        default:
            break;
    }
}

/*------------------------------------*\
  #SVG Drawing
\*------------------------------------*/
svg_first = function() {
    var width = 260,
        height = 955,
        scale = 1.25;
    var tnc_line_1 = new Raphael('svg_first', width, height);
    var tnc_line_1_pathString = 'M376.159,671.922c0-3.313,2.687-6,6-6s6,2.687,6,6s-2.687,6-6,6S376.159,675.235,376.159,671.922 M551.464,496.459 c0-3.313,2.687-6,6-6s6,2.687,6,6s-2.687,6-6,6S551.464,499.772,551.464,496.459 M530.172,147.636c0-3.313,2.687-6,6-6s6,2.687,6,6 c0,3.314-2.687,6-6,6S530.172,150.95,530.172,147.636 M395.668,800c0,0,10.418-13.028,16.946-35.225 c15.938-54.218-44.042-68.08-29.208-115.551c23.425-74.961,153.641-77.382,178.895-120.564c17.647-30.169-58.138-83.259-60-124.867 c-1.871-41.842,69.024-49.872,66.614-96.437c-1.535-29.69-38.464-41.412-47.23-69.79c-7.766-25.144,47.292-35.786,33.982-67.5 C540.923,134.931,429.373,90.114,396.3,58.674C363.783,27.764,426.006,0,426.006,0';

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
            "stroke-width": 5
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_1.setViewBox(((width * scale) + (width / 2)), 0, width, height, false);
    };
    tween = TweenMax.to(triangle, 5, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
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
            "stroke-width": 5
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_2.setViewBox(((width * scale)), 0, width, height, false);
    };
    tween = TweenMax.to(triangle, 5, {
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
            "stroke-width": 5
        }).transform("s" + scale + "," + scale + ",0,0");

        tnc_line_3.setViewBox(((width * scale) + (width / 2)), 0, width, height, false);
    };
    tween = TweenMax.to(triangle, 5, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
    });
};