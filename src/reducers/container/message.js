export const initialState = {
    message: '',
    messageWrapShow: false,
    messageShow: false
};

export const MessageOpen = 'MessageOpen';
export const MessageClose = 'MessageClose';
export const MessageWrapOpen = 'MessageWrapOpen';
export const MessageWrapClose = 'MessageWrapClose';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MessageOpen': {
            return {
                ...state,
                message: action.data,
                messageShow: true,
            }
        }
        case 'MessageClose': {
            return {
                ...state,
                messageShow: false,
            }
        }
        case 'MessageWrapOpen': {
            return {
                ...state,
                messageWrapShow: true,
            }
        }
        case 'MessageWrapClose': {
            return {
                ...state,
                messageWrapShow: false,
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