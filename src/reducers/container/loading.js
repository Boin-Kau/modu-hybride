export const initialState = {
    openLoadingStatus: false,
};

const LoadingOpen = 'LoadingOpen';
const LoadingClose = 'LoadingClose';


export const LoadingOpenAction = {
    type: LoadingOpen,
};
export const LoadingCloseAction = {
    type: LoadingClose,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LoadingOpen': {
            return {
                ...state,
                openLoadingStatus: true,
            }
        }
        case 'LoadingClose': {
            return {
                ...state,
                openLoadingStatus: false,
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