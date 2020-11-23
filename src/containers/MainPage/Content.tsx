import React from 'react';
import SurveyList from './surveys/List';

const Content = () => {

  return (
    <div className="content">
      <div className="block-title">
        <h4>
          Open Surveys 
          <span className="badge badge-primary">4</span>
        </h4>
      </div>
      <SurveyList />
    </div> 
  );
}

export default Content;