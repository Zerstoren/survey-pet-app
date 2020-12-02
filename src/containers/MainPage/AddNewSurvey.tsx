import { inject, observer } from 'mobx-react';
import React, { useMemo } from 'react';
import AddPopup from '../../components/global/popups/AddEditSurvey';
import { IMainStore } from '../../stores/mainState';
import SurveyItem from '../../stores/surveys/surveyItem';

const AddNewSurvey = ({mainStore} : {mainStore?: IMainStore}) => {
  let popupAdd: JSX.Element | null = useMemo(() : JSX.Element => {
      let newSurveyMeta = SurveyItem.create();
      return (<AddPopup itemMeta={newSurveyMeta} />)
    }, []
  );

  if (!mainStore?.isShowAddSurveyPopup) {
    popupAdd = null;
  }

  return popupAdd;
}

export default inject('mainStore')(observer(AddNewSurvey));