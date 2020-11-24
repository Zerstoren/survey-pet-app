import { getSnapshot, Instance, types } from "mobx-state-tree";
import { getUniqueKey } from "../../helpers/fns/math";
import SurveyQuestion, { ISurveyQuestion, SELECT_TYPE } from "./surveyQuestion";

const SurveyItem = types.model({
  id: types.identifier,
  title: types.optional(types.string, ''),
  questions: types.array(SurveyQuestion)
}).actions(self => ({
  setTitle(title: string) {
    self.title = title;
  },
  createOption() {
    self.questions.push(SurveyQuestion.create({
      id: getUniqueKey('question_id_'),
      questionTitle: '',
      questionType: SELECT_TYPE.SINGLE
    }));
  },
  removeOption(question: ISurveyQuestion) {
    self.questions.remove(question);
  },
  save() {
    console.log(getSnapshot(self));
  }
}));

type ISurveyItem = Instance<typeof SurveyItem>

export type {
  ISurveyItem
};

export default SurveyItem;