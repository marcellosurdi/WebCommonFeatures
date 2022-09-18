/**
 * @module js/modalbox
 * @author Marcello Surdi
 *
 * @desc
 * Una finestra modale è una finestra secondaria che richiede all'utente di interagire con essa prima di ritornare ad operare con la finestra principale
 */

import { l10n } from './l10n';
import { getCurrentLang } from './utils';
import { Overlay } from './overlay';

/**
 * @desc
 * Mostra una finestra modale.
 *
 * @param {string} title Testo da mostrare come titolo della finestra
 * @param {string} text Testo da mostrare come contenuto della finestra, può contenere HTML, moduli o essere una stringa dell'oggetto `l10n`
 * @param {function} onConfirm Funzione callback invocata quando l'utente conferma l'operazione corrente. Riceve come parametro un riferimento al form della finestra modale, **deve restituire true per chiudere la finestra**
 * @param {function} [onCancel = () => {}] Funzione callback invocata se l'utente annulla l'operazione corrente
 *
 * @requires {@linkcode module:js/overlay|Overlay}
 * @requires {@linkcode module:js/l10n|l10n}
 * @requires {@linkcode module:js/utils.Lang.exports.getCurrentLang|getCurrentLang}
 *
 * @example
 * Modalbox( 'title', 'text', () => {} );
 */
export function Modalbox( title, text, onConfirm, onCancel = () => {} ) {
  let modalbox = document.getElementById( 'modal-box' );
  if( !modalbox ) {
    modalbox = document.createElement( 'DIV' );
    modalbox.id = 'modal-box';
    modalbox.className = 'padding-small w-11 max-width-768';

    const html =
      `
      <form>
        <h3 class="title light-a-background padding-tb-small align-center"></h3>
        <div class="xxlight-grey-background padding-small">
          <div class="padding-rl-medium">
            <div class="text"></div>
          </div>
          <div class="margin-top-medium padding-small align-center">
            <button type="submit" class="confirm-btn btn display-inline-block radius-5 dark-btn-background padding-medium text-medium">
              <span class="white-background icon-checkmark icon-small text-small"></span>
              <span data-i18n="confirm">${ l10n[ getCurrentLang() ][ 'confirm' ] }</span>
            </button>
            <button type="button" class="cancel-btn btn display-inline-block radius-5 xlight-grey-background padding-medium text-medium">
              <span data-i18n="cancel">${ l10n[ getCurrentLang() ][ 'cancel' ] }</span>
            </button>
          </div>
        </div>
      </form>
      `;
    modalbox.innerHTML = html;

    document.getElementById( 'body' ).appendChild( modalbox );
  }


  const translated_title = l10n[ getCurrentLang() ][ title ];
  modalbox.querySelector( 'h3.title' ).innerHTML = ( translated_title ) ? translated_title : title;

  const translated_text = l10n[ getCurrentLang() ][ text ];
  modalbox.querySelector( 'div.text' ).innerHTML = ( translated_text ) ? translated_text : text;

  Overlay();
  setTimeout( () => modalbox.classList.add( 'show' ), 0 );

  modalbox.querySelector( 'form' ).onsubmit = function( e ) {
    e.preventDefault();

    if( onConfirm( this ) ) {
      // Chiude la soft keyboard
      modalbox.querySelector( '.confirm-btn' ).focus();
      close();
    }
  }

  modalbox.querySelector( '.cancel-btn' ).onclick = () => {
    onCancel();
    close();
  }

  function close() {
    Overlay( false );
    modalbox.classList.remove( 'show' );
  }
}
