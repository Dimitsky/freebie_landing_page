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

// EXPLORE ALL 

const count = 4;
const serviceArr = Array.from( document.querySelectorAll( '.list-service__item' ) );
const serviceBtn = document.querySelector( '#explore-all' );

serviceBtn.style.display = 'block';

serviceArr.slice( count ).forEach( itemEl => {
    itemEl.style.display = 'none';
} );

function serviceBtnHandle( event ) {
    serviceArr.slice( count ).forEach( itemEl => {
        itemEl.style.display = 'flex';
    } );

    serviceBtn.removeEventListener( 'click', serviceBtnHandle );
    serviceBtn.removeEventListener( 'touchstart', serviceBtnHandle );
    serviceBtn.style.display = 'none';

    if ( event.type === 'touchstart' ) {
        event.preventDefault();
    }
}

serviceBtn.addEventListener( 'click', serviceBtnHandle );
serviceBtn.addEventListener( 'touchstart', serviceBtnHandle );

// FAQ ACC

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

        if ( index === options.openIndex ) {
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