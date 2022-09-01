/**
 * @module js/lightbox
 * @author Marcello Surdi
 *
 * @desc
 * Gallery in stile lightbox
 *
 * @example
 * <a href="path-to-image.png" data-lightbox="gallery-name">Show</a>
 *
 * @todo
 * - Gestione errore di caricamento immagine
 * - Descrizione opzionale immagine
 * - Visualizzazione di immagini multiple
 */

import { Overlay } from './overlay';


/**
 * @desc
 * Gestisce una gallery in stile lightbox
 *
 * @param {HTMLElement} el Elemento contenitore della gallery
 */
export function Lightbox( el ) {
  let lightbox, close_btn, overlay;

  const coll = el.querySelectorAll( 'a[data-lightbox]' );
  coll.forEach( ( item ) => {
    item.addEventListener( 'click', open );
  } );


  function open( e ) {
    e.preventDefault();

    lightbox = document.createElement( 'DIV' );
    lightbox.id = 'lightbox';
    lightbox.addEventListener( 'transitionend', ( e ) => {
      if( e.propertyName == 'width' ) {
        lightbox.querySelector( 'img' ).classList.add( 'complete' );
      }
    } );

    close_btn = document.createElement( 'BUTTON' );
    close_btn.type = 'button';
    close_btn.id = 'close-lightbox';
    close_btn.className = 'white-background icon-close icon-medium text-medium';
    close_btn.addEventListener( 'click', close );

    overlay = Overlay();
    overlay.appendChild( lightbox );
    overlay.appendChild( close_btn );

    loadImg( document.body.getAttribute( 'data-output-path' ) + e.target.getAttribute( 'href') );
  }

  function close( e ) {
    overlay.removeChild( lightbox );
    overlay.removeChild( close_btn );
    Overlay( false );
  }

  function loadImg( path ) {
    lightbox.className = 'preload';

    const img = new Image();
    img.src = path;
    img.onload = () => {
      lightbox.appendChild( img );

      // Massima larghezza disponibile per l'immagine =
      //    larghezza della finestra -
      //    margini sinistro e destro esterni al lightbox (10 + 10) -
      //    margini sinistro e destro interni al lightbox (5 + 5)
      const img_available_width = document.documentElement.clientWidth - 20 - 10;
      // Massima altezza disponibile per l'immagine =
      //    altezza della finestra -
      //    margini superiore e inferiore esterni al lightbox ((10 + 32 + 10 + 10) + 10) -
      //    margini superiore e inferiore interni al lightbox (5 + 5)
      const img_available_height = document.documentElement.clientHeight - 62 - 10;

      let ratio = img.offsetWidth / img.offsetHeight;
      let descrease = 10;
      // Se l'altezza maggiore della larghezza, adatta per altezza
      if( ratio < 1 && img.offsetHeight > img_available_height ) {
        // Modifica il valore di img.offsetWidth
        img.style.height = img_available_height + 'px';

        while( img.offsetWidth > img_available_width ) {
          img.style.height = ( img_available_height - descrease ) + 'px';
          descrease += 10;
        }
      }

      // Se la larghezza è maggiore o uguale dell'altezza, adatta per larghezza
      else if( ratio >= 1 && img.offsetWidth > img_available_width ) {
        // Modifica il valore di img.offsetHeight
        img.style.width = img_available_width + 'px';

        while( img.offsetHeight > img_available_height ) {
          img.style.width = ( img_available_width - descrease ) + 'px';
          descrease += 10;
        }
      }

      lightbox.style.width = ( img.offsetWidth + 10 ) + 'px';
      lightbox.style.height = ( img.offsetHeight + 10 ) + 'px';
      lightbox.classList.remove( 'preload' );
    }
  }
}
