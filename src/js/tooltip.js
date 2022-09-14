/**
 * @module js/tooltip
 * @author Marcello Surdi
 *
 * @desc
 * Il tooltip è un piccolo riquadro che mostra informazioni supplementari.
 * Solitamente compare cliccando o passando col mouse sopra un'icona o un testo.
 *
 * @todo Utilizzare evento `mouseover` su desktop e `click` su mobile,
 * @todo evento click normalizzato per dispositivi Apple.
 */

import { l10n } from './l10n';
import { getCurrentLang, smoothScroll } from './utils'

/**
 * @desc
 * Mostra un tooltip
 *
 * @param {MouseEvent} e
 *
 * @see {@linkcode module:js/utils.Lang.exports.getCurrentLang|getCurrentLang}
 * @see {@linkcode module:js/utils.smoothScroll|smoothScroll}
 * @requires {@linkcode module:js/l10n|l10n}
 *
 * @example
 * // <a href="javascript:void(0);" class="show-tooltip icon-info radius-circle notice-background text-xl" data-tooltip-text="text-id"></a>
 *
 * Tooltip();
 */
export function Tooltip() {
  [].slice.call( document.querySelectorAll( '.show-tooltip' ) ).forEach( ( item ) =>
    item.onclick = showTooltip
  );

  function showTooltip( e ) {
      const el = this;
      let context = el.offsetParent;

      const tooltip = document.createElement( 'DIV' );
      tooltip.className = 'tooltip xdark-grey-background padding-medium font-a text-small';
      tooltip.innerHTML = l10n[ getCurrentLang() ][ el.getAttribute( 'data-tooltip-text' ) ];
      tooltip.style.top = (  el.offsetTop + el.offsetHeight + 15 ) + 'px';
      tooltip.style.left = ( el.offsetLeft + ( el.offsetWidth / 2 ) - 15 ) + 'px';

      const span = document.createElement( 'SPAN' );
      span.style.left = '5px';

      tooltip.appendChild( span );
      context.appendChild( tooltip );

      const coords = tooltip.getBoundingClientRect();
      // Eventuale correzione dello scorrimento verticale di pagina
      let scroll_y = ( coords.top + tooltip.offsetHeight ) - document.documentElement.clientHeight;
      if( scroll_y > 0 ) {
        smoothScroll( scroll_y, false, 'scrollBy' );
      }

      // Eventuale correzione della coordinata x
      const offset_x = ( coords.left + tooltip.offsetWidth ) - document.documentElement.clientWidth;
      if( offset_x > 0 ) {
        tooltip.style.left = ( coords.left - offset_x - 5 ) + 'px';
        span.style.left = ( 5 + offset_x + 5 ) + 'px';
      }

      // Evita che l'evento click venga processato immediatamente a livello dell'elemento contenitore
      setTimeout( () => document.body.addEventListener( 'click', close ), 0 );
      window.addEventListener( 'resize', close );

      function close( e ) {
        tooltip.classList.add( 'hide' );
        tooltip.addEventListener( 'animationend', function handler( e ) {
          tooltip.removeEventListener( 'animationend', handler );
          context.removeChild( tooltip );
        } );

        document.body.removeEventListener( 'click', close );
        window.removeEventListener( 'resize', close );
      }
    }
 }
