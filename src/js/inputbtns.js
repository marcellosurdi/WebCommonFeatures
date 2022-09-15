/**
 * @module js/inputbtns
 * @author Marcello Surdi
 *
 * @desc
 * Si tratta di pulsanti che vengono associati ai campi di testo per cancellare il contenuto o rivelare la password.
 */

/**
* @desc
* Mostra/nasconde il pulsante
*
* @example
* // <input type="text" id="text4" class="inputbtns" placeholder="checkITVAT" data-require='checkITVAT' data-msg='mandatory-field'>
*
* InputBtns();
*/
export function InputBtns() {
  [].slice.call( document.querySelectorAll( '.inputbtns' ) ).forEach( ( text_field ) => {
    if( document.querySelector( 'button#inputbtn-' + text_field.id ) === null ) {
      text_field.addEventListener( 'focus', show );
      text_field.addEventListener( 'blur', hide );
    }
  } );

  function show( e ) {
    // Il campo di testo corrente
    const text_field = this;
    const inputbtn = document.querySelector( 'button#inputbtn-' + text_field.id );

    // Se il campo di testo non è vuoto
    if( text_field.value != '' ) {
      // Il pulsante non è già stato creato
      if( inputbtn === null ) {
        let btn = document.createElement( 'BUTTON' );
        btn.id = 'inputbtn-' + text_field.id;
        btn.className = 'inputbtn light-a-background icon-close icon-medium text-medium';

        text_field.offsetParent.appendChild( btn );

        const top = text_field.offsetTop + ( ( text_field.offsetHeight - btn.offsetHeight ) / 2 );
        const left = text_field.offsetLeft + text_field.offsetWidth - ( btn.offsetWidth + 10 );
        btn.style.cssText = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px;';

        btn.classList.remove( 'hide' );
        btn.classList.add( 'show' );

        btn.addEventListener( 'click', reset );

        // Cancella il testo
        function reset( e ) {
          console.log( 'reset' );

          this.classList.remove( 'show' );
          this.classList.add( 'hide' );
          text_field.value = '';
          text_field.focus();
        }
      }
      else {
        inputbtn.classList.remove( 'hide' );
        inputbtn.classList.add( 'show' );
      }
    }

    window.addEventListener( 'resize', hide );
  }

  // Nasconde il pulsante senza effettuare l'operazione predefinita
  function hide( e ) {
    const text_field = this;
    const inputbtn = document.querySelector( 'button#inputbtn-' + text_field.id );

    if( inputbtn !== null ) {
      inputbtn.classList.remove( 'show' );
      inputbtn.classList.add( 'hide' );
    }

    window.removeEventListener( 'resize', hide );
  }
}
