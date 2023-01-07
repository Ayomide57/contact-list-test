import { combineReducers } from "redux";
import contacts from '../redux/contacts';

const rootReducer = combineReducers({
  contacts,
});

export default rootReducer;

