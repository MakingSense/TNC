/*----------------------------------*\
/*----------------------------------*\
         TNC MAIN UI SCRIPT
/*----------------------------------*\
\*----------------------------------*/


/*------------------------------------*\
  #Ready
\*------------------------------------*/

$(document).ready(function() {
    $('#fullpage').fullpage({
        scrollingSpeed: 1200,
        navigation: true,
        navigationPosition: 'left',

        onLeave: function(anchorLink, index) {
            var loadedSection = $(this);
            console.log("test");

            //using index
            if (index == 8) {
                svgLine();
                //$.fn.fullpage.setAllowScrolling(false);
                //return false;
            }
        }
    });

    $(document).mousewheel(function(event) {
        $('#scroll').html(event.clientX);
        console.log(event.clientX, event.clientY, event.deltaFactor);
    });


    $.fn.fullpage.silentMoveTo(9);
    $.fn.fullpage.setAllowScrolling(false, 'down');
    $.fn.fullpage.setKeyboardScrolling(false, 'down');
});

/*------------------------------------*\
  #SVG Drawing
\*------------------------------------*/
svgLine = function() {
    var width = 260,
        height = 955,
        scale = 1.25;
    var tnc_line_1 = new Raphael('svg__line', width, height),
        tnc_line_1_pathString = 'M376.159,671.922c0-3.313,2.687-6,6-6s6,2.687,6,6s-2.687,6-6,6S376.159,675.235,376.159,671.922 M551.464,496.459 c0-3.313,2.687-6,6-6s6,2.687,6,6s-2.687,6-6,6S551.464,499.772,551.464,496.459 M530.172,147.636c0-3.313,2.687-6,6-6s6,2.687,6,6 c0,3.314-2.687,6-6,6S530.172,150.95,530.172,147.636 M395.668,800c0,0,10.418-13.028,16.946-35.225 c15.938-54.218-44.042-68.08-29.208-115.551c23.425-74.961,153.641-77.382,178.895-120.564c17.647-30.169-58.138-83.259-60-124.867 c-1.871-41.842,69.024-49.872,66.614-96.437c-1.535-29.69-38.464-41.412-47.23-69.79c-7.766-25.144,47.292-35.786,33.982-67.5 C540.923,134.931,429.373,90.114,396.3,58.674C363.783,27.764,426.006,0,426.006,0';

    var triangle = tnc_line_1.path(tnc_line_1_pathString).attr({
            stroke: '#00bfff',
            opacity: 0
        }),
        obj = {
            length: 0,
            pathLength: triangle.getTotalLength()
        },

        drawLine = function() {
            var offset, subpath;
            offset = obj.pathLength * tween.progress();

            subpath = triangle.getSubpath(0, offset);
            tnc_line_1.clear();
            var auto = tnc_line_1.path(subpath).attr({
                stroke: '#00bfff',
                "stroke-width": 5
            }).transform( "s" + scale + "," + scale + ",0,0" );

            tnc_line_1.setViewBox(((width*scale)+(width/2)), 0, width, height, false);
        };

    tween = TweenMax.to(triangle, 3, {
        length: obj.pathLength,
        onUpdate: drawLine,
        ease: Circ.easeIn,
        onUpdateScope: this
    });
};

