export const initialState = {
    openInfoPageWrapStatus: false,
    openInfoPageStatus: false,
};
const InfoPageWrapOpen = 'InfoPageWrapOpen';
const InfoPageOpen = 'InfoPageOpen';
const InfoPageWrapClose = 'InfoPageWrapClose';
const InfoPageClose = 'InfoPageClose';



export const InfoPageWrapOpenAction = {
    type: InfoPageWrapOpen,
};
export const InfoPageOpenAction = {
    type: InfoPageOpen,
};
export const InfoPageWrapCloseAction = {
    type: InfoPageWrapClose,
};
export const InfoPageCloseAction = {
    type: InfoPageClose,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        case 'InfoPageWrapOpen': {
            return {
                ...state,
                openInfoPageWrapStatus: true,
            }
        }
        case 'InfoPageOpen': {
            return {
                ...state,
                openInfoPageStatus: true,
            }
        }
        case 'InfoPageWrapClose': {
            return {
                ...state,
                openInfoPageWrapStatus: false,
            }
        }
        case 'InfoPageClose': {
            return {
                ...state,
                openInfoPageStatus: false,
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