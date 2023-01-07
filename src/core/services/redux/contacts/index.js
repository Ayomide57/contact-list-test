import { createSelector } from "reselect";
import ACTIONS from './actionTypes';


// selector
const rootSelector = (state) => state.contacts;

// reselect function
export const contactSelector = createSelector(rootSelector, (contacts) =>
  contacts ? contacts : undefined
);


const reducer = (
  state = {
    isLoading: false,
    contacts: [],
    uscontacts: [],
    error: false,
  },
  action
) => {
  switch (action.type) {
    case ACTIONS.FETCH_CONTACT_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ACTIONS.FETCH_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        contacts: action.payload,
      };

    case ACTIONS.FETCH_CONTACT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    case ACTIONS.FETCH_US_CONTACT_STARTED:
      return {
        ...state,
        isLoading: true,
      };
    case ACTIONS.FETCH_US_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        uscontacts: action.payload,
      };

    case ACTIONS.FETCH_US_CONTACT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };

    default:
      return state;
  }
};

export default reducer;
