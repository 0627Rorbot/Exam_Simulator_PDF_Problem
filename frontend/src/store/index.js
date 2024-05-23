import { createStore, combineReducers, applyMiddleware  } from 'redux';
// import thunk from 'redux-thunk';
import registerCaseReducer from './registerCase/reducers';
import registerEvidenceReducer from './registerEvidence/reducers';
import registerUserReducer from './registerUser/reducers';
import showEvidenceReducer from './showEvidence/reducers';

const rootReducer = combineReducers({
  registerCase: registerCaseReducer,
  registerEvidence: registerEvidenceReducer,
  registerUser: registerUserReducer,
  showEvidence: showEvidenceReducer
});

const store = createStore(rootReducer);

export default store;