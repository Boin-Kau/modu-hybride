export const initialState = {
    idx: null,
    name: null,
    phone: null,
    isAlert: null,
    isMarketing: null,
    marketingUpdatedAt: null,
    uniqueNumber: null,
    isAuth: null,
    isAdult: null
};

export const UserInfoUpdate = 'UserInfoUpdate';
export const NameUpdate = 'NameUpdate';
export const PhoneUpdate = 'PhoneUpdate';
export const IsAlertUpdate = 'IsAlertUpdate';
export const IsMarketingUpdate = 'IsMarketingUpdate';

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        case 'UserInfoUpdate': {

            let date = new Date(action.data.isMarketingUpdatedAt);

            let year = date.getFullYear();
            let month = new String(date.getMonth() + 1);
            let day = new String(date.getDate());

            // 한자리수일 경우 0을 채워준다. 
            if (month.length == 1) {
                month = "0" + month;
            }
            if (day.length == 1) {
                day = "0" + day;
            }

            const updatedAt = year + '-' + month + '-' + day;

            return {
                ...state,
                idx: action.data.idx,
                name: action.data.name,
                phone: action.data.phone,
                isAlert: action.data.isAlert,
                isMarketing: action.data.isMarketing,
                marketingUpdatedAt: updatedAt,
                uniqueNumber: action.data.uniqueNumber,
                isAuth: action.data.isAuth,
                isAdult: action.data.isAdult
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
        case 'IsMarketingUpdate': {
            return {
                ...state,
                isMarketing: action.data.isMarketing,
                marketingUpdatedAt: action.data.marketingUpdatedAt
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