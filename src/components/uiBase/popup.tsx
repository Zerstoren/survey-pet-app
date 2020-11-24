import React from 'react';

const UiPopup = (props: any) => {

  const close = () => {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <div className="popup">
      <div className="popup-mask" onClick={close}>

      </div>
      <div className="popup-content">
        <div className="popup-header d-flex justify-content-between">
          <div className="popup-title">{props?.title}</div>
          <div className="popup-close" onClick={close}>&#10005;</div>
        </div>
        <div className="popup-children">
          {props.children}
          </div>
      </div>
    </div>
  )
}

export default UiPopup;