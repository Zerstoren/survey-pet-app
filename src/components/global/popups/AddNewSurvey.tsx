import { inject, observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { IMainStore } from '../../../stores/mainState';
import SurveyItemMeta from '../../../stores/surveys/surveyItemMeta';
import AddPopup from '../../../containers/MainPage/surveys/AddEditSurvey';

const AddNewSurvey = ({mainStore} : {mainStore?: IMainStore}) => {
  let popupAdd: JSX.Element | null = useMemo(() : JSX.Element => {
      let newSurveyMeta = SurveyItemMeta.create();
      return (<AddPopup itemMeta={newSurveyMeta} />)
    }, [mainStore?.reloadIndex]
  );

  if (!mainStore?.isShowAddSurveyPopup) {
    popupAdd = null;
  }

  return popupAdd;
}

export default inject('mainStore')(observer(AddNewSurvey));