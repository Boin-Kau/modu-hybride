export const initialState = {
    popupShow: false,
    popupMessage:''
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
                popupMessage: action.data,
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