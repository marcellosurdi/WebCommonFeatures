import './css/style.scss';
import './js/sidenav';
import './js/megamenu';
import { InputBtns } from'./js/inputbtns';
import { Tooltips } from './js/tooltips';
import { alignHeader, debounceEvent } from './js/utils';


window.addEventListener( 'resize', debounceEvent( alignHeader, 10 ) );
alignHeader();

Tooltips();
InputBtns();
