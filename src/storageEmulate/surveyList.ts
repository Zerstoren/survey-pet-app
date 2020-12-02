import { SELECT_TYPE } from '../stores/surveys/surveyQuestion';
import { IRecord } from './methods';
import * as surveysSql from '../sqlStorage/surveys';
import * as questionsSql from '../sqlStorage/questions';
import * as answersSql from '../sqlStorage/answers';
import { ISnapchotInSurveyItem, ISnapchotOutSurveyAnswer, ISnapchotOutSurveyItem, ISnapchotOutSurveyQuestion, ISurveyAnswer, ISurveyItem, ISurveyQuestion } from '../stores/surveys/types';

interface ISurvey extends IRecord {
  id: string,
  title: string,
  questions: Array<IQuestion>
};

interface IQuestion extends IRecord {
  id: string,
  surveyId: string,
  title: string,
  type: SELECT_TYPE,
  answers: Array<IAnswer>
}

interface IAnswer extends IRecord {
  id: string,
  surveyId: string,
  questionId: string,
  title: string,
  position: boolean
}

interface ISaveSurvey {
  answersList: Array<IAnswer>,
  questionsList: Array<IQuestion>,
  survey: ISurvey
}

const getItemsFromStorage = async () => {
  return '';
}

const saveMetaSurvey = async (metaList: any) => {
}

const getSurvey = async (id: number) => {
}

const loadSurvey = async (filterText: string) => {
}

const saveSurvey = async (survey: ISnapchotOutSurveyItem) => {
  await surveysSql.add({
    id: survey.id,
    title: survey.title
  });

  await saveQuestions(survey.questions);
  await saveAnswers(
    survey.questions.map((q) => q.answers).flat()
  );
}

const saveQuestions = (questions: Array<ISnapchotOutSurveyQuestion>) => {
  return questionsSql.addMany(questions.map((question) => ({
    id: question.id,
    surveyId: question.surveyId,
    title: question.title,
    type: question.type
  })));
}

const saveAnswers = async (answers: Array<ISnapchotOutSurveyAnswer>) => {
  return answersSql.addMany(answers.map((answer) => ({
    id: answer.id,
    position: 0,
    surveyId: answer.surveyId,
    questionId: answer.questionId,
    title: answer.title,
  })));
}

export type {
  ISaveSurvey
};
export {
  getItemsFromStorage,
  getSurvey,
  loadSurvey,
  saveSurvey,
  saveMetaSurvey
};