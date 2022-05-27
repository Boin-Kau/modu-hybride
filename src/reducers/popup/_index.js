import { combineReducers } from "redux";
import popup from './popup';
import detailPopup from './detailPopup';
import guidePopup from './guidePopup';
import policyPopup from './policypopup';


const containerReducer = combineReducers({
    popup,
    detailPopup,
    guidePopup,
    policyPopup
});

export default containerReducer;