import { flow, getSnapshot, Instance, types } from "mobx-state-tree";
import { getUniqueDecrementInt } from "../../helpers/fns/math";
import { saveMetaSurvey } from "../../storageEmulate/surveyList";
import SurveyItem from "./surveyItem";
import SurveyOption from "./surveyOption";
import SurveyQuestion, { ISurveyQuestion } from "./surveyQuestion";

const SurveyItemMeta = types.model({
  survey: types.optional(SurveyItem, {id: getUniqueDecrementInt()}),
  questionsList: types.array(SurveyQuestion),
  optionsList: types.array(SurveyOption)
}).actions(self => {
  const createQuestion = () => {
    const question = SurveyQuestion.create();
    self.questionsList.push(question);
    self.survey.createQuestion(question);
  }

  const createOption = (question: ISurveyQuestion) => {
    const option = SurveyOption.create();
    self.optionsList.push(option);
    question.createOption(option);
  }

  const save = flow(function*() {
    let snapshot = getSnapshot(self);

    try {
      yield saveMetaSurvey(snapshot);
    } catch (e) {
      debugger;
    }

    return 1;
  });

  return {
    createQuestion,
    createOption,
    save,
  }
});

export type ISurveyItemMeta = Instance<typeof SurveyItemMeta>;
export default SurveyItemMeta;