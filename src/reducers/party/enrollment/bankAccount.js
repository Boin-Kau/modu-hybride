export const initialState = {
    bankIdx: null,
    bankAccountUserName: null,
    bankAccountNum: null,

    bankAccountIdx: null, 
};

export const ResetBankAccount = 'ResetBankAccount';
export const UpdateBankAccount = 'UpdateBankAccount';

export const UpdateBankAccountIdx = 'UpdateBankAccountIdx';
export const ResetBankAccountIdx = 'ResetBankAccountIdx';

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ResetBankAccount': {
            return {
                ...state,
                bankIdx: null,
                bankAccountUserName: null,
                bankAccountNum: null,
            }
        }
        case 'UpdateBankAccount': {
            return {
                ...state,
                bankIdx: action.data.bankIdx,
                bankAccountUserName: action.data.bankAccountUserName,
                bankAccountNum: action.data.bankAccountNum,
            }
        }
        case 'UpdateBankAccountIdx': {
            return {
                ...state,
                bankAccountIdx: action.data.bankAccountIdx,
            }
        }
        case 'ResetBankAccountIdx': {
            return {
                ...state,
                bankAccountIdx: null,
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