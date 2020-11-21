import { configureStore } from "@reduxjs/toolkit";

interface IRootStore {

}

const store = configureStore({
  reducer: {
  }
});

export default store;
export type {
  IRootStore
}