
// Mobile Menu/Sidebar js
let pageWrapper = document.querySelector('.page-wrapper');
let toggleMenu = document.querySelector('.burger-wrapper');
let menuBg = document.querySelector('.mobile-menu-overlay');
toggleMenu.addEventListener('click', function(){
    pageWrapper.classList.toggle('mobile-menu-open');
});
menuBg.addEventListener('click', function(){
    pageWrapper.classList.toggle('mobile-menu-open');
});

// Header dropdowns js
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

// Carousel js
let carouselArrows = document.querySelectorAll('.slide-arrow');
let slideMask = document.querySelector('.slide-mask');
carouselArrows.forEach(function(arrow){
    let direction;
    arrow.addEventListener('click', function(event){
        if (event.target.classList.contains('left')) {
            direction = 'left';
        } else {
            direction = 'right';
        }
        let activeSlide = slideMask.querySelector('.slide.active');
        activeSlide.classList.remove('active');
        if (direction === 'left') {
            activeSlide = activeSlide.previousElementSibling;
        } else {
            activeSlide = activeSlide.nextElementSibling;
        }
        //if activeSlide is null, we are at the end of the carousel
        if (!activeSlide) {
            activeSlide = direction === 'left' ? slideMask.lastElementChild : slideMask.firstElementChild;
        }
        //add active to the new active slide
        activeSlide.classList.add('active');
        // remove left and right classes from active slide
        activeSlide.classList.remove('left', 'right');
        let previousSibling = activeSlide.previousElementSibling;
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
        let nextSibling = activeSlide.nextElementSibling;
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

// 3 second loading screen on page startup/refresh
document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        // Add a delay of 3 seconds before hiding the loader and displaying the page content
        setTimeout(function() {
            document.querySelector("#loader").style.display = "none";
            document.querySelector("body").style.visibility = "visible";
        }, 3000);
    }
};


