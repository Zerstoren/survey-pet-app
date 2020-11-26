import { observer } from 'mobx-react';
import React from 'react';
import { Link as NavLink } from 'react-router-dom';
import { ISurveyItem } from '../../../stores/surveys/surveyItem';

const SurveyItem = ({survey}: {survey: ISurveyItem}) => {
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
          {survey.title}
        </div>
        <div className="survey-start">
          <NavLink to={`/survey/${survey.id}`}>
            <button className="btn btn-outline-primary">
                Take a survey
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default observer(SurveyItem);