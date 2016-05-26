/* Action Types */
export const DID_SHOW_FLASH_MESSAGE = 'DID_SHOW_FLASH_MESSAGE';
export const USER_DID_DISMISS_FLASH_MESSAGE = 'USER_DID_DISMISS_FLASH_MESSAGE';


/* Action Creators */
export const didShowFlashMessage = (messageType=idle) => {
  return {
    type: DID_SHOW_FLASH_MESSAGE,
    payload: messageType
  }
};

export const userDidDismissFlashMessage = (messageType=idle) => {
  return {
    type: USER_DID_DISMISS_FLASH_MESSAGE,
    payload: messageType
  }
};



