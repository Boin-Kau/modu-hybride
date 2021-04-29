export const initialState = {
    openSubscribePageWrapStatus: false,
    openSubscribePageStatus: false
};

const SubscribePageWrapOpen = 'SubscribePageWrapOpen';
const SubscribePageOpen = 'SubscribePageOpen';
const SubscribePageWrapClose = 'SubscribePageWrapClose';
const SubscribePageClose = 'SubscribePageClose';

export const SubscribePageWrapOpenAction = {
    type: SubscribePageWrapOpen,
};
export const SubscribePageOpenAction = {
    type: SubscribePageOpen,
};
export const SubscribePageWrapCloseAction = {
    type: SubscribePageWrapClose,
};
export const SubscribePageCloseAction = {
    type: SubscribePageClose,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SubscribePageWrapOpen': {
            return {
                ...state,
                openSubscribePageWrapStatus: true,
            }
        }
        case 'SubscribePageOpen': {
            return {
                ...state,
                openSubscribePageStatus: true,
            }
        }
        case 'SubscribePageWrapClose': {
            return {
                ...state,
                openSubscribePageWrapStatus: false,
            }
        }
        case 'SubscribePageClose': {
            return {
                ...state,
                openSubscribePageStatus: false,
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