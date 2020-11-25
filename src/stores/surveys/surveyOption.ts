import { Instance, types } from "mobx-state-tree";

const SurveyOption = types.model("SurvetOption", {
  id: types.identifierNumber,
  isNew: types.optional(types.boolean, true),
  text: types.optional(types.string, ''),
  position: types.optional(types.number, 0)
}).actions(self => ({
  setText(text: string) {
    self.text = text;
  }
}));

type ISurveyOption = Instance<typeof SurveyOption>;

export type {
  ISurveyOption
};

export default SurveyOption;