export const CREATE_USER = 'CREATE_USER';
export const READ_USER = 'READ_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

const initialState = {
  user: {
    id: '',
    address: '',
    date: '2000-06-10',
    id_proof: ''
  }
};

const registerCaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {user: action.payload};
    case READ_USER:
      return state;
    default:
      return state;
  }
};

export default registerCaseReducer;
