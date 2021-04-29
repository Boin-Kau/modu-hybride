export const initialState = {
    openEnrollmentPageWrapStatus: false,
    openEnrollmentPageStatus: false,
};
const EnrollmentPageWrapOpen = 'EnrollmentPageWrapOpen';
const EnrollmentPageOpen = 'EnrollmentPageOpen';
const EnrollmentPageWrapClose = 'EnrollmentPageWrapClose';
const EnrollmentPageClose = 'EnrollmentPageClose';



export const EnrollmentPageWrapOpenAction = {
    type: EnrollmentPageWrapOpen,
};
export const EnrollmentPageOpenAction = {
    type: EnrollmentPageOpen,
};
export const EnrollmentPageWrapCloseAction = {
    type: EnrollmentPageWrapClose,
};
export const EnrollmentPageCloseAction = {
    type: EnrollmentPageClose,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'EnrollmentPageWrapOpen': {
            return {
                ...state,
                openEnrollmentPageWrapStatus: true,
            }
        }
        case 'EnrollmentPageOpen': {
            return {
                ...state,
                openEnrollmentPageStatus: true,
            }
        }
        case 'EnrollmentPageWrapClose': {
            return {
                ...state,
                openEnrollmentPageWrapStatus: false,
            }
        }
        case 'EnrollmentPageClose': {
            return {
                ...state,
                openEnrollmentPageStatus: false,
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