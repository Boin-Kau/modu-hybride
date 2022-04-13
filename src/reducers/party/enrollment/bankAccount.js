export const initialState = {
    selectedBankIdx: null,
    selectedBankAccountUserName: null,
    selectedBankAccountNum: null,

    selectedBankAccountIdx: null, 
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
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;