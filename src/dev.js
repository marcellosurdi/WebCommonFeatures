import './css/style.scss';
import './js/header';
import './js/sidenav';
import { l10n } from './js/l10n';
import { InputBtns } from'./js/inputbtns';
import { Lightbox } from './js/lightbox';
import { Modalbox } from './js/modalbox';
import { Notification } from './js/notification';
import { Overlay } from './js/overlay';
import { Tabs } from './js/tabs';
import { Tooltips } from './js/tooltips';
import { Validation } from './js/validation';
import { alignHeader, collapsible, debounceEvent, setSmoothBehavior, translate, truncateString } from './js/utils';

// Gestione stringhe di traduzione
const translation_strings = {
  'it': {
    'invalid-password': 'Password non valida',
    'mandatory-field': 'Compila tutti i campi obbligatori',
    'modalbox-text': 'Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Nulla tincidunt ante nulla, a tincidunt dui molestie vel. Aliquam orci augue, bibendum sed velit ut, interdum cursus mi.',
    'modalbox-title': 'Titolo modalbox',
    'notification-text': 'Aenean semper et nibh aliquam rutrum.',
    'submenu': 'Sotto elemento',
  },
  'en': {
    'invalid-password': 'Invalid password',
    'mandatory-field': 'Fill in all required fields',
    'modalbox-text': 'Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Nulla tincidunt ante nulla, a tincidunt dui molestie vel. Aliquam orci augue, bibendum sed velit ut, interdum cursus mi.',
    'modalbox-title': 'Modalbox title',
    'notification-text': 'Aenean semper et nibh aliquam rutrum.',
    'submenu': 'Submenu',
  }
}

l10n.add( translation_strings );
translate();

window.addEventListener( 'resize', debounceEvent( alignHeader, 10 ) );
alignHeader();

window.addEventListener( 'resize', debounceEvent( listener, 50 ) );

const h1 = document.querySelector( 'h1' );
const text = h1.textContent;
function listener() {
  const w = document.documentElement.clientWidth;
  if( w < 480 ) {
    truncateString( h1, 11 );
  }
  else {
    h1.textContent = text;
  }
}
listener();

Tooltips();
InputBtns();
Tabs();

document.querySelector( 'a#collapse' ).addEventListener( 'click', collapsible );

// Smooth behavior
setSmoothBehavior( document.getElementById( 'toc' ) );
document.querySelector( 'a#_open-menu' ).addEventListener( 'click', () => {
  document.getElementById( 'sidenav' ).open();
});

// LightBox
Lightbox( document.getElementById( 'lightbox-section' ) );

// Modalbox
document.querySelector( 'button#modalbox-btn' ).addEventListener( 'click', ( e ) => {
  Modalbox(
    'modalbox-title',
    'modalbox-text',
    () => { console.log( "L'utente ha confermato!" ); return true; },
    () => { console.log( "L'utente ha annullato!" ); }
  );
} );

document.querySelector( 'button#modalbox-btn-2' ).addEventListener( 'click', ( e ) => {
  Modalbox(
    'Lorem ipsum',
    `
      <div class="float-container form-section">
        <label for="modal-box-email">Email <span class="tooltips icon-info icon-small radius-circle xlight-grey-background text-small" data-tooltip-text="notification-text"></span></label>
        <input type="text" class="inputbtns" id="modal-box-email" data-require="checkMail" data-msg="mandatory-field">
      </div>
    `,
    ( form ) => {
      if( Validation( form, [ 'modal-box-email' ] ) ) {
        console.log( 'Invio dati!' );
        return true;
      }
      else {
        console.log( 'Si è verificato un errore!' );
      }
    },
    () => { console.log( "L'utente ha annullato!" ); }
  );

  Tooltips();
  InputBtns();
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

// Validation
document.getElementById( 'test-form' ).addEventListener( 'submit', function( e ) {
  e.preventDefault();

  if( Validation( this, [ 'text1', 'email', 'password', 'password2', 'text2', 'text3', 'text4', 'select', 'text5', 'checkbox' ] ) ) {
    console.log( 'Invio dati!' );
  }
  else {
    console.log( 'Si è verificato un errore!' );
  }
} );
