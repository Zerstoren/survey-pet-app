import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import SurveyItem from './surveyItem';
import SurveyQuestion from './surveyQuestion';
import SurveyAnswer from './surveyAnswer';
import SurveyListStore from './surveyList';

interface ISurveyItem extends Instance<typeof SurveyItem> {}
interface ISurveyQuestion extends Instance<typeof SurveyQuestion> {}
interface ISurveyAnswer extends Instance<typeof SurveyAnswer> {}
interface ISurveyListStore extends Instance<typeof SurveyListStore> {}

interface ISnapshotInSurveyItem extends SnapshotIn<typeof SurveyItem> {}
interface ISnapshotOutSurveyItem extends SnapshotOut<typeof SurveyItem> {}
 
interface ISnapshotInSurveyQuestion extends SnapshotIn<typeof SurveyQuestion> {}
interface ISnapshotOutSurveyQuestion extends SnapshotOut<typeof SurveyQuestion> {}
 
interface ISnapshotInSurveyAnswer extends SnapshotIn<typeof SurveyAnswer> {}
interface ISnapshotOutSurveyAnswer extends SnapshotOut<typeof SurveyAnswer> {}
 
export type {
  ISurveyItem,
  ISurveyQuestion,
  ISurveyAnswer,
  ISurveyListStore,

  ISnapshotInSurveyItem as ISnapshotInSurveyItem,
  ISnapshotOutSurveyItem as ISnapshotOutSurveyItem,

  ISnapshotInSurveyQuestion as ISnapshotInSurveyQuestion,
  ISnapshotOutSurveyQuestion as ISnapshotOutSurveyQuestion,

  ISnapshotInSurveyAnswer as ISnapshotInSurveyAnswer,
  ISnapshotOutSurveyAnswer as ISnapshotOutSurveyAnswer,
};