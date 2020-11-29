import React from 'react';
import { Field } from 'react-final-form';
import { required } from '../../../../../helpers/validators/default';

const SurveyTitle = () => {
  return (
    <div className="form-group">
      <label>Survey title</label>
      <Field
        name="title" 
        validate={required}
      >
        {({input, meta}) => {
          let className = 'form-control';
          let errorMsg = null;
          if (meta.error && meta.touched) {
            errorMsg = (<div className="invalid-feedback">{meta.error}</div>);
            className += ' is-invalid';
          }

          return (
            <>
              <input {...input} className={className} />
              {errorMsg}
            </>
          )
        }}
      </Field>
    </div>
  );
}

export default SurveyTitle;