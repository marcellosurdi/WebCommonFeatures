/**
 * @module js/overlay
 * @author Marcello Surdi
 *
 * @desc
 * The Overlay function shows or hides an overlay.
 */

 /**
  * @desc
  * Shows or hides an overlay.
  *
  * @param {boolean} [show=true] true to show, false to hide the overlay
  * @param {boolean} [spinner=false] Denotes whether or not to show the loading spinner
  * @param {number} [zIndex=10] CSS z-index property
  * @returns {HTMLDivElement|undefined} Returns the overlay object (undefined if the overlay is closed)
  *
  * @example
  * const overlay = Overlay();
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
  } else {
    overlay.style.display = 'none';
    overlay.classList.remove( 'preload' );
  }
}
