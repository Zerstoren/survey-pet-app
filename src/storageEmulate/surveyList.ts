import { SELECT_TYPE } from '../stores/surveys/surveyQuestion';
import { getBySelector, getOne, insertMany, insertOne, IRecord, IReplaceIds } from './methods';

const LS_NAME_SURVEY = 'surveys';
const LS_NAME_QUESTIONS = 'surveys_questions';
const LS_NAME_OPTIONS = 'surveys_options';

interface ISurvey extends IRecord {
  title: string,
  questions: Array<number>
};

interface IQuestion extends IRecord {
  questionTitle: string,
  questionType: SELECT_TYPE,
  options: Array<number>
}

interface IOption extends IRecord {
  text: string,
  position: boolean
}

interface ISaveSurvey {
  optionsList: Array<IOption>,
  questionsList: Array<IQuestion>,
  survey: ISurvey
}

const getItemsFromStorage = async () => {
  return '';
}

const saveMetaSurvey = async (metaList: any) => {
  metaList = metaList as ISaveSurvey;

  let optionsIds = await saveOptions(metaList.optionsList);
  let questionsIds = await saveQuestions(metaList.questionsList, optionsIds);
  let surveyIds = await saveSurvey(metaList.survey, questionsIds);

  return surveyIds;
}

const getSurvey = async (id: number) => {
  return await getOne<ISurvey>(LS_NAME_SURVEY, id);
}

const loadSurvey = async () => {
  return await getBySelector<ISurvey>(LS_NAME_SURVEY, (item: ISurvey) => true)
}

const saveSurvey = (survey: ISurvey, questionsIds: IReplaceIds) => {
  return insertOne<ISurvey>(
    LS_NAME_SURVEY,
    survey,
    [
      [
        (survey: ISurvey, ids: Array<number>) => {survey.questions = ids},
        (survey: ISurvey) => survey.questions,
        questionsIds
      ]
    ]
  );
}

const saveQuestions = (questions: Array<IQuestion>, optionsIds: IReplaceIds) => {
  return insertMany<IQuestion>(
    LS_NAME_QUESTIONS,
    questions,
    [
      [
        (question: IQuestion, ids: Array<number>) => {question.options = ids},
        (question: IQuestion) => question.options,
        optionsIds
      ]
    ]
  );
}

const saveOptions = async (options: Array<IOption>) => {
  return insertMany<IOption>(
    LS_NAME_OPTIONS,
    options
  );
}

export type {
  ISaveSurvey
};
export {
  getItemsFromStorage,
  getSurvey,
  loadSurvey,
  saveMetaSurvey
};

