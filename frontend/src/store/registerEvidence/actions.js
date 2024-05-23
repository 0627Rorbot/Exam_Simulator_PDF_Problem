import { CREATE_EVIDENCE, READ_EVIDENCES, UPDATE_EVIDENCE, DELETE_EVIDENCE } from './reducers';
import { evidence_url } from "../../utils/urls";
import { evidences_url } from "../../utils/urls";
import axios from 'axios';

export const createEvidence = async evidence => {
  try {
    console.log(evidence);
    const data = await axios.post(evidence_url, evidence)
    return {
      type: CREATE_EVIDENCE,
      payload: data.data,
    }
  } catch (error) {
    console.log(error);
  }
}

export const readEvidences = async () => {
  try {
    const data = await axios.post(evidences_url)
    return {
      type: READ_EVIDENCES,
      payload: data.data,
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateEvidence = (evidenceId, newData) => ({
  type: UPDATE_EVIDENCE,
  payload: { id: evidenceId, data: newData },
});

export const deleteEvidence = evidenceId => ({
  type: DELETE_EVIDENCE,
  payload: evidenceId,
});
