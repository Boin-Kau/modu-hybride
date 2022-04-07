import { combineReducers } from "redux";
import bottomNav from './bottomNav';
import message from './message';
import loading from './loading';



const containerReducer = combineReducers({
    bottomNav,
    message,
    loading
});

export default containerReducer;