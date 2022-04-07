export const initialState = {
    popupShow: false
};

export const PopupOpen = 'PopupOpen';
export const PopupClose = 'PopupClose';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        
        case 'PopupOpen': {
            return {
                ...state,
                popupShow: true,
            }
        }
        case 'PopupClose': {
            return {
                ...state,
                popupShow: false,
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