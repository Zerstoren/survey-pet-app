import React from 'react';
import SurveysOptions from '../../../../stores/surveys/surveyOptions';

import Option from './option';

const Options = (props: any) => {
  const {options}: {options: SurveysOptions} = props;

  return (
    <>
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Question" />
        <div className="input-group-append">
          <button className="btn btn-warning" type="button" id="button-addon2"> - </button>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="inlineCheckbox1" name="answer" value="radio" />
          <label className="form-check-label" htmlFor="inlineCheckbox1">One answer</label>
        </div>

        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" id="inlineCheckbox2" name="answer" value="checkbox" />
          <label className="form-check-label" htmlFor="inlineCheckbox2">Many answers</label>
        </div>
      </div>

      <div className="form-group">
        <label>Answers: </label>
        <Option />
        <Option />
        <Option />
        <Option />

        <div className="input-group input-group-sm mb-2">
          <input type="button" className="form-control form-control-sm btn btn-info" value="+" />
        </div>
      </div>

      <hr />
    </>
  )
}

export default Options;