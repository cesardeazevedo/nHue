(function($) {

/*
 * Replace all images  on pages to images which you choose
 *
 */
var Hue = {
    DefaultImages : [
            "http://oquemevem.files.wordpress.com/2014/07/6096234_700b.jpg",
            "http://img.ibxk.com.br/2013/8/materias/1649968641515049.jpg",
            "http://fc02.deviantart.net/fs70/f/2013/217/1/6/street_figher_blanka_huehuehue_br_br__normal_by_matbox99-d6gr48j.gif",
            "https://lh4.googleusercontent.com/-5P5N2lEKtQ4/AAAAAAAAAAI/AAAAAAAAABU/uyfFISfeEQc/photo.jpg",
            "https://gardenalbr.files.wordpress.com/2013/06/huehue.jpg"
    ],
    Init: function(){
            Hue.ReplaceImages();
    },
    ReplaceImages: function(){
        var urls = [];
        chrome.storage.sync.get('DataUrls', function(result){
            urls = result.DataUrls.Urls || Hue.DefaultImages;
        });
        setInterval(function(){
            [].forEach.call(document.querySelectorAll('img'), function(e){
                if(urls.indexOf(e.src) == -1) {
                    var RandomValue = Math.floor(Math.random() * urls.length);
                    e.src = urls[RandomValue];
                }
            });
        }, 1500);
    }
};

Hue.Init();
})();
