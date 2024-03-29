import { combineReducers } from "redux";
import enrollment from './enrollment/_index';
import info from './info';
import popup from './popup';
import detail from './detail';

const partyReducer = combineReducers({
    detail,
    enrollment,
    info,
    popup,
});

export default partyReducer;