import { all } from "redux-saga/effects";
import { watchAllContacts, watchUSContacts } from "./contacts";

export default function* rootSaga() {
  yield all([
    watchAllContacts(),
    watchUSContacts(),
  ]);
}

