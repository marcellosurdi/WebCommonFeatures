/**
 * @module js/tabs
 * @author Marcello Surdi
 *
 * @desc
 * Un tab è un controllo grafico che organizza dei contenuti su schermate differenti.
 * I singoli tab (o panel o scheda o pannello), vengono rappresentati graficamente come dei rettangoli che contengono una breve descrizione.
 * L'attivazione di un singolo tab (mediante il clic del mouse) rende visibili i contenuti ad esso associati e contemporaneamente viene in qualche modo evidenziata la sua attivazione.
 * Di norma può essere attivato una solo tab alla volta.
 */

/**
 * @desc
 * Inizializza tutti i tab presenti nel documento.
 * I tab sono convertiti in accordion quando la larghezza del viewport è inferiore o uguale al valore dell'attributo `data-responsive`
 * Se si vuole in ogni caso un accordion è sufficiente impostare un valore di `data-responsive` sicuramente superiore alla larghezza del viewport.
 *
 * @see {@link https://codepen.io/amustill/pen/nbrMzN|Tab adattivi}
 *
 * @example
 * Tabs();
 */
export function Tabs() {
  [].slice.call( document.querySelectorAll( 'div.tab-container' ) ).forEach( ( container ) => {
    const responsive = +container.getAttribute( 'data-responsive' );
    window.addEventListener( 'resize', resize );
    resize();

    const placeholder = document.createElement( 'DIV' );
    placeholder.className = 'tab-placeholder';
    placeholder.addEventListener( 'animationend', ( e ) => e.currentTarget.classList.remove( 'show' ) );
    container.appendChild( placeholder );

    const tabs = container.querySelectorAll( 'a.tab' );
    tabs.forEach( ( item ) => {
      item.addEventListener( 'click', open );
    });

    tabs[0].click();

    function open( e ) {
      tabs.forEach( ( item ) => {
        ( this != item ) ? item.classList.remove( 'active' ) : item.classList.add( 'active' ) ;
      });

      placeholder.innerHTML = this.nextElementSibling.innerHTML;
      placeholder.classList.add( 'show' );
    }

    function resize( e ) {
      ( document.documentElement.clientWidth <= responsive ) ? container.classList.add( 'responsive' ) : container.classList.remove( 'responsive' );
    }
  });
}
