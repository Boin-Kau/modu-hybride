import { combineReducers } from "redux";
import alert from './alert';
import analysis from './analysis';
import subscribe from './subscribe';
import search from './search';
import enrollment from './enrollment';
import enrollmentRevise from './enrollmentRevise';


const mainReducer = combineReducers({
    alert,
    analysis,
    subscribe,
    search,
    enrollment,
    enrollmentRevise
});

export default mainReducer;