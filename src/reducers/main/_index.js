import { combineReducers } from "redux";
import alert from './alert';
import analysis from './analysis';
import subscribe from './subscribe';
import search from './search';
import enrollment from './enrollment';
import enrollmentRevise from './enrollmentRevise';
import platform from './platform';


const mainReducer = combineReducers({
    alert,
    analysis,
    subscribe,
    search,
    enrollment,
    enrollmentRevise,
    platform
});

export default mainReducer;