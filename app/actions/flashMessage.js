/* Action Types */
export const DID_SHOW_FLASH_MESSAGE = 'DID_SHOW_FLASH_MESSAGE';
export const DID_DISMISS_FLASH_MESSAGE = 'DID_DISMISS_FLASH_MESSAGE';


/* Action Creators */
export const didShowFlashMessage = (status, text) => {
  return {
    type: DID_SHOW_FLASH_MESSAGE,
    payload: {
      status: status,
      text: text
    }
  }
};

export const didDismissFlashMessage = (currentMessage) => {
  return {
    type: DID_DISMISS_FLASH_MESSAGE,
    message: currentMessage
  }
};



