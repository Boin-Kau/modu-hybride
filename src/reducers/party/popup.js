export const initialState = {
    reportPopupStatus: false,
    reportPartyIdx: null,
    reportCategoryList: [],

    terminatePopupStatus: false,
    terminatePartyIdx: null,
    terminatePartyRole: null,

    banishPopupStatus: false,
    banishPartyIdx: null,
    banishUserList: [],

};

const ReportPopupOpen = 'ReportPopupOpen';
const ReportPopupClose = 'ReportPopupClose';

const TerminatePopupOpen = 'TerminatePopupOpen';
const TerminatePopupClose = 'TerminatePopupClose';

const BanishPopupOpen = 'BanishPopupOpen';
const BanishPopupClose = 'BanishPopupClose';

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

export const TerminatePopupOpenAction = (data) => {
    return {
        type: TerminatePopupOpen,
        data: data
    }
};
export const TerminatePopupCloseAction = () => {
    return {
        type: TerminatePopupClose,
    }
};

export const BanishPopupOpenAction = (data) => {
    return {
        type: BanishPopupOpen,
        data: data
    }
};
export const BanishPopupCloseAction = () => {
    return {
        type: BanishPopupClose,
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
        case 'TerminatePopupOpen': {
            return {
                ...state,
                terminatePopupStatus: true,
                terminatePartyIdx: action.data.terminatePartyIdx,
                terminatePartyRole: action.data.terminatePartyRole,
            }
        }
        case 'TerminatePopupClose': {
            return {
                ...state,
                terminatePopupStatus: false,
                terminatePartyIdx: null,
                terminatePartyRole: null,
            }
        }
        case 'BanishPopupOpen': {
            return {
                ...state,
                banishPopupStatus: true,
                banishPartyIdx: action.data.banishPartyIdx,
                banishUserList: action.data.banishUserList,
            }
        }
        case 'BanishPopupClose': {
            return {
                ...state,
                banishPopupStatus: false,
                banishPartyIdx: null,
                banishUserList: [],
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