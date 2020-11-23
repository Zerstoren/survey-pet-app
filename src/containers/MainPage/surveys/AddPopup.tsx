import React from 'react';
import { inject, observer } from 'mobx-react';
import { observe } from 'mobx';
import UiPopup from '../../../components/uiBase/popup';
import { MainStore } from '../../../stores/mainState';

const AddPopup = (props: any) => {
  const {mainStore}: {mainStore: MainStore} = props;

  return (
    <UiPopup 
      title="Add new survey" 
      onClose={() => mainStore.setIsShowAddSurveyPopup(false)}
    >
      Content
    </UiPopup>
  )
}

export default inject("mainStore")(observer(AddPopup));