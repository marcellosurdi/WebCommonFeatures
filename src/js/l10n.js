/**
 * @module js/l10n
 * @author Marcello Surdi
 *
 * @desc
 * Oggetto che contiene le stringhe di traduzione
 */

export const l10n = {
  it: {
    'cancel': 'Annulla',
    'confirm': 'Conferma',
    'collapse': 'Mostra di meno',
    'expand': 'Mostra di più',
    'loading-error': 'Errore di caricamento',
  },

  en: {
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'collapse': 'Show less',
    'expand': 'Show more',
    'loading-error': 'Loading error',
  },

  add: function( obj ) {
    Object.assign( this.it, obj.it );
    Object.assign( this.en, obj.en );
  }
}
