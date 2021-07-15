import {createStore, combineReducers} from 'redux';

import login from './login';
import lastVisited from './lastVisited'; 
import reservation from './reservation';

const reducers = combineReducers({login,lastVisited,reservation});
const store = createStore(reducers);

export default store