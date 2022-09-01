/**
 * @module js/utils
 * @author Marcello Surdi
 *
 * @desc
 * Libreria di funzioni condivise.
 */

 /**
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
 * @desc
 * Imposta lo scorrimento fluido di pagina per tutti gli elementi `<a data-smooth>` che puntano a un'ancora dell'elemento contenitore passato come parametro.
 *
 * @param {HTMLElement} el Elemento contenitore
 *
 * @example
 * <a href="#anchor-name" data-smooth>...</a>
 */
export function setSmoothBehavior( el ) {
  el.querySelectorAll( 'a[data-smooth]' ).forEach( ( item ) => {
    item.addEventListener( 'click', ( e ) => {
      e.preventDefault();

      const id = e.currentTarget.getAttribute( 'href' ).slice( 1 );
      const target = document.getElementById( id );
      if( target ) {
        const box = getCoords( target );
        smoothScrollTo( box.top )
      }
    } );
  } );
}

/**
 * @desc
 * Modifica la chiamata al metodo `window.scrollTo` in base al supporto del browser per lo scorrimento fluido.
 *
 * @param {number} ycoord Coordinata y
 */
export function smoothScrollTo( ycoord ) {
  if( 'scrollBehavior' in document.documentElement.style ) {
    window.scrollTo( {
      left: 0,
      top: ycoord,
      behavior: 'smooth'
    } );
  }
  else {
    window.scrollTo( 0, ycoord );
  }
}

/**
 * Ricava le coordinate dell'elemento passato come parametro tenendo conto dello scorrimento di pagina
 *
 * @param {HTMLElement} el
 * @returns {object}
 */
export function getCoords( el ) {
  let box = el.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
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
