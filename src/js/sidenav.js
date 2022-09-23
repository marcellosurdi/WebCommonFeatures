/**
 * @module js/sidenav
 * @author Marcello Surdi
 *
 * @desc
 * Una sidenav è un menu di navigazione laterale multilivello
 */

import { Overlay } from './overlay';

/**
 * @desc
 * Mostra o nasconde la sidenav del sito.
 *
 * @see {@link https://www.w3schools.com/howto/howto_js_sidenav.asp|Come creare un menu di navigazione laterale}
 * @requires {@linkcode module:js/overlay|Overlay}
 *
 * @example
 * import './js/sidenav';
 *
 * document.getElementById( 'sidenav' ).open();
 */
function Sidenav() {
  let body = document.getElementById( 'body' );
  let sidenav = document.getElementById( 'sidenav' );

  document.getElementById( 'open-menu' ).addEventListener( 'click', openSidenav );
  sidenav.open = openSidenav;

  document.getElementById( 'close-menu' ).addEventListener( 'click', closeSidenav );

  sidenav.querySelectorAll( 'li.has-children > a' ).forEach( item => {
    item.addEventListener( 'click', openSubMenu );

    let sub_menu = item.nextElementSibling;
    sub_menu.setAttribute( 'data-max-height', ( ( sub_menu.querySelectorAll( 'li' ).length * 50 ) + 'px') );
    sub_menu.style.maxHeight = '0px';
  });

  sidenav.querySelectorAll( 'li:not(.has-children) > a' ).forEach( item => {
    item.addEventListener( 'click', closeSidenav );
  });

  function openSubMenu( e ) {
    e.preventDefault();

    this.classList.toggle( 'active' );

    let sub_menu = this.nextElementSibling;
    if( sub_menu.style.maxHeight == '0px' ) {
      sub_menu.style.maxHeight = sub_menu.getAttribute( 'data-max-height' );
      sub_menu.style.opacity = '1';
    } else {
      sub_menu.style.maxHeight = '0px';
      sub_menu.style.opacity = '0';
    }
  }

  function openSidenav() {
    const overlay = Overlay();
    overlay.addEventListener( 'click', function close( e ) {
      closeSidenav();
      e.target.removeEventListener( 'click', close );
    } )

    sidenav.classList.add( 'shift' );
    body.classList.add( 'shift' );
  }

  function closeSidenav() {
    Overlay( false );

    sidenav.classList.remove( 'shift' );
    body.classList.remove( 'shift' );
  }
}

Sidenav();
