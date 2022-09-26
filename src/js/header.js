/**
 * @module js/header
 * @author Marcello Surdi
 *
 * @desc
 * La barra di intestazione del sito utilizzabile insieme al modulo js/pageslider
 */

import { debounceEvent } from './utils'

 /**
  * @desc
  * - Allinea in senso orizzontale la barra di intestazione ai contenuti. Questi ultimi, a differenza della barra di intestazione,
  * hanno quasi sempre la barra di scorrimento rendendo impreciso l'allinamento con i fogli di stile.
  * - Nasconde la barra di intestazione quando lo scorrimento di pagina è verso il basso, la mostra in caso contrario o se la proprietà `scrollTop == 0`.
  *
  * @param {boolean} hide `true` mostra/nasconde la barra di intestazione durante lo scorrimento, `false` barra di intestazione sempre visibile
  *
  * @requires {@linkcode module:js/utils.debounceEvent|debounceEvent}
  *
  * @example
  * Header();
  */
export function Header( hide = true ) {
  let header = document.getElementById( 'header' );
  let page = document.querySelector( 'div.page' );

  let start_scrolltop;
  if( hide ) {
    start_scrolltop = page.scrollTop;
    page.addEventListener( 'scroll', debounceEvent( scroll, 100 ) );
  }

  align();
  window.addEventListener( 'resize', debounceEvent( align, 50 ) );

  function scroll( e ) {
    let current_scrolltop = page.scrollTop;

    // La condizione `current_scrolltop == 0` è necessaria perché diversamente uno scorrimento veloce verso l'alto non farebbe riapparire l'header
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

      // Sovrascrive `start_scrolltop` gestendo lo scrolling negativo su mobile
      start_scrolltop = ( current_scrolltop <= 0 ) ? 0 : current_scrolltop;
    }
  }

  function align() {
    const header_div = header.querySelector( 'div' );
    const styles = getComputedStyle( header_div );
    const container_max_width = +styles.maxWidth.replace( 'px', '' );

    let left = ( page.clientWidth - container_max_width ) / 2;
    if( left < 0 ) {
      left = 0;
    }
    header_div.style.marginLeft = left + 'px';
  }
}
