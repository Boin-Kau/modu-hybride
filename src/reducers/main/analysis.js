export const initialState = {
    openAnalyPageWrapStatus: false,
    openAnalyPageStatus: false,
    analysisList: [],
    willPayment: 0,
    currentPrice: 0,
    pastPrice: 0,
    pastMont: 0,
    pastPastPrice: 0,
    pastPastMonth: 0,
    analysisCategory: [],
    analysisCategorySub: [],
    analysisReloadStatus: false
};

const AnalyPageWrapOpen = 'AnalyPageWrapOpen';
const AnalyPageOpen = 'AnalyPageOpen';
const AnalyPageWrapClose = 'AnalyPageWrapClose';
const AnalyPageClose = 'AnalyPageClose';

const AnalyPageReloadTrue = 'AnalyPageReloadTrue';
const AnalyPageReloadFalse = 'AnalyPageReloadFalse';

export const GetAnalyPageList = 'GetAnalyPageList';


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

export const AnalyPageReloadTrueAction = {
    type: AnalyPageReloadTrue,
};
export const AnalyPageReloadFalseAction = {
    type: AnalyPageReloadFalse,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'RESET': {
            return initialState
        }
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
        case 'AnalyPageReloadTrue': {
            return {
                ...state,
                analysisReloadStatus: true,
            }
        }
        case 'AnalyPageReloadFalse': {
            return {
                ...state,
                analysisReloadStatus: false,
            }
        }
        case 'GetAnalyPageList': {
            const data = action.data;
            const category = data[0].category;

            let categorySub = [];
            let count = 0;
            category.map((result) => {
                if (result.totalPrice && result.totalPrice != 0 && count < 3) {
                    count++;
                    categorySub.push(result);
                }
            });

            return {
                ...state,
                analysisList: data,
                willPayment: data[0].willPayment,
                currentPrice: data[0].price,
                pastPrice: data[1].price,
                pastMonth: data[1].month,
                pastPastPrice: data[2].price,
                pastPastMonth: data[2].month,
                analysisCategory: data[0].category,
                analysisCategorySub: categorySub
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