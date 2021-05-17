export const initialState = {
    openSubscribePageWrapStatus: false,
    openSubscribePageStatus: false,
    totalReloadStatus: false,
    categoryReloadStatus: false,
};

const SubscribePageWrapOpen = 'SubscribePageWrapOpen';
const SubscribePageOpen = 'SubscribePageOpen';
const SubscribePageWrapClose = 'SubscribePageWrapClose';
const SubscribePageClose = 'SubscribePageClose';

const totalReloadTrue = 'totalReloadTrue';
const totalReloadFalse = 'totalReloadFalse';

const categoryReloadTrue = 'categoryReloadTrue';
const categoryReloadFalse = 'categoryReloadFalse';

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

export const TotalReloadTrueAction = {
    type: totalReloadTrue,
};
export const TotalReloadFalseAction = {
    type: totalReloadFalse,
};
export const CategoryReloadTrueAction = {
    type: categoryReloadTrue,
};
export const CategoryReloadFalseAction = {
    type: categoryReloadFalse,
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
        case 'totalReloadTrue': {
            return {
                ...state,
                totalReloadStatus: true,
            }
        }
        case 'totalReloadFalse': {
            return {
                ...state,
                totalReloadStatus: false,
            }
        }
        case 'categoryReloadTrue': {
            return {
                ...state,
                categoryReloadStatus: true,
            }
        }
        case 'categoryReloadFalse': {
            return {
                ...state,
                categoryReloadStatus: false,
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