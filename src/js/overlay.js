/**
 * @module js/overlay
 * @author Marcello Surdi
 *
 * @desc
 * Un overlay è un velo scuro semitrasparente che si sovrappone ai contenuti di primo livello.
 */

 /**
  * @desc
  * Mostra o nasconde l'overlay.
  *
  * @param {boolean} [show=true] `true` per mostrare l'overlay, `false` per nasconderlo
  * @param {boolean} [spinner=false] Indica se mostrare o meno uno spinner di caricamento
  * @param {number} [zIndex=10] Il valore della proprietà CSS `z-index`
  * @returns {HTMLDivElement|undefined} Un riferimento all'overlay (`undefined` se l'overlay viene chiuso)
  *
  * @example
  * const overlay = Overlay( true );
  */
export function Overlay( show = true, spinner = false, zIndex = 10 ) {
  let overlay = document.getElementById( 'overlay' );

  if( !overlay ) {
    overlay = document.createElement( 'DIV' );
    overlay.id = 'overlay';

    document.getElementById( 'body' ).appendChild( overlay );
  }

  if( show ) {
    overlay.style.display = 'block';
    if( spinner ) {
      overlay.classList.add( 'preload' );
    }
    overlay.style.zIndex = zIndex;

    return overlay;
  }

  else {
    overlay.style.display = 'none';
    overlay.classList.remove( 'preload' );
  }
}
