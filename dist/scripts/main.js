function startgmaps(){var a=!1,b=$(window),c=$("body");b.scrollTop()>c.height()/2&&!a&&(startgooglemaps(),a=!0),setTimeout(function(){b.on("scroll",function(){b.scrollTop()>c.height()/2&&!a&&(startgooglemaps(),a=!0)})},1e3)}function startgooglemaps(){window.google&&google.maps?initializeMap():lazyLoadGoogleMap()}function initialize(){var a={zoom:16,scrollwheel:!1,center:new google.maps.LatLng(48.74648561810575,21.245208000000048),styles:[{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"administrative.country",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"geometry.fill",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels",stylers:[{hue:"#ffe500"}]},{featureType:"landscape",elementType:"all",stylers:[{color:"#f2f2f2"},{visibility:"on"}]},{featureType:"landscape.natural",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.landcover",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.fill",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"geometry.stroke",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"labels.text",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"labels.text.fill",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"labels.text.stroke",stylers:[{visibility:"on"}]},{featureType:"landscape.natural.terrain",elementType:"labels.icon",stylers:[{visibility:"on"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"poi.attraction",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"poi.business",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"poi.place_of_worship",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"poi.school",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45},{visibility:"on"}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.station",elementType:"all",stylers:[{visibility:"simplified"}]},{featureType:"transit.station.airport",elementType:"all",stylers:[{visibility:"on"}]},{featureType:"water",elementType:"all",stylers:[{color:"#9bdffb"},{visibility:"on"}]}]},b=document.getElementById("map"),c=new google.maps.Map(b,a),d=(new google.maps.Marker({position:new google.maps.LatLng(48.74648561810575,21.245208000000048),map:c,labelContent:"$425K",labelAnchor:new google.maps.Point(22,0),labelClass:"labels",labelStyle:{opacity:.75}}),c.getCenter());google.maps.event.addDomListener(window,"resize",function(){c.setCenter(d)})}function lazyLoadGoogleMap(){$.getScript("http://maps.google.com/maps/api/js?sensor=true&callback=initializeMap").done(function(){}).fail(function(){})}function initializeMap(){initialize(params)}console.log("01100100 01100101 01101101 01100101 01100011 01101011 01101111 00101110 01100011 01101111 01101101");var WebFontConfig={google:{families:["Ubuntu:400,700,500:latin,latin-ext"]}};!function(){var a=document.createElement("script");a.src=("https:"==document.location.protocol?"https":"http")+"://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js",a.type="text/javascript",a.async="true";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)}(),smoothScroll.init({speed:1e3}),$.ajaxSetup({cache:!0}),$.getScript("scripts/vendor/responsiveslides.min.js",function(){$("#slider3").responsiveSlides({auto:!1,pager:!1,nav:!0,speed:500,namespace:"large-btns"});new Blazy({container:"#slider3"})}),$.getScript("scripts/vendor/lightbox.min.js",function(){lightbox.option({fadeDuration:200,albumLabel:"Obrázok %1 z %2",disableScrolling:!0})});var bLazy=new Blazy({breakpoints:[{width:420,src:"data-src-small"}],success:function(a){setTimeout(function(){var b=a.parentNode;b.className=b.className.replace(/\bloading\b/,"")},200)}}),app=angular.module("contactApp",[]).directive("contactform",function(){return{templateUrl:"contact-form.php"}}).controller("ContactController",["$scope","$http","$timeout",function(a,b,c){a.result="hidden",a.resultMessage,a.formData,a.submitButtonDisabled=!1,a.submitted=!1,a.submit=function(d){a.submitted=!0,a.submitButtonDisabled=!0,d.$valid?b({method:"POST",url:"contact-form.php",data:$.param(a.formData),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(b){b.success?(a.submitButtonDisabled=!0,a.resultMessage=b.message,a.result="alert alert-success"):(a.submitButtonDisabled=!1,a.resultMessage=b.message,a.result="alert alert-danger"),c(function(){a.result="hidden"},5e3)}):(a.submitButtonDisabled=!1,a.resultMessage="Prosím správne vyplnte všetky polia",a.result="alert alert-danger",c(function(){a.result="hidden"},5e3))}}]),params;startgmaps();