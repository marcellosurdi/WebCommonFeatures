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
  },

  en: {
    'cancel': 'Cancel',
    'confirm': 'Confirm',
  },

  add: function( obj ) {
    Object.assign( this.it, obj.it );
    Object.assign( this.en, obj.en );
  }
}
