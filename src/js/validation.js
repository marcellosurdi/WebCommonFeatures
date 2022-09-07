/**
 * @module js/validation
 * @author Marcello Surdi
 *
 * @desc
 * La validazione si occupa di verificare la correttezza dei dati inseriti dall'utente in un form sulla base del confronto con regole predefinite.
 */

import { l10n } from './l10n';
import { Notification } from './notification';
import { getCoords, getCurrentLang, smoothScroll } from './utils';

/**
 * @desc
 * Valida tutti i campi di un form
 *
 * @param {HTMLFormElement} form Form a cui appartengono i campi da validare
 * @param {array} fields_id_array Array che contiene tutti gli id dei campi del form da validare
 * @returns {boolean} `true` se l'invio dei dati passa la validazione, `false` diversamente
 *
 * @see {@linkcode module:js/utils.getCoords|getCoords}
 * @see {@linkcode module:js/utils.Lang.exports.getCurrentLang|getCurrentLang}
 * @see {@linkcode module:js/utils.smoothScroll|smoothScroll}
 * @see {@linkcode module:js/validation~ValidationMethods|ValidationMethods}
 * @requires {@linkcode module:js/l10n|l10n}
 * @requires {@linkcode module:js/notification|Notification}
 *
 * @example
 * // <input type='text' id='text-field' data-require='minChar' data-params='2' data-msg='mandatory-field'>
 * if( Validation( form, [ 'text-field' ] ) ) { console.log( 'Invio dati!' ); }
 */
export function Validation( form, fields_id_array ) {
  const l = fields_id_array.length;
  let error = false;

  for( let i = 0; i < l; i++ ) {
    let el = form.querySelector( '#' + fields_id_array[ i ] );
    let tag = el.tagName.toUpperCase();
    let value = '';

    switch( tag ) {
      case 'INPUT':
        if( el.type == 'checkbox' ) {
          value = el.checked;
        } else {
          value = el.value.replace( /(<([^>]+)>)/ig, '' );
        }
      break;
      case 'SELECT':
        value = el.options[ el.selectedIndex ].value;
      break;
      case 'TEXTAREA':
        value = el.value.replace( /(<([^>]+)>)/ig, '' );
      break;
    }

    const method = el.getAttribute( 'data-require' );
    const params = getParams( el.getAttribute( 'data-params' ) );
    const message = el.getAttribute( 'data-msg' );
    const coords = getCoords( el.parentElement );

    if( !error && method && !ValidationMethods[method]( value, params ) ) {
      setTimeout( function() {
        const notification = document.getElementById( 'notification' );
        const h = ( notification ) ? notification.offsetHeight + 10 : 0;

        el.focus();
        smoothScroll( coords.top - h );
      }, 0 );

      el.parentElement.classList.add( 'error' );
      setTimeout( function() { el.parentElement.classList.remove( 'error' ); }, 4000 );

      Notification( 'alert', l10n[ getCurrentLang() ][ message ], 4000 );

      error = true;
    }
    else {
      el.parentElement.classList.remove( 'error' );
    }
  }

  return ( !error ) ? true : false;

	function getParams( params ) {
		return ( params && params.indexOf( ',' ) != -1 ) ? params.split( ',' ) : params;
	}
}





/**
 * @namespace ValidationMethods
 *
 * @desc
 * Libreria di funzioni per la validazione dei campi di un form.
 */
