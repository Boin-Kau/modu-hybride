import { combineReducers } from "redux";
import platform from './platform';
import account from './account';
import partyInfo from './partyInfo';
import payment from './payment';
import bankAccount from './bankAccount';
import setPage from './setPage';


const partyEnrollmentReducer = combineReducers({
    platform,
    account,
    partyInfo,
    payment,
    bankAccount,
    setPage,
});

export default partyEnrollmentReducer;

