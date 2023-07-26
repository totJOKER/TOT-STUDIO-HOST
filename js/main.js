import { Gradient } from './Gradient.js'

// Create your instance
const gradient = new Gradient()

// Call `initGradient` with the selector to your canvas
gradient.initGradient('#gradient-canvas')

new Swiper('.sw-sw', {
    pagination: {
        el: '.swiper-pagination',
        type: 'progressbar',
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
        pageUpDown: true,
    },
    mousewheel: {
        sensitivity: 1,
    },
    speed: 2000,
    hashNavigation: {
        watchState: true,
    },
});

$('#menuToggle').click (function(){
    $('.menu').toggleClass('menu-close');
    $(this).toggleClass('span-active');
    $('.menu').toggleClass('menu-open');
});
$('.a-header-nav-fix').click (function(){
    $('.mobile-nav-menu').toggleClass('menu-open');
    $('.menu').toggleClass('open');
})