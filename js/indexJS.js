$(document).ready(function(){
    $('.header__burger').click(function(event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
});
document.addEventListener('touchstart', function(event) {
    if(event.target.matches('.slick-element')) {
        event.target.classList.add('feeling-touchy');
    }
});
document.addEventListener('touchend', function(event) {
    if(event.target.matches('.slick-element')) {
        event.target.classList.remove('feeling-touchy');
    }
});
// document.addEventListener("scroll", () => {
//     const header = document.querySelector(".header");
//     const scrollPosition = window.scrollY;
//     if (scrollPosition > 100) {
//         header.classList.add("transparent");
//     } else {
//         header.classList.remove("transparent");
//     }
// });

/*Стрелки на слайдере */
document.addEventListener('touchstart', function(event) {
    if(event.target.matches('.control')) {
        event.target.classList.add('feeling-touchy');
    }
});
document.addEventListener('touchend', function(event) {
    if(event.target.matches('.control')) {
        event.target.classList.remove('feeling-touchy');
    }
});