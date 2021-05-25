import { combineReducers } from "redux";
import main from './main/_index';
import party from './party/_index';
import info from './info/_index';
import container from './container/_index';

const rootReducer = combineReducers({
    main,
    party,
    info,
    container
});

export default rootReducer;