export const initialState = {
    originalPrice: null,
    nextPaymentDate: null,
    pricePerPerson: null,
    personnel: 0,
    typeList: [],
    formatDate: ''
};

export const ResetPayment = 'ResetPayment';
const UpdatePayment = 'UpdatePayment';

export const UpdatePaymentAction = (data) => {
    return {
        type: UpdatePayment,
        data: data
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ResetPayment': {
            return initialState
        }
        case 'UpdatePayment': {
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