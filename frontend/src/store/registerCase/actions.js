import { CREATE_CASE, READ_CASE, UPDATE_CASE, DELETE_CASE } from './reducers';
import { case_url } from '../../utils/urls';
import axios from 'axios';

export const createCase = async casee => {
  try {
    console.log(casee);
    const data = await axios.post(case_url, casee)
    console.log(data.data);
    return {
      type: CREATE_CASE,
      payload: data.data,
    }
  } catch (error) {
    console.log(error);
  }
}

export const readCase = () => ({
  type: READ_CASE,
});

export const updateCase = (caseitemId, newData) => ({
  type: UPDATE_CASE,
  payload: { id: caseId, data: newData },
});

export const deleteItem = (caseId) => ({
  type: DELETE_CASE,
  payload: caseId,
});
