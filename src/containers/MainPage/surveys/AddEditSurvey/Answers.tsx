import React from 'react';
import { Field } from 'react-final-form';
import { required } from '../../../../helpers/validators/default';

const Answer = ({
  optionIndex,
  namePath,
  optionRemove,
}: {
  optionIndex: number,
  namePath: string,
  optionRemove: Function
}) => {
  return (
    <Field
      name={`${namePath}.text`}
      validate={required}
    >
      {({input, meta}) => {
        let classNameGroup = 'input-group input-group-sm';
        let classNameInput = 'form-control form-control-sm';
        let errorMsg = null;
        if (meta.error && meta.touched) {
          errorMsg = (<div className="invalid-feedback mb-2">{meta.error}</div>);
          classNameInput += ' is-invalid';
          classNameGroup += ' is-invalid';
        } else {
          classNameGroup += ' mb-2';
        }

        return (
          <>
            <div className={classNameGroup}>
              <div className="input-group-prepend">
                <div className="input-group-text">{optionIndex + 1}</div>
                <button className="btn btn-warning" type="button" onClick={() => optionRemove()}> - </button>
              </div>
                <input {...input} className={classNameInput} />
            </div>
            {errorMsg}
          </>
        )
      }}
    </Field>
  );
}

export default Answer;