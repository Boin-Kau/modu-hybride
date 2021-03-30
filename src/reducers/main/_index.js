import { combineReducers } from "redux";
import analysis from './analysis';
import subscribe from './subscribe';


const mainReducer = combineReducers({
    analysis,
    subscribe
});

export default mainReducer;