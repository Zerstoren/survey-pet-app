import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import Question from './SurveyView/Question';
import { ISurveyItem } from '../../stores/surveys/types';

const Content = ({item}: {item: ISurveyItem}) => {
  const onSubmit = (data: any) => {
    console.log(data);
  }

  const answerNext = () => {
    setIndex(index + 1);
  }

  let [index, setIndex] = useState(0);

  return (
    <div className="d-flex justify-content-center view-outside">
      <div className="view-block">
        <div className="view-title">
          <h2>{item.title}</h2>
        </div>
          <Form 
            onSubmit={onSubmit}
            initialValues={{}}
          >
            {({handleSubmit}) => (
              <>
                <Question question={item.questions[index]} />

                <div className="view-button-next">
                  {(() => {
                    if (index + 1 === item.questions?.length) {
                      return (<button type="button" className="btn btn-primary" onClick={handleSubmit}>Finish</button>);
                    } else {
                      return (<button type="button" className="btn btn-primary" onClick={answerNext}>Next</button>);
                    }
                  })()}
                  
                </div>
              </>
            )}
          </Form>
      </div>
    </div>
  );
}

export default observer(Content);