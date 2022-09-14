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
  let items_with_children = menu.querySelectorAll( 'li.has-children > a' );

  for( let i = 0, n = items_with_children.length; i < n; i++ ) {
    items_with_children[ i ].insertAdjacentHTML( 'beforeend', ' <span class="icon-arrow rotate-bottom icon-small text-small"></span>' );
  }
}

MultilevelMenu();
