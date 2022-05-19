import { combineReducers } from "redux";
import popup from './popup';
import detailPopup from './detailPopup';


const containerReducer = combineReducers({
    popup,
    detailPopup
});

export default containerReducer;