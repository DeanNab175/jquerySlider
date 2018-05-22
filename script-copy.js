'use strict';

$(function() {

    // cache DOM
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');
    var $image = $slides.find('img');
    var $bulletContainer;
    var $bullet;
    var $sliderNav = $('.sliderNav');
    var $prevBtn = $sliderNav.find('.prev');
    var $nextBtn = $sliderNav.find('.next');

    // configuration
    var width = ( cal_SliderCnt_Width($slides) / $slides.length );
    var height = 500;
    var animationSpeed = 1000;
    var easing = "easeInSine";
    var pause = 3000;
    var currentSlide = 1;
    var interval;

    // set width dynamically
    // for the slides and slide container
    $slideContainer.width(cal_SliderCnt_Width($slides));
    $slides.width( width );

    // set the slider wrapper height
    $slider.height(height);
    $slides.height(height);

    // Initialize the first slide with an active class
    add_active_class($slides[0]);

    // Initialize the slider bullets
    append_slider_bullets($slides, $slider);

    // cache DOM after appending bullets
    $bulletContainer = $('#bullets');
    $bullet = $bulletContainer.find('.bullet');
    add_active_class($bullet[0]);

    // Start animating the slider
    startSlider();

    // listen for mouseenter and pause
    // resume on mouseleave
    $slider.on('mouseenter', stopSlider).on('mouseleave', startSlider);

    
    // add click event to the bullets
    $bullet.click(function(e) {
        //stopSlider();

        var slideNumber = $(this).data('slide');

        // animate margin-left
        $slideContainer.animate({'margin-left': '-' + ( width * ( slideNumber - 1 ) )}, animationSpeed);

        // add the active class to the current slide
        add_active_class($slides[slideNumber - 1]);
        add_active_class($bullet[slideNumber - 1]);

        currentSlide = slideNumber;

        // if it's last slide, go to position 1 (0px)
        if_last_slide();

        //startSlider();

        //console.log( width * ( slideNumber - 1 ) );
        console.log( slideNumber, currentSlide, $slides.length );
    });


    // add click event to the previous btn
    $prevBtn.click(function(e) {
        // animate margin-left
        $slideContainer.animate({'margin-left': '+=' + width}, animationSpeed);

        // add the active class to the current slide
        add_active_class($slides[currentSlide - 1]);
        add_active_class($bullet[currentSlide - 1]);

        console.log(currentSlide - 1);

    });


    // start the slider
    function startSlider() {
        if (!interval) {
            console.log(currentSlide);
        }
        // setInterval
        interval = setInterval(function() {
            currentSlide++;
            if ($slides.length > 1) {
                // animate margin-left
                $slideContainer.animate({'margin-left': '-=' + width}, animationSpeed, easing, function() {
                    // add the active class to the current slide
                    add_active_class($slides[currentSlide - 1]);
                    add_active_class($bullet[currentSlide - 1]);

                    // if it's last slide, go to position 1 (0px)
                    if_last_slide();
                    
                });
            }
            
            console.log(currentSlide);
            //currentSlide++;
        }, pause);
        
    }


    // stop or pause the slider
    function stopSlider() {
        clearInterval(interval);
    }

    // function to act when its 
    function if_last_slide() {
        // if it's last slide, go to position 1 (0px)
        if (currentSlide === $slides.length) {
            stopSlider();

            setTimeout(function(){

                $slideContainer.animate({'margin-left': 0}, animationSpeed);

                // add the active class to the first slide
                add_active_class($slides[0]);
                add_active_class($bullet[0]);
                stopSlider();
                startSlider();
            }, pause);

            currentSlide = 1;

        }
    }


}); // document ready function End

// calculate slider container width
function cal_SliderCnt_Width(arr) {
    var totalWidth = 0;
    $.each(arr, function( i, val ) {
        totalWidth += $(arr[i]).width();
    });

    return totalWidth;
}

// add active class to current slide
function add_active_class(elem) {
    $(elem).addClass('active').siblings().removeClass('active');
}

// append the sliders bullets
function append_slider_bullets(slides, slider) {
    var output = '<ol class="bullets" id="bullets">';
    $.each(slides, function( i, val ) {
        output += '<li class="bullet" data-slide="'+ (i + 1) +'"></li>';
    });
    output += '</ol>';
    
    slider.append(output);
}
