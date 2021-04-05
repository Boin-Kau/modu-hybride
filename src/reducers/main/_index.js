import { combineReducers } from "redux";
import analysis from './analysis';
import subscribe from './subscribe';
import search from './search';
import enrollment from './enrollment';
import enrollmentRevise from './enrollmentRevise';


const mainReducer = combineReducers({
    analysis,
    subscribe,
    search,
    enrollment,
    enrollmentRevise
});

export default mainReducer;