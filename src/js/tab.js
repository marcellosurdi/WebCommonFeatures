/**
 * @module js/components/tab
 * @author Marcello Surdi
 * @version 1.0.0
 *
 * @desc
 * Contiene il componente **Tab**.  
 * *Un tab è un controllo grafico che organizza dei contenuti su schermate differenti.
 * I singoli tab (o panel o scheda o pannello), vengono rappresentati graficamente come dei rettangoli che contengono una breve descrizione.
 * L'attivazione di un singolo tab (mediante il clic del mouse) rende visibili i contenuti ad esso associati e contemporaneamente viene in qualche modo evidenziata la sua attivazione.
 * Di norma può essere attivato una solo tab alla volta.*
 *
 * @example
 * <!-- Esempio di codice HTML da inserire nella pagina -->
 * <div id="tab-container-id">
 *   <div class="tab-container float-container">
 *     <a href="javascript:void(0);" id="tab-content-1-opener" class="tab float-item w-4 current">Tab1</a>
 *     <a href="javascript:void(0);" id="tab-content-2-opener" class="tab float-item w-4">Tab2</a>
 *     <a href="javascript:void(0);" id="tab-content-3-opener" class="tab float-item w-4">Tab3</a>
 *   </div><!-- /.tab-container -->
 *
 *   <div id="tab-content-1" class="tab-content visible"></div>
 *
 *   <div id="tab-content-2" class="tab-content"></div>
 *
 *   <div id="tab-content-3" class="tab-content"></div>
 * </div><!-- /#tab-container-id -->
 */


/**
 * @class
 *
 * @param {string} container_id L'id dell'elemento contenitore
 */
export function Tab( container_id ) {
  // Riferimento interno a Tab
  let self = this;

  /**
   * Id dell'elemento contenitore
   * @member {string}
   */
  this.container_id = container_id;

  /**
   * Apre un tab chiudendo quello precedentemente aperto
   * @param {MouseEvent|string} e L'evento click sul tab o l'id del tab da aprire
   */
  this.open = function( e ) {
    let el, id;

    if( typeof( e ) != 'string' ) {
      el = e.currentTarget;

      if( el.classList.contains( 'current' ) ) {
        return false;
      } else {
        id = el.id.replace( '-opener', '' );
      }
    } else {
      id = e;
    }

    reset();
    set( id );
  }

  /**
   * Apre un tab a partire dall'hash della pagina
   * @param {string} id L'id del tab da aprire se l'hash di pagina non è significativo
   */
  this.setTabByHash = function( id ) {
    let default_tab = location.hash.replace( '#', '' );
    let coll_div = document.querySelectorAll( '#' + self.container_id + ' div.tab-content' );

    for( let i = 0, n = coll_div.length; i < n; i++ ) {
      if( coll_div[ i ].id == default_tab ) {
        set( default_tab );
        return;
      }
    }

    set( id );
  }

  const tab_container = document.getElementById( container_id );
  let tabs = tab_container.querySelectorAll( 'a.tab' );
  for( let i = 0, n = tabs.length; i < n; i++ ) {
    tabs[ i ].addEventListener( 'click', this.open );
  }

  /**
   * Apre un tab
   * @private
   * @param {string} id L'id del tab da aprire
   */
  function set( id ) {
    document.querySelector( 'a#' + id + '-opener' ).classList.add( 'current' );
    document.querySelector( 'div#' + id ).classList.add( 'visible' );
  }

  /**
   * Rimuove gli attributi che designano il tab corrente
   * @private
   */
  function reset() {
    let coll_a = document.querySelectorAll( '#' + self.container_id + ' a.tab' );
    let coll_div = document.querySelectorAll( '#' + self.container_id + ' div.tab-content' );

    for( let i = 0, n = coll_a.length; i < n; i++ ) {
      coll_a[ i ].classList.remove( 'current' );
      coll_div[ i ].classList.remove( 'visible' );
    }
  }
}
