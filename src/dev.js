/**
 * @module main
 *
 * @desc
 * Entry point per la modalità development
 */
 import './css/style.scss';
 import { Notification } from './js/notification';
 import { Overlay } from './js/overlay';

// Notification
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
