export const initialState = {
    openSubscribePageWrapStatus: false,
    openSubscribePageStatus: false,
    totalReloadStatus: false,
    categoryReloadStatus: false,
    subscribeReloadStatus: true,
    subscribeList: []
};

const SubscribePageWrapOpen = 'SubscribePageWrapOpen';
const SubscribePageOpen = 'SubscribePageOpen';
const SubscribePageWrapClose = 'SubscribePageWrapClose';
const SubscribePageClose = 'SubscribePageClose';

const totalReloadTrue = 'totalReloadTrue';
const totalReloadFalse = 'totalReloadFalse';

const categoryReloadTrue = 'categoryReloadTrue';
const categoryReloadFalse = 'categoryReloadFalse';


const subscribeReloadTrue = 'subscribeReloadTrue';
const subscribeReloadFalse = 'subscribeReloadFalse';

export const GetSubscirbeList = 'GetSubscirbeList';

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
export const SubscribeReloadTrueAction = {
    type: subscribeReloadTrue,
};
export const SubscribeReloadFalseAction = {
    type: subscribeReloadFalse,
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
        case 'subscribeReloadTrue': {
            return {
                ...state,
                subscribeReloadStatus: true,
            }
        }
        case 'subscribeReloadFalse': {
            return {
                ...state,
                subscribeReloadStatus: false,
            }
        }
        case 'GetSubscirbeList': {
            return {
                ...state,
                subscribeList: action.data,
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