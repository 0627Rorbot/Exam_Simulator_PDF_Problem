import { user_url } from '../../utils/urls';
import { CREATE_USER, READ_USER, UPDATE_USER, DELETE_USER } from './reducers';
import axios from 'axios';

export const createUser = async user => {
  try {
    const data = await axios.post(user_url, user)
    console.log("heloo");
    return {
      type: CREATE_USER,
      payload: data,
    }
  } catch (error) {
    console.log(error);
  }
};

export const readUser = () => ({
  type: READ_USER,
});

export const updateUser = (userId, newData) => ({
  type: UPDATE_USER,
  payload: newData,
});

export const deleteItem = userId => ({
  type: DELETE_USER,
  payload: userId,
});
