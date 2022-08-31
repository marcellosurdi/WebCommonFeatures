/**
 * @module dev
 *
 * @desc
 * Entry point per la modalità production
 */
import './css/style.scss';
import { l10n } from './js/l10n';
import { Lightbox } from './js/lightbox';
import { Modalbox } from './js/modalbox';
import { Notification } from './js/notification';
import { Overlay } from './js/overlay';
import * as Utils from './js/utils';

export { l10n, Lightbox, Modalbox, Overlay, Notification, Utils }
