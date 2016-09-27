/* ==================================================================================================================== */
/*    Social Share                                                                                                      */
/* ==================================================================================================================== */
jQuery.fn.socialShare = function(opts) {
    var socialLinks = {
        twitter: {
            "Ahh": "pic.twitter.com/bM8VHW2SW7",
            "Cold": "pic.twitter.com/wmR4ye0jXx",
            "Dog Washing": "pic.twitter.com/utkNGVvAdg",
            "Running": "pic.twitter.com/D8llSnxPVR",
            "Wild": "pic.twitter.com/7Y73t1DPgY"
        },
        facebook: {
            "Ahh": "http://gph.is/2cM7Fx0",
            "Cold": "http://gph.is/2ctjM1g",
            "Dog Washing": "http://gph.is/2dj0mlN",
            "Running": "http://gph.is/2cBVt4i",
            "Wild": "http://gph.is/2dqbE3y" 
        }
    }
    var
        $this = this,
        defaults = {
            network: '',
            jsonURL: '',
            data: '',
            cachecontrol: false,
            typeofcount: ''
        },
        settings = jQuery.extend(defaults, opts);

    return jQuery.ajax({
        cache: settings.cachecontrol,
        url: settings.jsonURL,
        dataType: "jsonp",
        crossDomain: true
    }).done(function(response) {

        jQuery($this).click(function(e) {

            var title = encodeURIComponent(jQuery(this).attr('meta-title'));
            var content = encodeURIComponent(jQuery(this).attr('meta-content'));
            var image = encodeURIComponent((jQuery(this).attr('meta-image')));
            var name = encodeURIComponent((jQuery(this).attr('data-name')));
            var url = encodeURIComponent((jQuery(this).attr('meta-url')));

            switch (settings.network) {
                case 'twitter':
                    var gif;
                    $.each(socialLinks.twitter, function(index, val) {
                        if(name == index){
                            gif = val;
                        }                         
                    });
                    var via = jQuery(this).attr('meta-via');
                    window.open('http://twitter.com/share?text=' + content + ' ' + gif +
                        '&url=' + url,
                        'twitterwindow',
                        'width=800, height=600, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
                    break;

                case 'facebook':
                    var gif;
                    $.each(socialLinks.facebook, function(index, val) {
                        if(name == index){
                            gif = val;
                        }                         
                    });
                    window.open('https://www.facebook.com/dialog/feed?app_id=145634995501895' +
                        // '&name=' + (title.concat(name)).concat(" water!") +
                        '&href=' + url +
                        '&description=' + content +
                        '&picture=' + gif +
                        '&redirect_uri=https://www.facebook.com',
                        'facebook-share-dialog',
                        'width=800, height=600, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
                    break;
            }
            e.preventDefault();
        })
    });
};