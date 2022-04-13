export const initialState = {
    accountId: '',
    accountPw: '',
};

export const ResetAccount = 'ResetAccount';
const UpdateAccount = 'UpdateAccount';

export const UpdateAccountAction = (data) => {
    return {
        type: UpdateAccount,
        data: data
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ResetAccount': {
            return initialState
        }
        case 'UpdateAccount': {
            return {
                ...state,
                ...action.data
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

