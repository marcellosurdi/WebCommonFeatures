/**
 * @module js/inputbtns
 * @author Marcello Surdi
 *
 * @desc
 * Mostra i pulsanti per i campi di testo/textearea per cancellare il contenuto o mostrare/nascondere la password.
 */

/**
 *
 */
export function InputBtns() {
  [].slice.call( document.querySelectorAll( '.inputbtns' ) ).forEach( ( text_field ) => {
    if( text_field.btn === undefined ) {
      text_field.onfocus = show;
      text_field.onblur = hide;
    }
  } );

  function show( e ) {
    // Il campo di testo corrente
    const text_field = this;

    // Se il campo di testo non è vuoto
    if( text_field.value != '' ) {
      let btn = document.createElement( 'BUTTON' );
      btn.id = 'inputbtn-' + text_field.id;
      btn.className = 'inputbtn light-a-background icon-close icon-medium text-medium';

      text_field.offsetParent.appendChild( btn );

      const top = text_field.offsetTop + ( ( text_field.offsetHeight - btn.offsetHeight ) / 2 );
      const left = text_field.offsetLeft + text_field.offsetWidth - ( btn.offsetWidth + 10 );
      btn.style.cssText = 'position: absolute; top: ' + top + 'px; left: ' + left + 'px;';

      btn.classList.add( 'show' );

      btn.addEventListener( 'click', reset );

      function reset( e ) {
        console.log( 'reset' );
        this.classList.remove( 'show' );
        text_field.value = '';
        text_field.focus();
      }

      text_field.btn = btn;
    }

    window.addEventListener( 'resize', hide );
  }

  function hide( e ) {
    console.log( 'hide' );
    if( this.btn ) {
      this.offsetParent.removeChild( document.getElementById( this.btn.id ) );
      delete this.btn;
    }

    window.removeEventListener( 'resize', hide );
  }
}
