// js
document.documentElement.classList.add( 'js' );

const swiper = new Swiper('.feature__swiper', {
    slidesPerView: "auto",
    spaceBetween: 15,
    breakpoints: {
        768: {
            spaceBetween: 40,
        }
    }
});