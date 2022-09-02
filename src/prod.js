/**
 * @module dev
 *
 * @desc
 * Entry point per la modalità production
 */
import './css/style.scss';
import './js/sidenav';
import { l10n } from './js/l10n';
import { Lightbox } from './js/lightbox';
import { Modalbox } from './js/modalbox';
import { Notification } from './js/notification';
import { Overlay } from './js/overlay';
import { Validation, ValidationMethods } from './js/validation';
import * as Utils from './js/utils';

export {
  l10n,
  Lightbox,
  Modalbox,
  Notification,
  Overlay,
  Validation,
  ValidationMethods,
  Utils
}
