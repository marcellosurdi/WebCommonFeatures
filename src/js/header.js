/**
 * @module js/header
 * @author Marcello Surdi
 *
 * @desc
 * L'intestazione....
 */

import { debounceEvent } from './utils'

 /**
  * @desc
  * .
  *
  * @requires {@linkcode module:js/utils.debounceEvent|debounceEvent}
  *
  * @example
  * Header();
  */
export function Header() {
  let header = document.getElementById( 'header' );
  let page = document.querySelector( 'div.page' );

  let start_scrolltop = page.scrollTop;
  page.addEventListener( 'scroll', debounceEvent( scroll, 100 ) );

  function scroll( e ) {
    let current_scrolltop = page.scrollTop;

    // current_scrolltop == 0 perché altrimenti uno scorrimento veloce verso l'alto non fa riapparire l'header
    if( current_scrolltop >= header.offsetHeight || current_scrolltop == 0 ) {

      // Se lo scorrimento è verso il basso nascondi il pannello
      if( current_scrolltop > start_scrolltop ) {
        if( !header.classList.contains( 'hide' ) ) {
          header.classList.remove( 'show' );
          header.classList.add( 'hide' );
        }
      }
      // Se lo scorrimento è verso l'alto mostra il pannello
      else {
        if( !header.classList.contains( 'show' ) ) {
          header.classList.remove( 'hide' );
          header.classList.add( 'show' );
        }
      }

      // Sovrascrive start_scrolltop gestendo lo scrolling negativo su mobile
      start_scrolltop = ( current_scrolltop <= 0 ) ? 0 : current_scrolltop;
    }
  }
}

Header();
