import { inject, observer } from 'mobx-react';
import React from 'react';

const SurveyItem = (props: any) => {
  return (
    <div className="surveys-item">
      <div className="time-to-suspend">
        &#x23F0; 
        <span className="spacing"><span>01</span> D</span>
        <span className="spacing"><span>01</span> H</span>
        <span className="spacing"><span>01</span> M</span>
        <span className="spacing"><span>01</span> S</span>
      </div>

      <div className="survey-block">
        <div className="survey-title">
          Should we cycling?
        </div>
        <div className="survey-start">
          <button className="btn btn-outline-primary">Take a survey</button>
        </div>
      </div>
    </div>
  );
}

export default inject("surveyListStore")(observer(SurveyItem));