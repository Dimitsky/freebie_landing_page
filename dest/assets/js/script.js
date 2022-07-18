// js
document.documentElement.classList.add( 'js' );

const swiperFeature = new Swiper('.feature__swiper', {
    slidesPerView: "auto",
    spaceBetween: 15,
    breakpoints: {
        768: {
            spaceBetween: 40,
        }
    }
});

const swiperTestimonial = new Swiper('.testimonial__swiper', {
    slidesPerView: 1,
    spaceBetween: 15,

    navigation: {
        nextEl: '.nav-swiper-testimonial__btn--next',
        prevEl: '.nav-swiper-testimonial__btn--prev',
        disabledClass: 'nav-swiper-testimonial__btn--disabled', 
      },
});