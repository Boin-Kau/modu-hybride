import { combineReducers } from "redux";
import analysis from './analysis';
import subscribe from './subscribe';
import search from './search';
import enrollment from './enrollment';


const mainReducer = combineReducers({
    analysis,
    subscribe,
    search,
    enrollment
});

export default mainReducer;