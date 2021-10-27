import { combineReducers } from "redux";
import enrollment from './enrollment';
import info from './info';
import popup from './popup';

const partyReducer = combineReducers({
    enrollment,
    info,
    popup
});

export default partyReducer;