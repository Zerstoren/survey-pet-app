import { Instance, types } from "mobx-state-tree";
import { getUniqueKey } from "../../helpers/fns/math";

const SurveyOption = types.model({
  id: types.identifier,
  text: types.string,
  position: types.number
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