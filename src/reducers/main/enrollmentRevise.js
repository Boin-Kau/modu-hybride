export const initialState = {
    openEnrollmentRevisePageWrapStatus: false,
    openEnrollmentRevisePageStatus: false,
};
const EnrollmentRevisePageWrapOpen = 'EnrollmentRevisePageWrapOpen';
const EnrollmentRevisePageOpen = 'EnrollmentRevisePageOpen';
const EnrollmentRevisePageWrapClose = 'EnrollmentRevisePageWrapClose';
const EnrollmentRevisePageClose = 'EnrollmentRevisePageClose';



export const EnrollmentRevisePageWrapOpenAction = {
    type: EnrollmentRevisePageWrapOpen,
};
export const EnrollmentRevisePageOpenAction = {
    type: EnrollmentRevisePageOpen,
};
export const EnrollmentRevisePageWrapCloseAction = {
    type: EnrollmentRevisePageWrapClose,
};
export const EnrollmentRevisePageCloseAction = {
    type: EnrollmentRevisePageClose,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'RESET': {
            return initialState
        }
        case 'EnrollmentRevisePageWrapOpen': {
            return {
                ...state,
                openEnrollmentRevisePageWrapStatus: true,
            }
        }
        case 'EnrollmentRevisePageOpen': {
            return {
                ...state,
                openEnrollmentRevisePageStatus: true,
            }
        }
        case 'EnrollmentRevisePageWrapClose': {
            return {
                ...state,
                openEnrollmentRevisePageWrapStatus: false,
            }
        }
        case 'EnrollmentRevisePageClose': {
            return {
                ...state,
                openEnrollmentRevisePageStatus: false,
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