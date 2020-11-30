import { ISurveyItem } from '../stores/surveys/surveyItem';
import { SELECT_TYPE } from '../stores/surveys/surveyQuestion';
import { getBySelector, getOne, IGetSelectorFunction, insertMany, insertOne, IRecord, IReplaceIds } from './methods';

const LS_NAME_SURVEY = 'surveys';
const LS_NAME_QUESTIONS = 'surveys_questions';
const LS_NAME_ANSWERS = 'surveys_answers';

interface ISurvey extends IRecord {
  title: string,
  questions: Array<number>
};

interface IQuestion extends IRecord {
  questionTitle: string,
  questionType: SELECT_TYPE,
  answers: Array<number>
}

interface IAnswer extends IRecord {
  text: string,
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
  metaList = metaList as ISaveSurvey;

  let answersIds = await saveAnswers(metaList.answersList);
  let questionsIds = await saveQuestions(metaList.questionsList, answersIds);
  let surveyIds = await saveSurvey(metaList.survey, questionsIds);

  return surveyIds;
}

const getSurvey = async (id: number) => {
  return await getOne<ISurvey>(LS_NAME_SURVEY, id);
}

const loadSurvey = async (filterText: string) => {
  let filter: IGetSelectorFunction<ISurvey> = filterText ?
    (item: ISurvey) => item.title.includes(filterText) :
    (item: ISurvey) => true;

  return await getBySelector<ISurvey>(LS_NAME_SURVEY, filter);
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

const saveQuestions = (questions: Array<IQuestion>, answersIds: IReplaceIds) => {
  return insertMany<IQuestion>(
    LS_NAME_QUESTIONS,
    questions,
    [
      [
        (question: IQuestion, ids: Array<number>) => {question.answers = ids},
        (question: IQuestion) => question.answers,
        answersIds
      ]
    ]
  );
}

const saveAnswers = async (answers: Array<IAnswer>) => {
  return insertMany<IAnswer>(
    LS_NAME_ANSWERS,
    answers
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

