export const initialState = {
    openAnalyPageWrapStatus: false,
    openAnalyPageStatus: false,
};

const AnalyPageWrapOpen = 'AnalyPageWrapOpen';
const AnalyPageOpen = 'AnalyPageOpen';
const AnalyPageWrapClose = 'AnalyPageWrapClose';
const AnalyPageClose = 'AnalyPageClose';



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
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;