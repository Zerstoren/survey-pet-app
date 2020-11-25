import { getSnapshot, Instance, types } from "mobx-state-tree";
import { getUniqueInt } from "../../helpers/fns/math";
import SurveyQuestion, { ISurveyQuestion } from "./surveyQuestion";

const SurveyItem = types.model("Survey", {
  id: types.identifierNumber,
  isNew: types.optional(types.boolean, true),
  title: types.optional(types.string, ''),
  questions: types.array(types.reference(SurveyQuestion)),
}).actions(self => {
  const afterCreate = () => {
    if (self.questions.length === 0) {
      // createOption();
    }
  };

  const setTitle = (title: string) => {
    self.title = title;
  }

  const createQuestion = (question: ISurveyQuestion) => {
    self.questions.push(question);
  }
  
  const removeQuestion = (question: ISurveyQuestion) => {
    self.questions.remove(question);
  }

  const save = () => {
    console.log(getSnapshot(self));
  }

  return {
    afterCreate,
    setTitle,
    createQuestion,
    removeQuestion,
    save,
  };
});

type ISurveyItem = Instance<typeof SurveyItem>

export type {
  ISurveyItem
};

export default SurveyItem;