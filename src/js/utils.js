/**
 * @module js/utils
 * @author Marcello Surdi
 *
 * @desc
 * Libreria di funzioni condivise.
 */

import { l10n } from './l10n';

/**
 * @namespace Lang
 * @memberof module:js/utils
 */

 /**
  * @memberof module:js/utils.Lang
  * @desc
  * Recupera il codice ISO 639-1 della lingua corrente del progetto.
  *
  * @returns {string} Il codice della lingua corrente
  *
  * @see {@link https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes|List of ISO 639-1 codes}
  */
export function getCurrentLang() {
  let lang;
  const cvalue = getCookie( 'lang' );

  if( !cvalue ) {
    setCookie( 'lang', document.body.getAttribute( 'data-lang' ), 30 );
  } else {
    lang = cvalue;
  }

  return lang;
}

/**
 * @memberof module:js/utils.Lang
 * @desc
 * Traduce le stringhe di testo presenti negli elementi contrassegnati dall'attributo `data-i18n`.
 *
 * @see {@link module:js/l10n|l10n}
 */
export function translate() {
  const lang = getCurrentLang();
  const strings = l10n[ lang ];
  const coll = document.querySelectorAll( '[data-i18n]' );

  for( let i = 0, n = coll.length; i < n; i++ ) {
    let attr = coll[i].getAttribute( 'data-i18n' );
    if( attr == 'datetime' ) {
      coll[i].innerHTML = toLocaleDateTime( +coll[i].getAttribute( 'data-timestamp' ) );
    }
    else {
      coll[i].innerHTML = strings[ attr ];
    }
  }

  function toLocaleDateTime( timestamp ) {
    return new Date( timestamp ).toLocaleString( lang, { dateStyle: 'short', timeStyle: 'short' } );
  }
}





/**
 * @desc
 * Recupera il valore di un cookie in base al nome è quello passato come parametro.
 *
 * @param {string} cname Nome
 * @returns {string} Il valore del cookie o una stringa vuota
 *
 * @see {@link https://www.w3schools.com/js/js_cookies.asp|JavaScript cookies}
 */
export function getCookie( cname ) {
  let name = cname + '=';
  let ca = document.cookie.split(';');

  for( let i = 0; i < ca.length; i++ ) {
    let c = ca[ i ];
    while( c.charAt(0) == ' ' ) {
      c = c.substring( 1 );
    }

    if( c.indexOf( name ) == 0 ) {
      return c.substring( name.length, c.length );
    }
  }

  return "";
}

/**
 * Ricava le coordinate dell'elemento passato come parametro tenendo conto dello scorrimento di pagina
 *
 * @param {HTMLElement} el
 * @returns {object} `{ top: coord_y, left: coord_x }`
 */
export function getCoords( el ) {
  let context = document.querySelector( '.page' );
  let box = el.getBoundingClientRect();

  return {
    top: box.top + context.scrollTop,
    left: box.left + context.scrollLeft
  };
}

/**
 * @desc
 * Imposta un cookie con il nome, il valore ed i giorni di validità passati come parametro.
 *
 * @param {string} cname Nome
 * @param {string} cvalue Valore
 * @param {number} exdays Giorni di validità
 *
 * @see {@link https://www.w3schools.com/js/js_cookies.asp|JavaScript cookies}
 */
export function setCookie( cname, cvalue, exdays ) {
  const d = new Date();
  d.setTime( d.getTime() + ( exdays * 24 * 60 * 60 * 1000 ) );
  let expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

/**
 * @desc
 * Imposta lo scorrimento fluido di pagina all'interno di un elemento contenitore passato come parametro per tutti gli elementi `<a data-smooth>` che puntano a un'ancora.
 *
 * @param {HTMLElement} el Elemento contenitore
 *
 * @example
 * // <a href="#anchor-name" data-smooth>...</a>
 * setSmoothBehavior( document.getElementById( 'toc' ) );
 */
export function setSmoothBehavior( el ) {
  el.querySelectorAll( 'a[data-smooth]' ).forEach( ( item ) => {
    item.addEventListener( 'click', ( e ) => {
      e.preventDefault();

      const id = e.currentTarget.getAttribute( 'href' ).slice( 1 );
      const target = document.getElementById( id );
      if( target ) {
        const header = document.getElementById( 'header' );
        const h = ( header ) ? header.offsetHeight : 0;

        const box = getCoords( target );
        smoothScroll( box.top - h );
      }
    } );
  } );
}

/**
 * @desc
 * Imposta la proprietà `behavior: 'smooth'` per il metodo indicato come parametro se il browser supporta lo scorrimento fluido.
 *
 * @param {number} y Valore y
 * @param {string} [method=scrollTo]
 */
export function smoothScroll( y, method = 'scrollTo' ) {
  let context = document.querySelector( '.page' );

  if( 'scrollBehavior' in document.documentElement.style ) {
    context[ method ]( {
      left: 0,
      top: y,
      behavior: 'smooth'
    } );
  }
  else {
    context[ method ]( 0, y );
  }
}

/**
 * @desc
 * Tronca il testo di un elemento entro un numero di caratteri massimo consentito
 *
 * @param {HTMLElement} el L'elemento HTML di cui troncare il testo
 * @param {number} maxlength Il numero di caratteri massimo consentito
 */
export function truncateString( el, maxlength ) {
  if( el ) {
    let text = el.textContent;
    if( text.length > maxlength ) {
      text = text.substr( 0, ( maxlength - 1 ) ) + '…';
      el.textContent = text;
    }
  }
}
