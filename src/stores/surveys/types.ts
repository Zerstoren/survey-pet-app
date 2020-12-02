import { Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import SurveyItem from './surveyItem';
import SurveyQuestion from './surveyQuestion';
import SurveyAnswer from './surveyAnswer';

interface ISurveyItem extends Instance<typeof SurveyItem> {}
interface ISurveyQuestion extends Instance<typeof SurveyQuestion> {}
interface ISurveyAnswer extends Instance<typeof SurveyAnswer> {}

interface ISnapchotInSurveyItem extends SnapshotIn<typeof SurveyItem> {}
interface ISnapchotOutSurveyItem extends SnapshotOut<typeof SurveyItem> {}
 
interface ISnapchotInSurveyQuestion extends SnapshotIn<typeof SurveyQuestion> {}
interface ISnapchotOutSurveyQuestion extends SnapshotOut<typeof SurveyQuestion> {}
 
interface ISnapchotInSurveyAnswer extends SnapshotIn<typeof SurveyAnswer> {}
interface ISnapchotOutSurveyAnswer extends SnapshotOut<typeof SurveyAnswer> {}
 
export type {
  ISurveyItem,
  ISurveyQuestion,
  ISurveyAnswer,

  ISnapchotInSurveyItem,
  ISnapchotOutSurveyItem,

  ISnapchotInSurveyQuestion,
  ISnapchotOutSurveyQuestion,

  ISnapchotInSurveyAnswer,
  ISnapchotOutSurveyAnswer,
};