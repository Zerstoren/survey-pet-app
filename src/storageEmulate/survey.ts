import * as answersSql from '../sqlStorage/answers';
import * as questionsSql from '../sqlStorage/questions';
import * as surveysSql from '../sqlStorage/surveys';
import { ISnapshotOutSurveyAnswer, ISnapshotOutSurveyItem, ISnapshotOutSurveyQuestion } from '../stores/surveys/types';

const loadSurvey = async (filterText: string = '') => {
  if (filterText) {
    return await surveysSql.filterLoadList(filterText);
  }

  return await surveysSql.load();
}

const getSurvey = async (id: string) => {
  let survey = await surveysSql.getItem(id);
  let questions = await questionsSql.getItems(id);
  let answers = await answersSql.getItems(id);

  questions = questions.map((q) => {
    return {
      ...q,
      answers: answers.filter((a) => a.questionId === q.id)
    };
  })

  let snapshot = {
    ...survey,
    questions: questions
  };

  return snapshot;
}

const saveSurvey = async (survey: ISnapshotOutSurveyItem) => {
  await surveysSql.add({
    id: survey.id,
    title: survey.title
  });

  await saveQuestions(survey.questions.map(q => {
    q.surveyId = survey.id;
    return q;
  }));

  await saveAnswers(
    survey.questions.map((q) => {
      let index = 0;
      return q.answers.map(a => {
        a.position = index++;
        a.surveyId = survey.id;
        a.questionId = q.id;
        return a;
      })
    }).flat()
  );
}

const saveQuestions = (questions: Array<ISnapshotOutSurveyQuestion>) => {
  return questionsSql.addMany(questions.map((question) => ({
    id: question.id,
    surveyId: question.surveyId,
    title: question.title,
    type: question.type
  })));
}

const saveAnswers = async (answers: Array<ISnapshotOutSurveyAnswer>) => {
  return answersSql.addMany(answers.map((answer) => ({
    id: answer.id,
    surveyId: answer.surveyId,
    questionId: answer.questionId,
    position: answer.position,
    title: answer.title,
  })));
}

export {
  loadSurvey,
  saveSurvey,
  getSurvey,
};
