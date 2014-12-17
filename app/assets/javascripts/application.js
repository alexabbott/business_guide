// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

/*Add event listenter to the rating button*/
if(document.getElementsByClassName('get-rating')[0]){
	document.getElementsByClassName('get-rating')[0].addEventListener('click', getRating, false);
}
/*Add factual component of prediction equation after the data has been updated */
var factualData = document.getElementById('factual-data').innerHTML;
document.getElementById('factual-data').onLoad(displayRating());
/*Store the rating in the browser to it is available after page changes*/
if (typeof window.localStorage != "undefined") {
    document.getElementsByClassName('rating')[0].innerHTML = localStorage.getItem('rating');
}