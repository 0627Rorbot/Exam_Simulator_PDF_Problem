export const CREATE_CASE = 'CREATE_ITEM';
export const READ_CASE = 'READ_CASE';
export const UPDATE_CASE = 'UPDATE_CASE';
export const DELETE_CASE = 'DELETE_CASE';

const initialState = {
  casee: {
    courtId: '',
    description: '',
    date: '2000-06-10',
  }
};

const registerCaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CASE:
      return {casee: action.payload};
    case READ_CASE:
      return state;
    default:
      return state;
  }
};

export default registerCaseReducer;
