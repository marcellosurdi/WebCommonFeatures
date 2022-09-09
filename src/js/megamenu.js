/**
 * @module js/core/megamenu
 * @author Marcello Surdi
 *
 * @desc
 * Contiene il componente **MegaMenu**.
 *
 * @see {@link module:js/utils/helpers.click|js/utils/helpers.click}
 * @see {@link module:js/utils/helpers.truncate|js/utils/helpers.truncate}
 * @see {@link module:js/components/overlay|js/components/overlay}
 *
 * @example
 * <!-- Esempio di codice HTML da inserire nella pagina -->
 * <nav>
 *  <div class="dropdown-container float-container float-item">
 *    <a href="javascript:void(0);" class="btn align-center">
 *      Voce menu
 *    </a>
 *    <div class="dropdown-content">
 *      <div class="row centered-content white-background padding-medium">
 *        <!-- [...] -->
 *      </div>
 *    </div>
 *  </div>
 * </nav>
 */

// import { click, truncate } from './../utils/helpers.js';
import './../css/megamenu.scss';
import { Overlay } from './overlay';

/**
 * @desc
 * Inizializza e gestisce il mega menu
 *
 * @example
 * MegaMenu();
 */
export function MegaMenu() {
  let current_button;
  // Only for SPA, closes megamenu when the user clicks on a link with data-page or data-lang attribute
  const a = document.querySelector( 'nav#main' ).querySelectorAll( 'a[data-page], a[data-lang]' );
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

  // truncate( document.querySelector( 'span#user-logged-in-name' ), 12 );

  // User clicks on a top-level button
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
    // Se l'utente clicca dentro un pulsante o un sottomenu aperto
    if( e.target.closest('.dropdown-container > a, [class*="row"]') ) {
      return;
    } else {
      close();
    }
  }
}

MegaMenu();
