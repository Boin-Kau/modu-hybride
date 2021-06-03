export const initialState = {
    idx: null,
    name: null,
    phone: null,
    isAlert: null,
    uniqueNumber: null
};

export const UserInfoUpdate = 'UserInfoUpdate';
export const NameUpdate = 'NameUpdate';
export const PhoneUpdate = 'PhoneUpdate';
export const IsAlertUpdate = 'IsAlertUpdate';

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        case 'UserInfoUpdate': {
            return {
                ...state,
                idx: action.data.idx,
                name: action.data.name,
                phone: action.data.phone,
                isAlert: action.data.isAlert,
                uniqueNumber: action.data.uniqueNumber
            }
        }
        case 'NameUpdate': {
            return {
                ...state,
                name: action.data,
            }
        }
        case 'PhoneUpdate': {
            return {
                ...state,
                phone: action.data,
            }
        }
        case 'IsAlertUpdate': {
            return {
                ...state,
                isAlert: action.data,
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;