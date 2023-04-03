let arrows = document.querySelectorAll('.arrow');
let slideMask = document.querySelector('.slider-mask');
let slidesContainer = document.querySelector('.slides'); // may need to re

arrows.forEach(function (arrow){
    let direction;

    arrow.addEventListener('click', function (event){
       if (event.target.classList.contains('arrow-left')) {
           direction = 'left';
       } else {
           direction = 'right';
       }
        // console.log(`going ${direction}`);
       // get the active slide
        let activeSlide = slidesContainer.querySelector('.slide.active');
        activeSlide.classList.remove('active');
       // redefining what the active slide is
        if (direction === 'left') {
            activeSlide = activeSlide.previousElementSibling;
        } else {
            activeSlide = activeSlide.nextElementSibling;
        }
        // if end of the carousel/ active slide is undefined
        if (!activeSlide) {
            activeSlide = direction === 'left' ? slidesContainer.lastElementChild : slidesContainer.firstElementChild;
        }
        // add active to new slide
        activeSlide.classList.add('active');
        // remove left/right classes from active
        activeSlide.classList.remove('left', 'right');
        // looping thru each sibling and assigning array
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