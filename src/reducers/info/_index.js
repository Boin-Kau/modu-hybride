import { combineReducers } from "redux";
import page from './page';


const infoReducer = combineReducers({
    page,
});

export default infoReducer;