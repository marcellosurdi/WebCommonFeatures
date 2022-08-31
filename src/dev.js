/**
 * @module main
 *
 * @desc
 * Entry point per la modalità development
 */
 import './css/style.scss';
 import { l10n } from './js/l10n';
 import { Lightbox } from './js/lightbox';
 import { Modalbox } from './js/modalbox';
 import { Notification } from './js/notification';
 import { Overlay } from './js/overlay';
 import { smoothBehavior } from './js/utils';


// Gestione stringhe di traduzione
let obj = {
  'it': {
    'notification-text': 'Le tariffe variano di continuo, a volte anche nel corso della stessa giornata',
    'modalbox-title': 'Titolo modalbox',
    'modalbox-text': "Il noleggio auto è uno dei servizi più richiesti in ambito turistico, ma, specie per chi si ritrova a noleggiare un'auto per la prima volta, <strong>non è sempre facile intuire quali decisioni prendere per contenere i costi</strong> o, semplicemente, per evitare sgradite sorprese.",
  },
  'en': {
    'notification-text': 'Rates vary continuously, sometimes even within the same day',
    'modalbox-title': 'Modalbox title',
    'modalbox-text': "Car rental is one of the most requested services in the tourism sector, but, especially for first-time car renters, <strong>it can be difficult to guess which decisions will contain costs</strong> or simply how to avoid unpleasant surprises.",
  }
}

l10n.add( obj );
console.log( l10n );

// Smooth behavior
smoothBehavior();

// LightBox
Lightbox();

// Modalbox
document.querySelector( 'button#modalbox-btn' ).addEventListener( 'click', ( e ) => {
  Modalbox(
    'modalbox-title',
    'modalbox-text',
    () => { console.log( "L'utente ha confermato!" ); return true; },
    () => { console.log( "L'utente ha annullato!" ); }
  );
} );

// Notification
document.querySelector( 'button#notification-btn-success' ).addEventListener( 'click', ( e ) => {
  Notification( 'success', 'Testo di prova' );
} );

document.querySelector( 'button#notification-btn-warning' ).addEventListener( 'click', ( e ) => {
  Notification( 'warning', 'Testo di prova' );
} );

document.querySelector( 'button#notification-btn-notice' ).addEventListener( 'click', ( e ) => {
  Notification( 'notice', 'notification-text', 0, () => { console.log( "L'utente ha confermato!" ) } );
} );

document.querySelector( 'button#notification-btn-alert' ).addEventListener( 'click', ( e ) => {
  Notification( 'alert', 'Testo di prova' );
} );

// Overlay
document.querySelector( 'button#overlay-btn' ).addEventListener( 'click', ( e ) => {
  Overlay( true );
  setTimeout( () => { Overlay( false ) }, 2000 );
} );

document.querySelector( 'button#overlay-btn-2' ).addEventListener( 'click', ( e ) => {
  // Mostra un overlay con spinner di caricamento
  Overlay( true, true );
  setTimeout( () => { Overlay( false ) }, 2000 );
} );
