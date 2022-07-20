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


// MOBILE MENU

const nav = document.querySelector( '#main-nav' );
const trigger = document.querySelector( '#trigger-menu');
const menu = document.querySelector( '#main-menu' );
const mediaQuery = window.matchMedia( '(min-width: 1024px)' );
let menuFocusTrapFlag = null;


// включает ловушку фокуса
function enableFocusTrap( el ) {
    let focusableEls = el.querySelectorAll( 'a[href]:not([disabled]), button:not([disabled])' );
    let firstFocusableEl = focusableEls[0];
    let lastFocusableEl = focusableEls[focusableEls.length - 1];
  
    function handler( e ) {
      let isTabPressed = ( e.key === 'Tab' );
  
      if ( !isTabPressed ) return;
  
      if ( e.shiftKey ) {
        if ( document.activeElement === firstFocusableEl ) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if ( document.activeElement === lastFocusableEl ) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }
  
    el.addEventListener( 'keydown', handler );
  
    return handler;
}

// отключает ловушку фокуса
function disableFocusTrap( el, handler ) {
    el.removeEventListener( 'keydown', handler )
}

// отключает обработчик триггера для настольной версии
function handleChange( event ) {
    if ( event.matches ) {
      trigger.removeEventListener( 'click', handleTrigger );
      trigger.removeEventListener( 'touchstart', handleTrigger );
      disableFocusTrap( nav, menuFocusTrapFlag );
      menuFocusTrapFlag = null;
      closeMenu( trigger, menu );
    } else {
      trigger.addEventListener( 'click', handleTrigger );
      trigger.addEventListener( 'touchstart', handleTrigger );
    }
}

function handleTrigger( event ) {
    let isExpanded = trigger.getAttribute( 'aria-expanded' ) === 'true' ? true : false;

    // если меню открыто, то закрыть его, иначе открыть
    if ( isExpanded ) {
        closeMenu( trigger, menu);
    } else {
        openMenu( trigger, menu);
    }

    // на сенсорных экранах событие мыши игнорируется
    if ( event.type === 'touchstart' ) {
        event.preventDefault();
    }
}

// открывает меню
function openMenu( trigger, menu ) {
    trigger.setAttribute( 'aria-expanded', 'true');
    menu.classList.add( 'nav-header__list--animatable' );
    menu.classList.add( 'nav-header__list--open' );
    menuFocusTrapFlag =  enableFocusTrap( nav );
}

// закрывает меню
function closeMenu( trigger, menu ) {
    trigger.setAttribute( 'aria-expanded', 'false');
    menu.classList.add( 'nav-header__list--animatable' );
    menu.classList.remove( 'nav-header__list--open' );
    disableFocusTrap( nav, menuFocusTrapFlag );
    menuFocusTrapFlag = null;
}

// если вначале загружается мобильная версия, то подключить обработчики для триггера и меню
if ( !mediaQuery.matches ) {
    trigger.addEventListener( 'click', handleTrigger );
    trigger.addEventListener( 'touchstart', handleTrigger );
}

trigger.classList.add( 'js' );
menu.classList.add( 'js' );
mediaQuery.addEventListener( 'change', handleChange );