// actionTypes.js
export const CREATE_ITEM = 'CREATE_ITEM';
export const READ_ITEM = 'READ_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

const initialState = {
  items: [],
};

const registerCaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case READ_ITEM:
      // Fetch items from API or return state as needed
      return state;
    case UPDATE_ITEM:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.data } : item
        ),
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default registerCaseReducer;
