import './css/style.scss';
import './js/sidenav';
import './js/megamenu';
import { InputBtns } from'./js/inputbtns';
import { Tooltip } from './js/tooltip';
import { alignHeader, debounceEvent } from './js/utils';


window.addEventListener( 'resize', debounceEvent( alignHeader, 10 ) );
alignHeader();

Tooltip();
InputBtns();
