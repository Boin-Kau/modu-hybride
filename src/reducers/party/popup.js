export const initialState = {
    reportPopupStatus: false,
    reportPartyIdx: null,
    reportCategoryList: [],
};

const ReportPopupOpen = 'ReportPopupOpen';
const ReportPopupClose = 'ReportPopupClose';

const SetReportCategoryList = 'SetReportCategoryList';


export const ReportPopupOpenAction = (data) => {
    return {
        type: ReportPopupOpen,
        data: data
    }
};
export const ReportPopupCloseAction = () => {
    return {
        type: ReportPopupClose,
    }
};
export const SetReportCategoryListAction = (data) => {
    return {
        type: SetReportCategoryList,
        data: data
    }
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ReportPopupOpen': {
            return {
                ...state,
                reportPopupStatus: true,
                reportPartyIdx: action.data.reportPartyIdx,
            }
        }
        case 'ReportPopupClose': {
            return {
                ...state,
                reportPopupStatus: false,
                reportPartyIdx: null,
            }
        }
        case 'SetReportCategoryList': {
            return {
                ...state,
                reportCategoryList: action.data.reportCategoryList
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