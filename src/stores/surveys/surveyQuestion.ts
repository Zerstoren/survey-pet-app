import { Instance, types } from "mobx-state-tree";
import { getUniqueKey } from "../../helpers/fns/math";
import SurveyOption, { ISurveyOption } from "./surveyOption";

enum SELECT_TYPE {
  SINGLE = 'single',
  MULTI = 'multi'
}

const SurveyQuestion = types.model({
  id: types.identifier,
  questionTitle: types.string,
  questionType: types.enumeration<SELECT_TYPE>('SELECT_TYPE', [SELECT_TYPE.SINGLE, SELECT_TYPE.MULTI]),
  options: types.array(SurveyOption)
}).actions(self => ({
  createOption() {
    self.options.push(SurveyOption.create({
      id: getUniqueKey('option_id_'),
      text: '',
      position: 0
    }));
  },
  removeOption(option: ISurveyOption) {
    self.options.remove(option);
  },
  setQuestionTitle(title: string) {
    self.questionTitle = title;
  },
  setQuestionType(type: SELECT_TYPE) {
    self.questionType = type;
  }
}));

type ISurveyQuestion = Instance<typeof SurveyQuestion>;

export type {
  ISurveyQuestion
};
export {
  SELECT_TYPE
};


export default SurveyQuestion;