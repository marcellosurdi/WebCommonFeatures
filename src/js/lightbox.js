/**
 * @module js/lightbox
 * @author Marcello Surdi
 *
 * @desc
 * Una gallery in stile lighbox mostra immagini o video riempiendo quanto più possibile lo schermo e oscurando il resto dei contenuti.
 *
 * @todo Gestione errore di caricamento immagine,
 * @todo descrizione opzionale immagine,
 * @todo visualizzazione di immagini multiple.
 */

import { Overlay } from './overlay';

/**
 * @desc
 * Mostra una gallery in stile lightbox
 *
 * @param {HTMLElement} el Elemento contenitore della gallery
 *
 * @requires {@linkcode module:js/overlay|Overlay}
 *
 * @example
 * // <div id="lightbox-section">
 * //   <a href="path-to-image1.jpg" data-lightbox>Mostra</a>
 * //   <a href="path-to-image2.jpg" data-lightbox="gallery-name">Mostra</a>
 * //   <a href="path-to-image3.jpg" data-lightbox="gallery-name">Mostra</a>
 * // </div>
 * Lightbox( document.getElementById( 'lightbox-section' ) );
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

    loadImg( e.target.getAttribute( 'href') );
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
