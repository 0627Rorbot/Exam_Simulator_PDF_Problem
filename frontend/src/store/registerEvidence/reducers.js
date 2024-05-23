export const CREATE_EVIDENCE = 'CREATE_EVIDENCE';
export const READ_EVIDENCES = 'READ_EVIDENCES';
export const UPDATE_EVIDENCE = 'UPDATE_EVIDENCE';
export const DELETE_EVIDENCE = 'DELETE_Evidence';

const initialState = {
  evidences: [],
  evidence: {
    caseId: '',
    description: '',
    date: '2000-06-10',
    file: ''
  }
};

const registerCaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVIDENCE:
      return {...state, evidence: action.payload};
    case READ_EVIDENCES:
      console.log(action.payload);
      return {...state, evidences: action.payload};
    case UPDATE_EVIDENCE:
      return {...state, evidence: action.payload};
    case DELETE_EVIDENCE:
      return {
        ...state, 
        evidence: {},
      };
    default:
      return state;
  }
};

export default registerCaseReducer;
