import { CREATE_ITEM, READ_ITEM, UPDATE_ITEM, DELETE_ITEM } from './reducers';
import axios from 'axios';

export const createItem = (item) => ({
  type: CREATE_ITEM,
  payload: item,
});

export const readItem = () => ({
  type: READ_ITEM,
});

export const updateItem = (itemId, newData) => ({
  type: UPDATE_ITEM,
  payload: { id: itemId, data: newData },
});

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId,
});
