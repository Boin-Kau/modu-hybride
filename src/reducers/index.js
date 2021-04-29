import { combineReducers } from "redux";
import main from './main/_index';
import party from './party/_index';
import container from './container/_index';

const rootReducer = combineReducers({
    main,
    party,
    container
});

export default rootReducer;