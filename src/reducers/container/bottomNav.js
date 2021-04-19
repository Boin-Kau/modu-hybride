export const initialState = {
    openBottomNavStatus: false,
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
    console.log(action.type)
    switch (action.type) {
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