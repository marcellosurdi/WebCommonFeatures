/**
 * @module js/megamenu
 * @author Marcello Surdi
 *
 * @desc
 * Un megamenu è un menu di navigazione a comparsa che contiene link, immagini o altro suddivisi e organizzati su più colonne
 */

import './../css/megamenu.scss';
import { Overlay } from './overlay';

/**
 * @desc
 * Inizializza e gestisce il mega menu
 *
 * @requires {@linkcode module:js/overlay|Overlay}
 *
 * @example
 * // <nav id="main">
 * //  <div class="dropdown-container float-container float-item">
 * //   <a href="javascript:void(0);" class="btn align-center">Elemento menu</a>
 * //   <div class="dropdown-content">
 * //    <div class="row centered-content white-background padding-medium">
 * //     <!-- [...] -->
 * //    </div>
 * //   </div>
 * //  </div>
 * // </nav>
 *
 * MegaMenu();
 */
function MegaMenu() {
  let menu = document.querySelector( 'nav#main' );
  let current_button;

  let items_with_dropdown = menu.querySelectorAll( 'a.menu-item-has-dropdown' );
  for( let i = 0, n = items_with_dropdown.length; i < n; i++ ) {
    items_with_dropdown[ i ].insertAdjacentHTML( 'beforeend', ' <span class="icon-arrow rotate-bottom icon-small text-small"></span>' );
  }

  // Chiude il megamenu se un utente cambia la lingua
  const a = menu.querySelectorAll( 'a[data-lang]' );
  for( let i = 0; i < a.length; i++ ) {
    a[ i ].addEventListener( 'click', close );
  }

  const buttons = document.querySelectorAll( 'div.dropdown-container > a' );
  const button_close = document.querySelectorAll( 'div.dropdown-content h2 a.icon-close' );
  const l = buttons.length;

  for( let i = 0; i < l; i++ ) {
    buttons[ i ].addEventListener( 'click', toggle );
    button_close[ i ].addEventListener( 'click', close );
  }

  // Click su una voce di primo livello
  function toggle( e ) {
    e.preventDefault();
    current_button = e.currentTarget;

    for( let i = 0; i < l; i++ ) {
      if( buttons[ i ] == current_button ) {
        // Se il pulsante corrente è già aperto
        if( current_button.classList.contains( 'active' ) ) {
          // Rimuove il gestore per la chiusura tramite click esterno perché tutti i sottomenu sono chiusi
          window.removeEventListener( 'resize', close );
          document.body.removeEventListener( 'click', ifOutside );
          Overlay( false );
        } else {
          window.addEventListener( 'resize', close );
          document.body.addEventListener( 'click', ifOutside );
          Overlay( true, false, 1 );
        }

        current_button.classList.toggle( 'active' );
        // .dropdown-content
        current_button.nextElementSibling.classList.toggle( 'open' );
      } else {
        // Chiude tutti i sottomenu eventualmente aperti prima
        buttons[ i ].classList.remove( 'active' );
        buttons[ i ].nextElementSibling.classList.remove( 'open' );
      }
    }
  }

  function close( e ) {
    if( current_button ) {
      current_button.classList.remove( 'active' );
      current_button.nextElementSibling.classList.remove( 'open' );

      window.removeEventListener( 'resize', close );
      document.body.removeEventListener( 'click', ifOutside );

      Overlay( false );

      current_button = null;
    }
  }

  function ifOutside( e ) {
    // Se l'utente clicca dentro un pulsante o un sottomenu aperto O
    // clicca su un elemento .tooltip O
    // un su un pulsante .inputbtn
    if(
      e.target.closest( '.dropdown-container > a, [class*="row"]' ) ||
      e.target.classList.contains( 'tooltip' ) ||
      e.target.classList.contains( 'inputbtn' )
    ) {
      return;
    } else {
      close();
    }
  }
}

MegaMenu();
