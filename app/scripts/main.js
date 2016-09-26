// jshint devel:true
console.log('01100100 01100101 01101101 01100101 01100011 01101011 01101111 00101110 01100011 01101111 01101101');

var WebFontConfig = {
  google: {
    families: ['Ubuntu:400,700,500:latin,latin-ext']
  }
};
(function () {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

// smoothScroll init
smoothScroll.init({
  speed: 1000
});




   $.ajaxSetup({
  cache: true
});

    $.getScript( 'scripts/vendor/responsiveslides.min.js', function( data, textStatus, jqxhr ) {
        $('#slider3').responsiveSlides({
          auto: false,
          pager: false,
          nav: true,
          speed: 3500,
         // maxwidth: 800,
          namespace: 'large-btns'
        });

        var bLazyslid = new Blazy({
            container: '#slider3' // Default is window
        });

    });


    $.getScript( 'scripts/vendor/lightbox.min.js', function( data, textStatus, jqxhr ) {
        lightbox.option({
             //'resizeDuration': 200,
             fadeDuration:200,
             albumLabel:'Obrázok %1 z %2',
             disableScrolling:true
           })

    });

    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });




// blazy async loading
var bLazy = new Blazy({
  breakpoints: [{
    width: 420 // Max-width
      ,
    src: 'data-src-small'
  }],
  success: function (element) {

    setTimeout(function () {
      // We want to remove the loader gif now.
      // First we find the parent container
      // then we remove the 'loading' class which holds the loader image
      var parent = element.parentNode;
      parent.className = parent.className.replace(/\bloading\b/, '');
    }, 200);
  }
});

'use strict';

    // angular.element(document).ready(function() {
    //
    //  angular.bootstrap(document, ['contactApp']);


    var app = angular.module('contactApp', [])
    .directive('contactform', function() {
      return {
        templateUrl: 'contact-form.php'
      };
    })
    .controller('ContactController',['$scope', '$http','$timeout', function ($scope, $http, $timeout) {
        $scope.result = 'hidden'
        $scope.resultMessage;
        $scope.formData; //formData is an object holding the name, email, subject, and message


        //$scope.formData.validate = $('span').text();
        $scope.submitButtonDisabled = false;
        $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
        $scope.submit = function(contactform) {
            $scope.submitted = true;
            $scope.submitButtonDisabled = true;
            if (contactform.$valid) {
                $http({
                    method  : 'POST',
                    url     : 'contact-form.php',
                    data    : $.param($scope.formData),  //param method from jQuery
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
                }).success(function(data){
                    if (data.success) { //success comes from the return json object
                        $scope.submitButtonDisabled = true;
                        $scope.resultMessage = data.message;
                        $scope.result='alert alert-success';
                    } else {
                        $scope.submitButtonDisabled = false;
                        $scope.resultMessage = data.message;
                        $scope.result='alert alert-danger';
                    }
                    $timeout(function() {
                        $scope.result='hidden';
                    }, 5000);



                });
            } else {
                $scope.submitButtonDisabled = false;
                $scope.resultMessage = 'Prosím správne vyplnte všetky polia';
                $scope.result='alert alert-danger';
                $timeout(function() {
                    $scope.result='hidden';
                }, 5000);
            }
        }
    }]);
    //});

// google maps init
var params;


startgmaps();



function startgmaps() {
    var gmapstarted = false;
    var jquerywinobj = $(window);
    var jquerybodyobj = $('body');

    // console.log(jquerybodyobj.scrollTop());
    // console.log(jquerybodyobj.height() / 2);

    if ( (jquerywinobj.scrollTop() > jquerybodyobj.height() / 2) && !gmapstarted) {
      startgooglemaps();
      gmapstarted = true;
    }

   setTimeout( function(){
    jquerywinobj.on( 'scroll',function () {
        if ( (jquerywinobj.scrollTop() > jquerybodyobj.height() / 2) && !gmapstarted) {
          startgooglemaps();
          gmapstarted = true;
        }
    });
    },1000);
}



// dom ready
function startgooglemaps() {
  //if (typeof google !== 'undefined'){
  if (window.google && google.maps) {
    initializeMap();
  } else {
    lazyLoadGoogleMap();
  }
}

function initialize(params) {
  var mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 16,
    scrollwheel: false,
    mapTypeControl: false,
    // The latitude and longitude to center the map (always required)
    ///center: new google.maps.LatLng(48.7443547, 21.2351514), // New York
    center: new google.maps.LatLng(48.74648561810575, 21.245208000000048), // New York

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    //
    styles: [{
        'featureType': 'administrative',
        'elementType': 'labels.text.fill',
        'stylers': [{
          'color': '#444444'
        }]
      }, {
        'featureType': 'administrative.country',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'administrative.country',
        'elementType': 'geometry',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'administrative.country',
        'elementType': 'geometry.fill',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'administrative.province',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'administrative.locality',
        'elementType': 'labels',
        'stylers': [{
          'hue': '#ffe500'
        }]
      }, {
        'featureType': 'landscape',
        'elementType': 'all',
        'stylers': [{
          'color': '#f2f2f2'
        }, {
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.landcover',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'geometry',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'geometry.fill',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'geometry.stroke',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'labels',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'labels.text',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'labels.text.fill',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'labels.text.stroke',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'landscape.natural.terrain',
        'elementType': 'labels.icon',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi.attraction',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi.business',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi.place_of_worship',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'poi.school',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'road',
        'elementType': 'all',
        'stylers': [{
          'saturation': -100
        }, {
          'lightness': 45
        }, {
          'visibility': 'on'
        }]
      }, {
        'featureType': 'road.highway',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'road.arterial',
        'elementType': 'labels.icon',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'transit',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'off'
        }]
      }, {
        'featureType': 'transit.station',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'simplified'
        }]
      }, {
        'featureType': 'transit.station.airport',
        'elementType': 'all',
        'stylers': [{
          'visibility': 'on'
        }]
      }, {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': [{
          'color': '#9bdffb'
        }, {
          'visibility': 'on'
        }]
      }]
      // styles: [{'featureType':'administrative','elementType':'all','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2e5d4'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#c5dac6'}]},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{'featureType':'road','elementType':'all','stylers':[{'lightness':20}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#c5c6c6'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#e4d7c6'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#fbfaf7'}]},{'featureType':'water','elementType':'all','stylers':[{'visibility':'on'},{'color':'#acbcc9'}]}]
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id='map' seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using our element and options defined above
  var map = new google.maps.Map(mapElement, mapOptions);

  // Let's also add a marker while we're at it
  // 48.74648561810575,21.245208000000048
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(48.74648561810575, 21.245208000000048),
    map: map,
    labelContent: '$425K',
    labelAnchor: new google.maps.Point(22, 0),
    labelClass: 'labels', // the CSS class for the label
    labelStyle: {
      opacity: 0.75
    }
  });
  var center = map.getCenter();
  google.maps.event.addDomListener(window, 'resize', function () {
    map.setCenter(center);
  });
}

function lazyLoadGoogleMap() {
  $.getScript('http://maps.google.com/maps/api/js?sensor=true&callback=initializeMap')
    .done(function (script, textStatus) {
      //alert('Google map script loaded successfully');
    })
    .fail(function (jqxhr, settings, ex) {
      //alert('Could not load Google Map script: ' + jqxhr);
    });
}

function initializeMap() {
  initialize(params);
}
