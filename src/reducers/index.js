import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import {reducer as formReducer} from 'redux-form';

export default combineReducers({
    book: bookReducer,
    form: formReducer
});