export const ValidationMethods = {
  /**
   * @desc
   * Verifica che un campo di testo contenga un codice fiscale italiano valido.
   *
   * @param {string} fiscal_code Codice fiscale da validare
   * @returns {boolean} `true` se il codice fiscale passa la validazione, `false` diversamente
   */
  checkITFiscalCode: function( fiscal_code ) {
    return ( fiscal_code.match( /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/ ) ) ? true : false;
  },

  /**
   * @desc
   * Verifica che un campo di testo contenga una Partita IVA italiana valida.
   *
   * @param {string} it_vat Partita IVA da validare
   * @returns {boolean} `true` se la partita IVA passa la validazione, `false` diversamente
   */
  checkITVAT: function( it_vat ) {
    return ( it_vat.match( /^([0-9]{11})$/ ) ) ? true : false;
  },

  /**
   * @desc
   * Verifica che un campo di testo contenga un'email valida.
   *
   * @param {string} mail Email da validare
   * @returns {boolean} `true` se l'email passa la validazione, `false` diversamente
   */
  checkMail: function( mail ) {
    return ( mail.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/ ) ) ? true : false;
  },

  /**
   * @desc
   * Verifica che un campo di testo contenga una password valida.
   * Per essere valida la password deve contenere un **minimo di 8 caratteri alfanumerici** di cui almeno un numero ed un carattere speciale tra ! ? = . @ - _
   *
   * @param {string} pwd Password da validare
   * @returns {boolean} `true` se la password passa la validazione, `false` diversamente
   */
  checkPassword: function( pwd ) {
    return ( pwd.match( /^(?=.*\d)(?=.*[!?=.@_-])[\w!?=.@_-]{8,}$/ ) ) ? true : false;
  },

  /**
   * @desc
   * Verifica che un campo di testo contenga un numero di telefono valido.
   * Per essere valido convenzionalmente il numero di telefono deve contenere un **minimo di 7 numeri**
   *
   * @param {string} tel_number Numero di telefono da validare
   * @returns {boolean} `true` se il numero di telefono passa la validazione, `false` diversamente
   */
  checkTelephone: function( tel_number ) {
    return ( tel_number.match( /^([0-9]{7,})$/ ) ) ? true : false;
  },

  /**
   * @desc
   * Verifica che il valore di un campo di testo sia uguale al valore di un secondo campo di testo indicato dal parametro `id`.
   *
   * @param {string} value Valore del primo campo di testo
   * @param {string} id id del secondo campo di testo
   * @returns {boolean} `true` se l'uguaglianza è verificata, `false` diversamente
   */
  compareWith: function( value, id ) {
    return ( value == document.getElementById( id ).value ) ? true : false;
  },

  /**
   * @desc
   * Verifica che un campo di tipo `radio` o `checkbox` sia selezionato.
   *
   * @param {boolean} check Il valore della proprietà `checked` del campo da validare
   * @returns {boolean} `true` se la stringa passa la validazione, `false` diversamente
   */
  isChecked: function( check ) {
    return check;
  },

  /**
   * @desc
   * Verifica che una data sia valida e compresa in un intervallo di anni definito dal parametro `interval`.
   *
   * @param {string} date Data in formato stringa dd/mm/yyyy
   * @param {array} [interval=[1900,3000]] Array che definisce l'intervallo di anni
   * @returns {object|boolean} Un oggetto `{ 'day': day, 'month': month, 'year': year }` se la data passa la validazione, `false` diversamente
   */
  isValidDate: function( date, interval = [ 1900, 3000 ] ) {
    let year_min = interval[0];
    let year_max = interval[1];

    // Verifica che il parametro date sia corretto
    if( !/^\d{1,2}\/\d{1,2}\/\d{4}$/.test( date ) ) {
      return false;
    }

    // Scompone la data in giorni, mesi, anno
    let array = date.split( '/' );
    let day = parseInt( array[0], 10 );
    let month = parseInt( array[1], 10 );
    let year = parseInt( array[2], 10 );

    // Verifica la validità di mese e anno
    if( month == 0 || month > 12 || year < year_min || year > year_max ) {
      return false;
    }

    let month_length = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Stabilisce se l'anno è bisestile
    // Nel calendario gregoriano sono bisestili:
    // - gli anni secolari il cui numero è divisibile per 400;
    // - gli anni non secolari il cui numero è divisibile per 4.
    if( year % 400 == 0 || ( year % 100 != 0 && year % 4 == 0 ) ) {
      month_length[1] = 29;
    }

    // Verifica la validità dei giorni
    if( day > 0 && day <= month_length[ month - 1 ] ) {
      return { 'day': day, 'month': month, 'year': year };
    }
    return false;
  },

  /**
   * @desc
   * Verifica che un campo di testo contenga un numero minimo di caratteri definito dal parametro `min`.
   *
   * @param {string} str Stringa da validare
   * @param {number} min Numero minimo di caratteri che devono comporre la stringa da validare
   * @returns {boolean} `true` se la stringa passa la validazione, `false` diversamente
   */
  minChar: function( str, min ) {
    return ( str.length < min ) ? false : true;
  },
}
