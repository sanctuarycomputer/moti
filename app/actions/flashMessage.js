/* Action Types */
export const DID_SHOW_FLASH_MESSAGE = 'DID_SHOW_FLASH_MESSAGE';
export const FLASH_MESSAGE_DID_TIMEOUT = 'FLASH_MESSAGE_DID_TIMEOUT';
export const USER_DID_DISMISS_FLASH_MESSAGE = 'USER_DID_DISMISS_FLASH_MESSAGE';

/* Action Creators */
export function didShowFlashMessage() {
  return { type: DID_SHOW_FLASH_MESSAGE };
}

export function flashMessageDidTimeout() {
  return { type: FLASH_MESSAGE_DID_TIMEOUT };
}

export function userDidDismissFlashMessage() {
  return { type: USER_DID_DISMISS_FLASH_MESSAGE };
}
