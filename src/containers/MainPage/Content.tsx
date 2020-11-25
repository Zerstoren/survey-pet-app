import { observer } from 'mobx-react';
import React, { useEffect, useMemo } from 'react';
import SurveyListStore from '../../stores/surveys/surveyList';
import SurveyList from './surveys/List';

const Content = () => {
  let surveyListStore = useMemo(() => SurveyListStore.create(), []);
  
  useEffect(() => {
    surveyListStore.loadList();
  }, [surveyListStore]);
  
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

export default observer(Content);