/* ==================================================================================================================== */
/*    Social Share                                                                                                      */
/* ==================================================================================================================== */
jQuery.fn.socialShare = function(opts) {
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
                    var via = jQuery(this).attr('meta-via');
                    window.open('http://twitter.com/share?text=' + (content.concat(name)).concat(" water!") +
                        '&url=' + url +
                        (via == undefined ? '' : ('&via=' + via)),
                        'twitterwindow',
                        'width=800, height=600, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
                    break;

                case 'facebook':
                    window.open('https://www.facebook.com/dialog/feed?app_id=575605059229712&link=' + url +
                        '&name=' + (title.concat(name)).concat(" water!") +
                        '&caption=' + url +
                        '&href=' + url +
                        '&description=' + content +
                        '&picture=' + ("http://tnc.com/images/gif_" + name + ".jpg") +
                        '&redirect_uri=https://www.facebook.com',
                        'facebook-share-dialog',
                        'width=800, height=600, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
                    break;
            }
            e.preventDefault();
        })
    });
};