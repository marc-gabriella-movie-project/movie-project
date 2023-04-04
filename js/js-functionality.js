    "use strict"

/////////////// START Mobile Menu ///////////////////////
let pageWrapper = document.querySelector('.page-wrapper');
let toggleMenu = document.querySelector('.das-burger-wrapper');
let menuBg = document.querySelector('.mobile-menu-overlay');
toggleMenu.addEventListener('click', function(){
    pageWrapper.classList.toggle('mobile-menu-open');
});
menuBg.addEventListener('click', function(){
    pageWrapper.classList.toggle('mobile-menu-open');
});
/////////////// END Mobile Menu ///////////////////////

/////////////// START Dropdowns ///////////////////////
let dropdowns = document.querySelectorAll('[data-dropdown="parent"]');
dropdowns.forEach(function(dropdown){
    let toggle = dropdown.querySelector('[data-dropdown="toggle"]');
    toggle.addEventListener('click', function(){
        dropdowns.forEach(function(element){
            // if already has class of open and is not this element, remove it
            if (element.classList.contains('open') && element !== dropdown) {
                element.classList.remove('open');
            }
        })
        dropdown.classList.toggle('open');
    });
});
pageWrapper.addEventListener('click', function(event){
    //if the event target is not a dropdown, close all dropdowns
    if (!event.target.closest('[data-dropdown="parent"]')) {
        dropdowns.forEach(function(dropdown){
            dropdown.classList.remove('open');
        });
    }
});
/////////////// END Dropdowns ///////////////////////

/////////////// START Carousel ///////////////////////
let carouselArrows = document.querySelectorAll('.slide-arrow');
let carousel = document.querySelector('.carousel');
let slideMask = document.querySelector('.slide-mask');
carouselArrows.forEach(function(arrow){
    // start a direction variable
    let direction;
    // add event listener to each arrow
    arrow.addEventListener('click', function(event){
        // if the arrow clicked has a class of left, set direction to left, otherwise set to right
        if (event.target.classList.contains('left')) {
            direction = 'left';
        } else {
            direction = 'right';
        }
        // console.log(`Going ${direction}`);
        // get the active slide
        let activeSlide = slideMask.querySelector('.slide.active');
        // remove active class from active slide
        activeSlide.classList.remove('active');
        // if direction is left, get previous sibling, otherwise get next sibling and reassign to activeSlide
        if (direction === 'left') {
            activeSlide = activeSlide.previousElementSibling;
        } else {
            activeSlide = activeSlide.nextElementSibling;
        }
        //if activeSlide is null, we are at the end of the carousel
        if (!activeSlide) {
            //if direction is left, get last slide, otherwise get first slide
            activeSlide = direction === 'left' ? slideMask.lastElementChild : slideMask.firstElementChild;
        }
        //add active to the new active slide
        activeSlide.classList.add('active');
        // remove left and right classes from active slide
        activeSlide.classList.remove('left', 'right');
        // get previous sibling of active slide
        let previousSibling = activeSlide.previousElementSibling;
        //get all previous element siblings
        let previousSlides = [];
        while (previousSibling) {
            previousSlides.unshift(previousSibling);
            previousSibling = previousSibling.previousElementSibling;
        }
        //loop through previous slides and add left class, remove right class
        previousSlides.forEach(function(slide){
            slide.classList.remove('right');
            slide.classList.add('left');
        });
        // get next sibling of active slide
        let nextSibling = activeSlide.nextElementSibling;
        // get all next element siblings
        let nextSlides = [];
        while (nextSibling) {
            nextSlides.push(nextSibling);
            nextSibling = nextSibling.nextElementSibling;
        }
        // loop through next slides and add right class, remove left class
        nextSlides.forEach(function(slide){
            slide.classList.remove('left');
            slide.classList.add('right');
        });
    });
});
/////////////// END Carousel ///////////////////////

// On page load
window.onload = function() {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
    setTimeout(()=>{
            document.querySelector("#loader").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
    }, 1000);
}

