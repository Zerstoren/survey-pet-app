import { Instance, types } from 'mobx-state-tree';

const MainStore = types.model({
  reloadIndex: types.optional(types.number, 0),
  isShowAddSurveyPopup: types.optional(types.boolean, false),
  searchTextMainPage: types.optional(types.string, ''),
}).actions(self => ({
  setIsShowAddSurveyPopup(isShow: boolean) {
    self.isShowAddSurveyPopup = isShow;
  },
  reloadListOnMainPage() {
    self.reloadIndex += 1;
  },
  searchOnMainPage(text: string) {
    self.searchTextMainPage = text;
  }
}));

type IMainStore = Instance<typeof MainStore>;

export type { IMainStore };
export default MainStore.create();