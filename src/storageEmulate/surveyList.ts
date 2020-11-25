import ls from 'localforage';
import { SELECT_TYPE } from '../stores/surveys/surveyQuestion';

const LS_NAME_SURVEY = 'surveys';
const LS_NAME_QUESTIONS = 'surveys_questions';
const LS_NAME_OPTIONS = 'surveys_options';

const getItemsFromStorage = () => {
  // return ls.getItem(LS_NAME);
  return Promise.reject('shit')
}

interface ISurvey {
  id: number,
  isNew: boolean,
  title: string,
  question: Array<number>
};

interface IQuestion {
  id: number,
  isNew: boolean,
  questionTitle: string,
  questionType: SELECT_TYPE,
  options: Array<number>
}

interface IOption {
  id: number,
  isNew: boolean,
  text: string,
  position: boolean
}

interface ISaveSurvey {
  optionsList: Array<IOption>,
  questionList: Array<IQuestion>,
  survey: ISurvey
}

function* saveMetaSurvey(metaList: any) {
  yield saveSurvey(metaList.survey);
  // yield saveQuestions(metaList.questionList);
  // yield saveOptions(metaList.optionsList);
}

function* saveSurvey (survey: ISurvey) {
  let result = ls.getItem(LS_NAME_SURVEY)

  debugger;
}

function* saveQuestions (question: Array<IQuestion>) {

}

function* saveOptions (options: Array<IOption>) {

}

export type {
  ISaveSurvey
}

export {
  getItemsFromStorage,
  saveMetaSurvey
}