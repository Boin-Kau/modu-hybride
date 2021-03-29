export const initialState = {
    openAnalyPageWrapStatus: false,
    openAnalyPageStatus: false,

    openSubscribePageWrapStatus: false,
    openSubscribePageStatus: false

};

const AnalyPageWrapOpen = 'AnalyPageWrapOpen';
const AnalyPageOpen = 'AnalyPageOpen';
const AnalyPageWrapClose = 'AnalyPageWrapClose';
const AnalyPageClose = 'AnalyPageClose';


const SubscribePageWrapOpen = 'SubscribePageWrapOpen';
const SubscribePageOpen = 'SubscribePageOpen';
const SubscribePageWrapClose = 'SubscribePageWrapClose';
const SubscribePageClose = 'SubscribePageClose';



export const AnalyPageWrapOpenAction = {
    type: AnalyPageWrapOpen,
};
export const AnalyPageOpenAction = {
    type: AnalyPageOpen,
};
export const AnalyPageWrapCloseAction = {
    type: AnalyPageWrapClose,
};
export const AnalyPageCloseAction = {
    type: AnalyPageClose,
};

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
    console.log(action.type)
    switch (action.type) {
        case 'AnalyPageWrapOpen': {
            return {
                ...state,
                openAnalyPageWrapStatus: true,
            }
        }
        case 'AnalyPageOpen': {
            return {
                ...state,
                openAnalyPageStatus: true,
            }
        }
        case 'AnalyPageWrapClose': {
            return {
                ...state,
                openAnalyPageWrapStatus: false,
            }
        }
        case 'AnalyPageClose': {
            return {
                ...state,
                openAnalyPageStatus: false,
            }
        }
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