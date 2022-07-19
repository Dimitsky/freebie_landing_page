// js
document.documentElement.classList.add( 'js' );

// SHOW ALL SERVICES

let exploreAllBtnEl = document.querySelector( '#explore-all' );

exploreAllBtnEl.addEventListener( 'click', exploreAllHandle );
exploreAllBtnEl.addEventListener( 'touchstart', exploreAllHandle );

function exploreAllHandle( event ) {
    let serviceArr = Array.from( document.querySelectorAll( '.list-service__item' ) );
    serviceArr.forEach( serviceEl => {
        if ( serviceEl.style.display === 'none' ) {
            serviceEl.style.display = 'flex';
        }
    } );

    exploreAllBtnEl.removeEventListener( 'click', exploreAllHandle );
    exploreAllBtnEl.style.display = 'none';

    if ( event.type === 'touchstart' ) {
        event.preventDefault();
    }
}

// SWIPER 
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

// ACC
let accEl = document.querySelector( '.acc' );
let options = {
    showMultiple: false, 
    openIndex: 0, 
};

function init( accEl ) {
    let itemEls = accEl.querySelectorAll( '.acc__item' );
    let itemArr = Array.from( itemEls );

    itemArr.forEach( (itemEl, index) => {
        let contentEl = itemEl.querySelector( '.acc__content' );

        contentEl.classList.add( 'acc__content--js' );

        if( index === options.openIndex ) {
            openAcc( itemEl );
        }
    } );

    let controlEls = accEl.querySelectorAll( '.acc__control' );
    let controlArr = Array.from( controlEls );

    controlArr.forEach( controlEl => {
        controlEl.addEventListener( 'click', handleControl );
        controlEl.addEventListener( 'touchstart', handleControl );
    } );
}

function handleControl( event ) {
    let isExpanded = this.getAttribute( 'aria-expanded' ) === 'true' ? true : false;
    let itemEl = this.closest( '.acc__item' );

    if ( isExpanded ) {
        closeAcc( itemEl );
    } else {
        openAcc( itemEl );
    }

    if ( event.type === 'touchstart' ) {
        event.preventDefault();
    }
}

function openAcc( itemEl ) {
    let contentEl = itemEl.querySelector( '.acc__content' );
    let controlEl = itemEl.querySelector( '.acc__control' );
    let iconEl = itemEl.querySelector( '.acc__icon' );

    if ( options.showMultiple === false ) {
        closeAllAcc( accEl );
    }

    contentEl.classList.add( 'acc__content--open' );
    contentEl.style.maxHeight = contentEl.scrollHeight + 'px';
    controlEl.setAttribute( 'aria-expanded', 'true');
    iconEl.classList.add( 'acc__icon--open' );
}

function closeAcc( itemEl ) {
    let contentEl = itemEl.querySelector( '.acc__content' );
    let controlEl = itemEl.querySelector( '.acc__control' );
    let iconEl = itemEl.querySelector( '.acc__icon' );

    contentEl.classList.remove( 'acc__content--open' );
    contentEl.style.maxHeight = null;
    controlEl.setAttribute( 'aria-expanded', 'false');
    iconEl.classList.remove( 'acc__icon--open' );
}

function closeAllAcc( accEl ) {
    let itemEls = accEl.querySelectorAll( '.acc__item' );
    let itemArr = Array.from( itemEls );

    itemArr.forEach( itemEl => {
        closeAcc( itemEl );
    } );
}

init( accEl );