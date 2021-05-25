import { combineReducers } from "redux";
import page from './page';
import user from './user';


const infoReducer = combineReducers({
    page,
    user
});

export default infoReducer;