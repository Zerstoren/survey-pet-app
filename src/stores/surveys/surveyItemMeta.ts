import { getSnapshot, Instance, types } from "mobx-state-tree";
import { getUniqueInt } from "../../helpers/fns/math";
import SurveyItem from "./surveyItem";
import SurveyOption, { ISurveyOption } from "./surveyOption";
import SurveyQuestion, { ISurveyQuestion } from "./surveyQuestion";

const SurveyItemMeta = types.model({
  survey: types.optional(SurveyItem, {id: getUniqueInt()}),
  questionsList: types.array(SurveyQuestion),
  optionsList: types.array(SurveyOption)
}).actions(self => ({
  onCreate() {
    self.survey = SurveyItem.create({id: getUniqueInt()});
  },

  createQuestion() {
    const question = SurveyQuestion.create({id: getUniqueInt()});
    self.questionsList.push(question);
    self.survey.createQuestion(question);
  },

  removeQuestion(question: ISurveyQuestion) {
    self.survey.removeQuestion(question);
    self.questionsList.remove(question);
  },

  createOption(question: ISurveyQuestion) {
    const option = SurveyOption.create({id: getUniqueInt()});
    self.optionsList.push(option);
    question.createOption(option);
  },

  removeOption(question: ISurveyQuestion, option: ISurveyOption) {
    question.removeOption(option);
    self.optionsList.remove(option);
  },

  save() {
    console.log(getSnapshot(self));
  }
}));

export type ISurveyItemMeta = Instance<typeof SurveyItemMeta>;
export default SurveyItemMeta;