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
 * // L'attributo id nell'elemento è obbligatorio per il corretto funzionamento del modulo
 * // <span id="collapsible-info" class="tooltips icon-info icon-small radius-circle xlight-grey-background text-small" data-tooltip-text="notification-text"></span>
 *
 * Tooltips();
 */
export function Tooltips() {
  [].slice.call( document.querySelectorAll( '.tooltips' ) ).forEach( ( item ) =>
    item.onclick = show
  );

  function show( e ) {
    const trigger = this;
    let context = trigger.offsetParent;
    let tooltip = document.querySelector( 'div#tooltip-' + trigger.id );

    if( !tooltip ) {
      tooltip = document.createElement( 'DIV' );
      tooltip.id = 'tooltip-' + trigger.id;
      tooltip.className = 'tooltip xdark-grey-background padding-medium font-a text-small';
      tooltip.innerHTML = l10n[ getCurrentLang() ][ trigger.getAttribute( 'data-tooltip-text' ) ];

      const span = document.createElement( 'SPAN' );
      span.style.left = '5px';

      tooltip.appendChild( span );
      context.appendChild( tooltip );

      setCoords( tooltip, trigger );

      tooltip.classList.add( 'show' );

      tooltip.addEventListener( 'animationend', ( e ) => {
        if( e.animationName == 'fadeout' ) {
          tooltip.style.display = 'none'
        }
      } );
    }
    else {
      tooltip.style.display = 'block';
      setCoords( tooltip, trigger );

      tooltip.classList.remove( 'hide' );
      tooltip.classList.add( 'show' );
    }

    // Evita che l'evento click venga processato immediatamente a livello dell'elemento contenitore
    setTimeout( () => document.body.addEventListener( 'click', close ), 0 );
    window.addEventListener( 'resize', close );

    function close( e ) {
      tooltip.classList.remove( 'show' );
      tooltip.classList.add( 'hide' );

      document.body.removeEventListener( 'click', close );
      window.removeEventListener( 'resize', close );
    }
  }

  function setCoords( tooltip, trigger ) {
    tooltip.style.top = (  trigger.offsetTop + trigger.offsetHeight + 15 ) + 'px';
    tooltip.style.left = ( trigger.offsetLeft + ( trigger.offsetWidth / 2 ) - 15 ) + 'px';

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
      tooltip.querySelector( 'span' ).style.left = ( 5 + offset_x + 5 ) + 'px';
    }
  }
 }
