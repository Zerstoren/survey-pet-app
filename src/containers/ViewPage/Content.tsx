import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Form } from 'react-final-form';
import { Link } from 'react-router-dom';
import PollResults from '../../stores/respondent/pollResults';
import PollResultsList from '../../stores/respondent/pollResultsList';
import { IPollResults, IUserStore } from '../../stores/respondent/types';
import UserStore from '../../stores/respondent/user';
import { ISurveyItem } from '../../stores/surveys/types';
import Question from './SurveyView/Question';

const Content = ({item}: {item: ISurveyItem}) => {
  let [index, setIndex] = useState(0);
  let [isComplete, setComplete] = useState(false);

  const onSubmit = async (data: any) => {
    const pollResults: Array<IPollResults> = [];

    const user: IUserStore = UserStore.create({});

    Object.keys(data.question).forEach((key) => {
      const answers = data.question[key].answers;

      if (answers instanceof Array) {
        answers.forEach(answer => {
          pollResults.push(PollResults.create({
            answerId: answer,
            questionId: key,
            surveyId: item.id,
            userId: user.id,
          }));          
        });
      } else {
        pollResults.push(PollResults.create({
          answerId: answers,
          questionId: key,
          surveyId: item.id,
          userId: user.id,
        }));
      }
    });
    
    await user.create();
    await PollResultsList.create({pollResults}).save();

    setComplete(true);
  }

  const answerNext = () => {
    setIndex(index + 1);
  }

  if (isComplete) {
    return (
      <div className="d-flex justify-content-center view-outside">
        <div className="view-block">
          <div className="view-title">
            Thanks for taking the survey. <Link to="/">Go to main page</Link>
          </div>
        </div>
      </div>
    );
  }

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
                  {(() => index + 1 === item.questions?.length ?
                      (<button type="button" className="btn btn-primary" onClick={handleSubmit}>Finish</button>) :
                      (<button type="button" className="btn btn-primary" onClick={answerNext}>Next</button>)
                  )()}
                </div>
              </>
            )}
          </Form>
      </div>
    </div>
  );
}

export default observer(Content);