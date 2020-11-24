import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { ISurveyOption } from '../../../../stores/surveys/surveyOption';

const Option = (props: any) => {
  const {
    option,
    position,
    optionRemove
  } : {
    option: ISurveyOption,
    position: number,
    optionRemove: Function
  } = props;

  const [text, setText] = useState(option.text || '');

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    option.setText(e.target.value);
    setText(e.target.value);
  }

  return (
    <div className="input-group input-group-sm mb-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{position}</div>
        <button className="btn btn-warning" type="button" onClick={() => optionRemove(option)}> - </button>
      </div>
      <input type="text" className="form-control form-control-sm" id="inlineFormInputGroup" value={text} onChange={onChangeText} />
    </div>
  )
}

export default observer(Option);