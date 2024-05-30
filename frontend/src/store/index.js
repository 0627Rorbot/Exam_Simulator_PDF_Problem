import { createStore, combineReducers, applyMiddleware  } from 'redux';
// import thunk from 'redux-thunk';
import registerUserReducer from './registerUser/reducers';
import showEvidenceReducer from './showEvidence/reducers';

const rootReducer = combineReducers({
  registerUser: registerUserReducer,
  showEvidence: showEvidenceReducer
});

const store = createStore(rootReducer);

export default store;