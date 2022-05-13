export const initialState = {
    selectedBankIdx: null,
    selectedBankAccountUserName: null,
    selectedBankAccountNum: null,
    selectedBankAccountIdx: null,
    selectedBankNameState: null, 
};

export const ResetBankAccount ='ResetBankAccount';
const UpdateBankAccount = 'UpdateBankAccount';

export const UpdateBankAccountAction = (data) => {
    return {
        type: UpdateBankAccount,
        data: data
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ResetBankAccount': {
            return initialState
        }
        case 'UpdateBankAccount': {
            return {
                ...state,
                ...action.data
            }
        }
        case 'AddBankAccountPageOpen': {
            return {
                ...state, 
                isBankAccountStatus: false,
            }
        }
        case 'AddBankAccountPageClose': {
            return {
                ...state, 
                isBankAccountStatus: false,
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