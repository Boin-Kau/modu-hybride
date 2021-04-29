import { combineReducers } from "redux";
import enrollment from './enrollment';
import info from './info';


const partyReducer = combineReducers({
    enrollment,
    info
});

export default partyReducer;