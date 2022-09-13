import './css/style.scss';
import './js/sidenav';
import './js/multilevelmenu';
import { alignHeader, debounceEvent } from './js/utils';


window.addEventListener( 'resize', debounceEvent( alignHeader, 10 ) );
alignHeader();
