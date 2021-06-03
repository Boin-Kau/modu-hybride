export const initialState = {
    openAlertPageWrapStatus: false,
    openAlertPageStatus: false,
};
const AlertPageWrapOpen = 'AlertPageWrapOpen';
const AlertPageOpen = 'AlertPageOpen';
const AlertPageWrapClose = 'AlertPageWrapClose';
const AlertPageClose = 'AlertPageClose';



export const AlertPageWrapOpenAction = {
    type: AlertPageWrapOpen,
};
export const AlertPageOpenAction = {
    type: AlertPageOpen,
};
export const AlertPageWrapCloseAction = {
    type: AlertPageWrapClose,
};
export const AlertPageCloseAction = {
    type: AlertPageClose,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        case 'AlertPageWrapOpen': {
            return {
                ...state,
                openAlertPageWrapStatus: true,
            }
        }
        case 'AlertPageOpen': {
            return {
                ...state,
                openAlertPageStatus: true,
            }
        }
        case 'AlertPageWrapClose': {
            return {
                ...state,
                openAlertPageWrapStatus: false,
            }
        }
        case 'AlertPageClose': {
            return {
                ...state,
                openAlertPageStatus: false,
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