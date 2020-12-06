import { observer } from 'mobx-react';
import React, { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { IPollResultsList } from '../../stores/respondent/types';
import { ISurveyQuestion } from '../../stores/surveys/types';

const Chart = ({
  question, 
  questionData
}: {
  question: ISurveyQuestion,
  questionData: IPollResultsList
}) => {
  const data = useMemo(() => {
    const answerLabels = question.answers.map((a) => a.title);
    const dataResults = question.answers.map((a) => {
      return questionData.pollResults.reduce((i, result) => {
        if (result.answerId === a.id) {
          return i + 1;
        }
        
        return i;
      }, 0);
    });

    const data = {
      labels: answerLabels,
      datasets: [
        {
          backgroundColor: "rgb(54, 201, 194, 0.2)",
          borderColor: "rgb(54, 201, 194)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: dataResults,
        },
      ],
    };

    return data;
  }, [question.answers, questionData.pollResults, questionData.pollResults.length]);
console.log(data)
  return (
    <>
      <div className="chart-item">
        <div className="chart-question-text">
          {question.title}
        </div>
        <div className="chart-block">
          <Pie data={data} width={150} height={150}  />
        </div>
      </div>
    </>
  )
}

export default observer(Chart);