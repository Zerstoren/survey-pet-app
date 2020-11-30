import { Instance, types } from "mobx-state-tree";
import { getUniqueDecrementInt } from "../../helpers/fns/math";

const SurveyAnswer = types.model("SurvetAnswer", {
  id: types.optional(types.identifierNumber, () => getUniqueDecrementInt()),
  isNew: types.optional(types.boolean, true),
  text: types.optional(types.string, ''),
  position: types.optional(types.number, 0)
}).actions(self => ({
  setText(text: string) {
    self.text = text;
  }
}));

type ISurveyAnswer = Instance<typeof SurveyAnswer>;

export type {
  ISurveyAnswer
};

export default SurveyAnswer;