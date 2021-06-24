import {createStore, combineReducers} from 'redux';

import login from './login';
import lastVisited from './lastVisited';

const reducers = combineReducers({login,lastVisited});
const store = createStore(reducers);

export default store