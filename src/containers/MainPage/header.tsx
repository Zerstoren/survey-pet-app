import { inject } from 'mobx-react';
import React from 'react';
import { SurveyListStore } from '../../state/surveyList';
import BreadCrumbs from './breadcrumbs';

export default inject("surveyListStore")(() => {
  return (
    <>
      <div className="header d-flex justify-content-between">
        <div className="left-side">
          <BreadCrumbs />
        </div>
        <div className="right-side d-flex justify-content-end align-items-center">
          <div className="search">&#128269;</div>
          <div className="new-survey">
            <button className="btn btn-outline-primary">New survey</button>
          </div>
        </div>
      </div>   


      <div className="content">
        <div className="block-title">
          <h4>
            Open Surveys 
            <span className="badge badge-primary">4</span>
          </h4>
        </div>

        <div className="surveys-list">
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
                <button className="btn btn-outline-primary">Vote</button>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </>
  )
})