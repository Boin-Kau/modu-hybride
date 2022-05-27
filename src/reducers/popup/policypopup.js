export const initialState = {
    policyPopupShow: false
};

export const PolicyPopupOpen = 'PolicyPopupOpen';
export const PolicyPopupClose = 'PolicyPopupClose';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        
        case 'PolicyPopupOpen': {
            return {
                ...state,
                policyPopupShow: true,
            }
        }
        case 'PolicyPopupClose': {
            return {
                ...state,
                policyPopupShow: false,
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