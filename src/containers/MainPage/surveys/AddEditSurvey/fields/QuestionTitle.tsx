import React from 'react';
import { Field } from 'react-final-form';
import { required } from '../../../../../helpers/validators/default';

const QuestionTitle = ({namePath, onQuestionRemove}: {namePath: string, onQuestionRemove: Function}) => {
  return (
    <Field
      name={`${namePath}.title`}
      validate={required}
    >
      {({input, meta}) => {
        let classNameGroup = 'input-group';
        let classNameInput = 'form-control';
        let errorMsg = null;
        if (meta.error && meta.touched) {
          errorMsg = (<div className="invalid-feedback mb-3">{meta.error}</div>);
          classNameInput += ' is-invalid';
          classNameGroup += ' is-invalid';
        } else {
          classNameGroup += ' mb-3';
        }

        return (
          <>
            <div className={classNameGroup}>
              <input {...input} className={classNameInput} />
              <div className="input-group-append">
                <button className="btn btn-warning" type="button" onClick={() => onQuestionRemove()}> - </button>
              </div>
            </div>
            {errorMsg}
          </>
        )
      }}
    </Field>
  );
}

export default QuestionTitle;