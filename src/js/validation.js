/**
 * @module js/validation
 * @author Marcello Surdi
 *
 * @desc
 * Libreria di funzioni per la validazione dei campi di un form.
 */

import { l10n } from './l10n';
import { Notification } from './notification';
import { getCoords, getCurrentLang, smoothScrollTo } from './utils';

/**
 * @desc
 * Valida tutti i campi di un form
 *
 * @param {HTMLFormElement} form Form a cui appartengono i campi da validare
 * @param {array} fields_id_array Array di tutti gli id dei campi da validare
 * @returns {boolean} true se l'invio dei dati passa la validazione, false diversamente
 *
 * @example
 * <input type='text' data-require='minChar' data-params='2' data-msg='mandatory-field'>
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
        el.focus();
        smoothScrollTo( coords.top - 60 );
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

export const ValidationMethods = {
  minChar: function( str, min ) {
    return ( str.length < min ) ? false : true;
  },

  isChecked: function( check ) {
    return check;
  },

  checkMail: function( mail ) {
    return ( mail.match( /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/ ) ) ? true : false;
  },

  checkPassword: function( pwd ) {
    // Minimo 8 caratteri alfanumerici di cui almeno un numero ed un carattere speciale tra ! ? = . @ - _
    return ( pwd.match( /^(?=.*\d)(?=.*[!?=.@_-])[\w!?=.@_-]{8,}$/ ) ) ? true : false;
  },

  compareWith: function( value, id ) {
    return ( value == document.getElementById( id ).value ) ? true : false;
  },

  checkTelephone: function( tel_number ) {
    return ( tel_number.match( /^([0-9]{7,})$/ ) ) ? true : false;
  },

  checkITFiscalCode: function( fiscal_code ) {
    return ( fiscal_code.match( /^[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]$/ ) ) ? true : false;
  },

  checkITVAT: function( it_vat ) {
    return ( it_vat.match( /^([0-9]{11})$/ ) ) ? true : false;
  },

  isValidDate: function( date, interval ) {
    let year_min = interval[0] || 1900;
    let year_max = interval[1] || 3000;

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
    if( day > 0 && day <= month_length[month - 1] ) {
      return { 'day': day, 'month': month, 'year': year };
    }
  },
}
