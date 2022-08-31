/**
 * @module js/notification
 * @author Marcello Surdi
 *
 * @desc
 * La funzione Notification mostra o nasconde un riquadro di notifica nella parte alta del display.
 */

import { l10n } from './l10n';
import { getCurrentLang } from './utils';

let timeout_id = 0;

/**
 * @desc
 * Mostra o nasconde una notifica. La notifica è aggiunta a un elemento `<div id="body">...</div>` che racchiude tutti i contenuti.
 *
 * @param {string} type 'warning'|'alert'|'notice'|'success'
 * @param {string} text Testo da mostrare come contenuto della notifica, può contenere HTML o essere una stringa dell'oggetto `l10n`
 * @param {number} [timeout=7000] Tempo espresso in millisecondi dopo il quale la notifica sparisce, 0 indica una notifica persistente
 * @param {function} [onConfirm] Funzione callback invocata quando l'utente conferma l'operazione corrente
 *
 * @example
 * Notification( 'alert', 'text', 0, () => {} );
 */
export function Notification( type, text, timeout = 7000, onConfirm ) {
  if( timeout_id ) {
    clearTimeout( timeout_id );
  }

  let notification = document.getElementById( 'notification' );
  if( !notification ) {
    notification = document.createElement( 'DIV' );
    notification.id = 'notification';
    notification.className = 'display-relative padding-medium';

    const html =
      `<div class="container-max-width">
        <p class="text"></p>
        <button type="button" class="icon-close icon-medium text-medium"></button>
        <div class="options margin-medium">
          <button type="button" class="confirm-btn radius-5 padding-medium text-medium" data-i18n="confirm">${ l10n[ getCurrentLang() ][ 'confirm' ] }</button>
          <button type="button" class="cancel-btn radius-5 padding-medium text-medium" data-i18n="cancel">${ l10n[ getCurrentLang() ][ 'cancel' ] }</button>
        </div><!-- /.options -->
      </div>`;
    notification.innerHTML = html;

    document.getElementById( 'body' ).appendChild( notification );
  }

  if( ![ 'warning', 'alert', 'notice', 'success' ].includes( type ) ) {
    close();
    return;
  }

  notification.querySelector( '.icon-close' ).onclick = close;
  notification.querySelector( '.cancel-btn' ).onclick = close;

  if( notification.classList.contains( 'show' ) ) {
    close();
  }

  notification.classList.remove( 'show', 'alert-background', 'notice-background', 'success-background', 'warning-background' );
  notification.classList.add( type + '-background' );

  const translated_text = l10n[ getCurrentLang() ][ text ];
  notification.querySelector( 'p.text' ).innerHTML = ( translated_text ) ? translated_text : text;

  setTimeout( () => notification.classList.add( 'show' ), 0 );

  if( timeout ) {
    timeout_id = setTimeout( () => {
			notification.classList.remove( 'show' );
		}, timeout );
  }

  if( !onConfirm ) {
    notification.querySelector( 'div.options' ).style.display = 'none';
  } else {
    notification.querySelector( 'div.options' ).style.display = 'block';
    notification.querySelector( '.confirm-btn' ).onclick = () => {
      onConfirm();
      close();
    }
  }

  function close() {
    notification.classList.remove( 'show' );
  }
}
