import { apiRequest } from "../apiRequests";
import { GET_CONTACTS_URL } from "../urls";

export const fetchContacts = (params) => {
  return apiRequest("GET", GET_CONTACTS_URL, params);
};

