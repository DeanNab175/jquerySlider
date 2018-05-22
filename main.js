'use strict';

(function( $ ) {

    /*----------------------------*/
    /*  Caching the DOM           */
    /*----------------------------*/
    var $sliderWrapper = $( '#slider' );
    var $sliderCnt = $sliderWrapper.find( 'ul.slides' );
    var $slides = $sliderCnt.find( 'li.slide' );

    console.log( $slides );
    

}( jQuery ));