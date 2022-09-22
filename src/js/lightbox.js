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
 * //   <a href="path-to-image1.jpg" data-lightbox data-descr="...">Mostra</a>
 * //   <a href="path-to-image2.jpg" data-lightbox="gallery-name" data-descr="...">Mostra</a>
 * //   <a href="path-to-image3.jpg" data-lightbox="gallery-name" data-descr="...">Mostra</a>
 * // </div>
 *
 * Lightbox( document.getElementById( 'lightbox-section' ) );
 */
export function Lightbox( el ) {
  /**
   * @desc
   * Oggetto che definisce lo stato della gallery
   *
   * @typedef {object} o
   * @memberof module:js/lightbox.
   *
   * @property {array} paths Array ricavato dagli attributi `href` dei percorsi delle immagini che compongono la gallery.
   * @property {array} texts Array ricavato dagli attributi `data-descr` delle descrizioni testuali delle immagini che compongono la gallery.
   * @property {string} descr Descrizione testuale dell'immagine corrente.
   * @property {number} next Chiave dell'immagine successiva nell'array `o.paths`.
   * @property {number} prev Chiave dell'immagine precedente nell'array `o.paths`.
   */
  let o = {};

  [].slice.call( el.querySelectorAll( 'a[data-lightbox]' ) ).forEach( ( item ) => {
    item.addEventListener( 'click', open );
  } );

  // Inizializza la gallery e carica la prima immagine
  function open( e ) {
    e.preventDefault();
    // Resetta l'oggetto ogni volta che il lightbox viene aperto
    o = {};

    const a = e.currentTarget;

    const lightbox = document.createElement( 'DIV' );
    lightbox.id = 'lightbox';
    lightbox.addEventListener( 'transitionend', onTransitionEnd );

    const close_btn = document.createElement( 'BUTTON' );
    close_btn.type = 'button';
    close_btn.id = 'close-lightbox';
    close_btn.className = 'black-background icon-close icon-medium text-medium';
    close_btn.addEventListener( 'click', close );

    const overlay = Overlay();
    overlay.addEventListener( 'click', close );
    overlay.appendChild( lightbox );
    overlay.appendChild( close_btn );

    const prev_button = document.createElement( 'BUTTON' );
    prev_button.className = 'prev-btn padding-medium';
    prev_button.innerHTML = '<span class="icon-arrow rotate-right text-big"></span>';
    prev_button.addEventListener( 'click', () => go( 'prev' ) );
    lightbox.appendChild( prev_button );

    const next_button = document.createElement( 'BUTTON' );
    next_button.className = 'next-btn padding-medium';
    next_button.innerHTML = '<span class="icon-arrow text-big"></span>';
    next_button.addEventListener( 'click', () => go( 'next' ) );
    lightbox.appendChild( next_button );

    const descr = document.createElement( 'DIV' );
    descr.className = 'descr padding-small text-small';
    lightbox.appendChild( descr );

    // Crea le proprietà `o.paths`, `o.texts` e `o.descr`
    const gallery_name = a.getAttribute( 'data-gallery' );
    o.paths = [];
    if( gallery_name ) {
      o.texts = [];
      [].slice.call( el.querySelectorAll( `a[data-gallery="${ gallery_name }"]` ) ).forEach( ( item ) => {
        o.paths.push( item.getAttribute( 'href') );
        o.texts.push( item.getAttribute( 'data-descr') );
      } );
    }

    o.descr = a.getAttribute( 'data-descr');

    loadImg( a.getAttribute( 'href') );


    function close( e ) {
      // Evita che l'overlay di chiuda cliccando sul lightbox
      if( e.target.id == 'overlay' || e.target.id == 'close-lightbox' ) {
        overlay.removeChild( lightbox );
        overlay.removeEventListener( 'click', close );
        overlay.removeChild( close_btn );
        Overlay( false );
      }
    }

    function onTransitionEnd( e ) {
      const img = lightbox.querySelector( 'img' );

      // Esegue il metodo solo una volta
      if( !img.classList.contains( 'complete' ) ) {
        img.classList.add( 'complete' );

        if( o.hasOwnProperty( 'next' ) ) {
          next_button.style.display = 'block';
          prev_button.style.display = 'block';
        }

        if( o.descr ) {
          descr.textContent = o.descr;
          descr.style.width = img.offsetWidth + 'px';
          descr.style.display = 'block';
        }
      }
    }

    function go( i ) {
      lightbox.removeChild( lightbox.querySelector( 'img' ) );
      next_button.style.display = 'none';
      prev_button.style.display = 'none';
      descr.style.display = 'none';

      o.descr = o.texts[ o[ i ] ];
      loadImg( o.paths[ o[ i ] ] );
    }
  }

  function loadImg( path ) {
    const lightbox = document.getElementById( 'lightbox' );
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
      // Se l'altezza dell'immagine è maggiore della larghezza, adatta per altezza
      if( ratio < 1 ) {
        if( img.offsetHeight > img_available_height ) {
          // Modifica il valore di `img.offsetWidth`
          img.style.height = img_available_height + 'px';
        }

        while( img.offsetWidth > img_available_width ) {
          img.style.height = ( img_available_height - descrease ) + 'px';
          descrease += 10;
        }
      }

      // Se la larghezza dell'immagine è maggiore o uguale dell'altezza, adatta per larghezza
      else if( ratio >= 1 ) {
        if( img.offsetWidth > img_available_width ) {
          // Modifica il valore di `img.offsetHeight`
          img.style.width = img_available_width + 'px';
        }

        while( img.offsetHeight > img_available_height ) {
          img.style.width = ( img_available_width - descrease ) + 'px';
          descrease += 10;
        }
      }

      lightbox.style.width = ( img.offsetWidth + 10 ) + 'px';
      lightbox.style.height = ( img.offsetHeight + 10 ) + 'px';
      lightbox.classList.remove( 'preload' );

      // Crea/aggiorna le proprietà `o.next` e `o.prev`
      if( o.paths.length > 0 ) {
        const current = o.paths.indexOf( path );
        o.next = ( ( current + 1 ) > ( o.paths.length - 1 ) ) ? 0 : current + 1;
        o.prev = ( ( current - 1 ) < 0 ) ? ( o.paths.length - 1 ) : current - 1;
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
