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
    	onLeave: function(anchorLink, index){
          var loadedSection = $(this);

          //using index
          if(index == 1){
              //$.fn.fullpage.setAllowScrolling(false);
              //return false;
          }
      }
    });

    $(document).mousewheel(function(event) {
    		$('#scroll').html(event.clientX);
		    console.log(event.clientX, event.clientY, event.deltaFactor);
		});


    $.fn.fullpage.silentMoveTo(4);
    $.fn.fullpage.setAllowScrolling(false, 'down');
    $.fn.fullpage.setKeyboardScrolling(false, 'down');
});

/*------------------------------------*\
  #Prevent Scroll Down
\*------------------------------------*/
