import { inject, observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';
import { IMainStore } from '../../stores/mainState';
import SurveyListStore from '../../stores/surveys/surveyList';
import SurveyList from './surveys/List';

const Content = ({
  mainStore
} : {
  mainStore?: IMainStore
}) => {
  let surveyListStore = useMemo(() => SurveyListStore.create(), []);
  
  useEffect(() => {
    surveyListStore.applySearchText(mainStore?.searchTextMainPage || '');
    surveyListStore.loadList();
  }, [mainStore?.reloadIndex, mainStore?.searchTextMainPage]);
  
  return (
    <div className="content">
      <div className="block-title">
        <h4>
          Open Surveys 
          <span className="badge badge-primary">{surveyListStore.count}</span>
        </h4>
      </div>
      <SurveyList surveyListStore={surveyListStore} />
    </div> 
  );
}

export default inject('mainStore')(observer(Content));