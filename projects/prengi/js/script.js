$(document).ready(function(){
    $('.carusel').slick({
        dots: true,
        speed: 1100,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/bg_slaider/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/bg_slaider/right.png"></button>'
    });

    $('.slaider').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/slaider/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/slaider/right.svg"></button>'
    });
  });


