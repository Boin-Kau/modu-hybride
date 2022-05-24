export const initialState = {
    guidePopupShow: false
};

export const GuidePopupOpen = 'GuidePopupOpen';
export const GuidePopupClose = 'GuidePopupClose';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        
        case 'GuidePopupOpen': {
            return {
                ...state,
                guidePopupShow: true,
            }
        }
        case 'GuidePopupClose': {
            return {
                ...state,
                guidePopupShow: false,
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