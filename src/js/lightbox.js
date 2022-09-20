/**
 * @module js/lightbox
 * @author Marcello Surdi
 *
 * @desc
 * Una gallery in stile lighbox mostra immagini o video riempiendo quanto più possibile lo schermo e oscurando il resto dei contenuti.
 */

import { Overlay } from './overlay';
import { l10n } from './l10n';
import { getCurrentLang } from './utils';

/**
 * @desc
 * Mostra una gallery in stile lightbox
 *
 * @param {HTMLElement} el Elemento contenitore della gallery
 *
 * @requires {@linkcode module:js/overlay|Overlay}
 * @requires {@linkcode module:js/l10n|l10n}
 * @requires {@linkcode module:js/utils.Lang.exports.getCurrentLang|getCurrentLang}
 *
 * @example
 * // <div id="lightbox-section">
 * //   <a href="path-to-image1.jpg" data-lightbox data-lightbox-descr="...">Mostra</a>
 * //   <a href="path-to-image2.jpg" data-lightbox="gallery-name" data-lightbox-descr="...">Mostra</a>
 * //   <a href="path-to-image3.jpg" data-lightbox="gallery-name" data-lightbox-descr="...">Mostra</a>
 * // </div>
 *
 * Lightbox( document.getElementById( 'lightbox-section' ) );
 */
export function Lightbox( el ) {
  let lightbox, close_btn, overlay;

  [].slice.call( el.querySelectorAll( 'a[data-lightbox]' ) ).forEach( ( item ) => {
    item.addEventListener( 'click', open );
  } );


  // Inizializza la gallery e carica la prima immagine
  function open( e ) {
    e.preventDefault();

    const a = e.currentTarget;

    lightbox = document.createElement( 'DIV' );
    lightbox.id = 'lightbox';
    lightbox.addEventListener( 'transitionend', onTransitionEnd );

    close_btn = document.createElement( 'BUTTON' );
    close_btn.type = 'button';
    close_btn.id = 'close-lightbox';
    close_btn.className = 'white-background icon-close icon-medium text-medium';
    close_btn.addEventListener( 'click', close );

    overlay = Overlay();
    overlay.addEventListener( 'click', close );
    overlay.appendChild( lightbox );
    overlay.appendChild( close_btn );

    const prev_button = document.createElement( 'BUTTON' );
    prev_button.className = 'prev-btn padding-medium';
    prev_button.innerHTML = '<span class="icon-arrow rotate-right text-big"></span>';
    prev_button.addEventListener( 'click', prev );
    lightbox.appendChild( prev_button );

    const next_button = document.createElement( 'BUTTON' );
    next_button.className = 'next-btn padding-medium';
    next_button.innerHTML = '<span class="icon-arrow text-big"></span>';
    next_button.addEventListener( 'click', next );
    lightbox.appendChild( next_button );

    const text_div = document.createElement( 'DIV' );
    text_div.className = 'descr padding-small text-small';
    lightbox.appendChild( text_div );

    // Crea la proprietà `lightbox.gallery`
    const gallery_name = a.getAttribute( 'data-gallery' );
    lightbox.gallery = [];
    if( gallery_name ) {
      [].slice.call( el.querySelectorAll( `a[data-gallery="${ gallery_name }"]` ) ).forEach( ( item ) => {
        lightbox.gallery.push( item.getAttribute( 'href') );
      } );
    }

    // Crea la proprietà `lightbox.descr`
    lightbox.descr = a.getAttribute( 'data-lightbox-descr');

    loadImg( a.getAttribute( 'href') );
  }

  function close( e ) {
    if( e.target.id == 'overlay' || e.target.id == 'close-lightbox' ) {
      overlay.removeChild( lightbox );
      overlay.removeEventListener( 'click', close );
      overlay.removeChild( close_btn );
      Overlay( false );
    }
  }

  function onTransitionEnd( e ) {
    if( e.propertyName == 'width' ) {
      const img = lightbox.querySelector( 'img' );
      img.classList.add( 'complete' );

      if( lightbox.hasOwnProperty( 'next' ) ) {
        lightbox.querySelector( 'button.next-btn' ).style.display = 'block';
        lightbox.querySelector( 'button.prev-btn' ).style.display = 'block';
      }

      if( lightbox.descr ) {
        const descr = lightbox.querySelector( 'div.descr' );
        descr.textContent = lightbox.descr;
        descr.style.width = img.offsetWidth + 'px';
        descr.style.display = 'block';
      }
    }
  }

  function next() {
    lightbox.removeChild( lightbox.querySelector( 'img' ) );
    lightbox.querySelector( 'button.next-btn' ).style.display = 'none';
    lightbox.querySelector( 'button.prev-btn' ).style.display = 'none';
    lightbox.querySelector( 'div.descr' ).style.display = 'none';
    loadImg( lightbox.gallery[ lightbox.next ] );
  }

  function prev() {
    lightbox.removeChild( lightbox.querySelector( 'img' ) );
    lightbox.querySelector( 'button.next-btn' ).style.display = 'none';
    lightbox.querySelector( 'button.prev-btn' ).style.display = 'none';
    lightbox.querySelector( 'div.descr' ).style.display = 'none';
    loadImg( lightbox.gallery[ lightbox.prev ] );
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
        // Modifica il valore di `img.offsetWidth`
        img.style.height = img_available_height + 'px';

        while( img.offsetWidth > img_available_width ) {
          img.style.height = ( img_available_height - descrease ) + 'px';
          descrease += 10;
        }
      }

      // Se la larghezza è maggiore o uguale dell'altezza, adatta per larghezza
      else if( ratio >= 1 && img.offsetWidth > img_available_width ) {
        // Modifica il valore di `img.offsetHeight`
        img.style.width = img_available_width + 'px';

        while( img.offsetHeight > img_available_height ) {
          img.style.width = ( img_available_width - descrease ) + 'px';
          descrease += 10;
        }
      }

      lightbox.style.width = ( img.offsetWidth + 10 ) + 'px';
      lightbox.style.height = ( img.offsetHeight + 10 ) + 'px';
      lightbox.classList.remove( 'preload' );

      // Crea/aggiorna le proprietà `lightbox.next` e `lightbox.prev`
      if( lightbox.gallery.length > 0 ) {
        const current = lightbox.gallery.indexOf( path );
        console.log( current );
        lightbox.next = ( ( current + 1 ) > ( lightbox.gallery.length - 1 ) ) ? 0 : current + 1;
        lightbox.prev = ( ( current - 1 ) < 0 ) ? ( lightbox.gallery.length - 1 ) : current - 1;
      }
    }

    img.onerror = () => {
      lightbox.classList.remove( 'preload' );

      const text_div = document.createElement( 'DIV' );
      text_div.className = 'align-middle-absolute w-12 padding-small align-center text-small';
      text_div.textContent = l10n[ getCurrentLang() ][ 'loading-error' ];
      lightbox.appendChild( text_div );
    }
  }
}
