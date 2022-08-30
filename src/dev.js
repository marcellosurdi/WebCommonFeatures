/**
 * @module main
 *
 * @desc
 * Entry point per la modalità development
 */
 import './css/style.scss';
 import { Overlay } from './js/overlay';

document.querySelector( 'button#overlay-btn' ).addEventListener( 'click', ( e ) => {
  Overlay( true );
  setTimeout( () => { Overlay( false ) }, 2000 );
} );

document.querySelector( 'button#overlay-btn-2' ).addEventListener( 'click', ( e ) => {
  // Mostra un overlay con spinner di caricamento
  Overlay( true, true );
  setTimeout( () => { Overlay( false ) }, 2000 );
} );
