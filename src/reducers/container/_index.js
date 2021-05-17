import { combineReducers } from "redux";
import bottomNav from './bottomNav';
import message from './message';



const containerReducer = combineReducers({
    bottomNav,
    message
});

export default containerReducer;