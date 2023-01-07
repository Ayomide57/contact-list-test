import { call, put, takeLeading } from "redux-saga/effects";
import { fetchContacts as fetchContactsApi } from '../../api/contacts/index';
import ACTIONS from '../../redux/contacts/actionTypes';


const filterJson = (data) => {
      const newnewArr = [];
      data.contacts_ids.map((contacts_id) => {
        return newnewArr.push(data.contacts[contacts_id]);
      });
return newnewArr
}

export function* getAllContacts(actions) {
  try {
        const { params } = actions;
    const response = yield call(fetchContactsApi, { ...params });
        const filterData = filterJson(response.data);
      yield put({ type: ACTIONS.FETCH_CONTACT_SUCCESS, payload: filterData });
      
  } catch (error) {
        console.log(error);
        yield put({type: ACTIONS.FETCH_CONTACT_ERROR, error});
  }
}

export function* watchAllContacts() {
  yield takeLeading(ACTIONS.FETCH_CONTACT_STARTED, getAllContacts);
}

export function* getUSContacts(actions) {
  try {

    const { params } = actions;
    const response = yield call(fetchContactsApi, { ...params });
    const filterData = filterJson(response.data);
    yield put({ type: ACTIONS.FETCH_US_CONTACT_SUCCESS, payload: filterData });
  } catch (error) {
    console.log(error);
    yield put({ type: ACTIONS.FETCH_US_CONTACT_ERROR, error });
  }
}

export function* watchUSContacts() {
  yield takeLeading(ACTIONS.FETCH_US_CONTACT_STARTED, getUSContacts);
}



