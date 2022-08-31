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


// Gestione stringhe di traduzione
var obj = {
  'it': {
    'home': 'Pagina home',
    'back': 'Torna indietro',
  },
  'en': {
    'home': 'Home page',
    'back': 'Back',
  }
}

l10n.add( obj );
console.log( l10n );

// LightBox
Lightbox();

// Modalbox
document.querySelector( 'button#modalbox-btn' ).addEventListener( 'click', ( e ) => {
  Modalbox(
    'Titolo',
    'Testo di prova',
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
  Notification( 'notice', 'Testo di prova', 0, () => { console.log( "L'utente ha confermato!" ) } );
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
