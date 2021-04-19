import { combineReducers } from "redux";
import main from './main/_index';
import container from './container/_index';

const rootReducer = combineReducers({
    main,
    container
});

export default rootReducer;