/**
 * @module js/inputbtns
 * @author Marcello Surdi
 *
 * @desc
 * Mostra i pulsanti per i campi di testo/textearea per resettare il pulsante o mostrare/nascondere la password.
 */

import { getCoords } from './utils.js';

/**
 *
 */
export function InputBtns() {
  [].slice.call( document.querySelectorAll( '.inputbtns' ) ).forEach( ( text_field ) => {
    if( text_field.btn === undefined ) {
      text_field.addEventListener( 'focus', show );
      text_field.addEventListener( 'blur', hide );
    }
  } );

  function show( e ) {
    // Il campo di testo corrente
    const text_field = this;

    // Se il campo di testo non è vuoto
    if( text_field.value != '' ) {
      // Se il pulsante non è stato creato in precedenza
      if( text_field.btn === undefined ) {
        let btn = document.createElement( 'BUTTON' );
        btn.id = 'inputbtn-' + text_field.id;
        btn.className = 'inputbtn light-a-background icon-close icon-medium text-medium';

        text_field.offsetParent.appendChild( btn );

        const top = text_field.offsetTop + ( ( text_field.offsetHeight - btn.offsetHeight ) / 2 );
        const left = text_field.offsetLeft + text_field.offsetWidth - ( btn.offsetWidth + 10 );
        btn.style.cssText = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px;';

        btn.classList.add( 'show' );

        text_field.btn = btn;

        btn.addEventListener( 'click', removeClearBtn );

        function removeClearBtn( e ) {
          this.classList.remove( 'show' );
          text_field.value = '';
          text_field.focus();
        }
      }
      else {
        text_field.btn.classList.add( 'show' );
      }
    }
  }

  function hide( e ) {
    if( this.btn ) {
      this.btn.classList.remove( 'show' );
    }
  }
}
