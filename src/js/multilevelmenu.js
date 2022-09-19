/**
 * @module js/multilevelmenu
 * @author Marcello Surdi
 *
 * @desc
 * Si tratta del classico menu di navigazione a comparsa multilivello
 */

import './../css/multilevelmenu.scss';

/**
 * @desc
 * Inizializza e gestisce il menu multilivello
 *
 * @example
 * // <ul id="main">
 * //  <li class="has-children">
 * //   <a href="javascript:void(0);">Elemento menu</a>
 * //   <ul class="sub-menu">
 * //    <li>
 * //     <a href="javascript:void(0);">Sottoelemento menu</a>
 * //    </li>
 * //   </ul>
 * //  </li>
 * // </ul>
 *
 * MultilevelMenu();
 */

function MultilevelMenu() {
  let menu = document.querySelector( 'nav#main ul' );
  [].slice.call( menu.querySelectorAll( 'li.has-children > a' ) ).forEach( ( item ) => {
    item.insertAdjacentHTML( 'beforeend', ' <span class="icon-arrow rotate-bottom icon-small text-small"></span>' );
    item.addEventListener( 'click', show );
  } );

  function show( e ) {
    if( this.parentElement.parentElement == menu ) {
      // Chiude tutti i menu aperti
      [].slice.call( menu.querySelectorAll( '.has-children.open' ) ).forEach( ( item ) => {
        item.classList.remove( 'open' );
      } );
    }

    this.parentElement.classList.toggle( 'open' );
  }
}

MultilevelMenu();
