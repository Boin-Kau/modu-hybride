export const initialState = {
    detailPopupShow: false
};

export const DetailPopupOpen = 'DetailPopupOpen';
export const DetailPopupClose = 'DetailPopupClose';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        
        case 'DetailPopupOpen': {
            return {
                ...state,
                detailPopupShow: true,
            }
        }
        case 'DetailPopupClose': {
            return {
                ...state,
                detailPopupShow: false,
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