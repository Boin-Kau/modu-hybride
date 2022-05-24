import { combineReducers } from "redux";
import popup from './popup';
import detailPopup from './detailPopup';
import guidePopup from './guidePopup';


const containerReducer = combineReducers({
    popup,
    detailPopup,
    guidePopup
});

export default containerReducer;