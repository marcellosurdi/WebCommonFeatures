/**
 * @module js/inputbtns
 * @author Marcello Surdi
 *
 * @desc
 * Si tratta di pulsanti che vengono associati ai campi di testo per cancellare il contenuto o rivelare la password.
 */

/**
* @desc
* Mostra/nasconde il pulsante.
*
* @example
* // L'attributo id nell'elemento è obbligatorio per il corretto funzionamento del modulo
* // <input type="text" id="text4" class="inputbtns" placeholder="checkITVAT" data-require='checkITVAT' data-msg='mandatory-field'>
*
* InputBtns();
*/
export function InputBtns() {
  [].slice.call( document.querySelectorAll( '.inputbtns' ) ).forEach( ( text_field ) => {
      text_field.onfocus = show;
      text_field.onblur = hide;
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
        const icon = ( text_field.type == 'password' ) ? 'icon-open-eye text-xl' : 'icon-close text-medium';
        btn.className = `inputbtn light-a-background ${ icon } icon-medium`;

        text_field.offsetParent.appendChild( btn );

        setCoords( btn, text_field );

        btn.classList.remove( 'hide' );
        btn.classList.add( 'show' );

        if( icon.indexOf( 'icon-open-eye' ) != -1 ) {
          btn.addEventListener( 'click', toggle );
        } else {
          btn.addEventListener( 'click', reset );
        }

        // Cancella il testo
        function reset( e ) {
          this.classList.remove( 'show' );
          this.classList.add( 'hide' );
          text_field.value = '';
          text_field.focus();
        }

        // Mostra/nasconde la password
        function toggle( e ) {
          if( this.classList.contains( 'icon-closed-eye' ) ) {
            this.classList.remove( 'icon-closed-eye' );
            this.classList.add( 'icon-open-eye' );
            text_field.type = 'password';
          } else {
            this.classList.remove( 'icon-open-eye' );
            this.classList.add( 'icon-closed-eye' );
            text_field.type = 'text';
          }
          text_field.focus();
        }
      }
      else {
        setCoords( inputbtn, text_field );

        inputbtn.classList.remove( 'hide' );
        inputbtn.classList.add( 'show' );
      }
    }

    window.addEventListener( 'resize', hide );
  }

  // Nasconde il pulsante senza effettuare l'operazione predefinita
  function hide( e ) {
    [].slice.call( document.querySelectorAll( 'button[id*="inputbtn-"]') ).forEach( ( inputbtn ) => {
      inputbtn.classList.remove( 'show' );
      inputbtn.classList.add( 'hide' );
    } );

    window.removeEventListener( 'resize', hide );
  }

  function setCoords( btn, text_field ) {
    const top = text_field.offsetTop + ( ( text_field.offsetHeight - btn.offsetHeight ) / 2 );
    const left = text_field.offsetLeft + text_field.offsetWidth - ( btn.offsetWidth + 10 );
    btn.style.cssText = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px;';
  }
}
