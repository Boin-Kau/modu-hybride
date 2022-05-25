export const initialState = {
    openBottomNavStatus: true,
};

const BottomNavOpen = 'BottomNavOpen';
const BottomNavClose = 'BottomNavClose';



export const BottomNavOpenAction = {
    type: BottomNavOpen,
};
export const BottomNavCloseAction = {
    type: BottomNavClose,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        case 'BottomNavOpen': {
            return {
                ...state,
                openBottomNavStatus: true,
            }
        }
        case 'BottomNavClose': {
            return {
                ...state,
                openBottomNavStatus: false,
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

