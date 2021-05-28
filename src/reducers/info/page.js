export const initialState = {
    openInfoPageWrapStatus: false,
    openInfoPageStatus: false,

    openNamePageWrapStatus: false,
    openNamePageStatus: false,

    openPhonePageWrapStatus: false,
    openPhonePageStatus: false,

    openNoticePageWrapStatus: false,
    openNoticePageStatus: false,

    openNoticeDetailPageWrapStatus: false,
    openNoticeDetailPageStatus: false,

    openQuestionPageWrapStatus: false,
    openQuestionPageStatus: false,

    openSettingPageWrapStatus: false,
    openSettingPageStatus: false,

    openLoginPhonePageWrapStatus: false,
    openLoginPhonePageStatus: false
};

export const PageWrapOpen = 'PageWrapOpen';
export const PageOpen = 'PageOpen';
export const PageWrapClose = 'PageWrapClose';
export const PageClose = 'PageClose';

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'PageWrapOpen': {
            switch (action.data) {
                case 'info': {
                    return {
                        ...state,
                        openInfoPageWrapStatus: true,
                    }
                }
                case 'name': {
                    return {
                        ...state,
                        openNamePageWrapStatus: true,
                    }
                }
                case 'phone': {
                    return {
                        ...state,
                        openPhonePageWrapStatus: true,
                    }
                }
                case 'notice': {
                    return {
                        ...state,
                        openNoticePageWrapStatus: true,
                    }
                }
                case 'noticeDetail': {
                    return {
                        ...state,
                        openNoticeDetailPageWrapStatus: true,
                    }
                }
                case 'question': {
                    return {
                        ...state,
                        openQuestionPageWrapStatus: true,
                    }
                }
                case 'setting': {
                    return {
                        ...state,
                        openSettingPageWrapStatus: true,
                    }
                }
                case 'loginPhone': {
                    return {
                        ...state,
                        openLoginPhonePageWrapStatus: true,
                    }
                }
                default: {
                    return {
                        ...state
                    }
                }
            }
        }
        case 'PageOpen': {
            switch (action.data) {
                case 'info': {
                    return {
                        ...state,
                        openInfoPageStatus: true,
                    }
                }
                case 'name': {
                    return {
                        ...state,
                        openNamePageStatus: true,
                    }
                }
                case 'phone': {
                    return {
                        ...state,
                        openPhonePageStatus: true,
                    }
                }
                case 'notice': {
                    return {
                        ...state,
                        openNoticePageStatus: true,
                    }
                }
                case 'noticeDetail': {
                    return {
                        ...state,
                        openNoticeDetailPageStatus: true,
                    }
                }
                case 'question': {
                    return {
                        ...state,
                        openQuestionPageStatus: true,
                    }
                }
                case 'setting': {
                    return {
                        ...state,
                        openSettingPageStatus: true,
                    }
                }
                case 'loginPhone': {
                    return {
                        ...state,
                        openLoginPhonePageStatus: true,
                    }
                }
                default: {
                    return {
                        ...state
                    }
                }
            }
        }
        case 'PageWrapClose': {
            switch (action.data) {
                case 'info': {
                    return {
                        ...state,
                        openInfoPageWrapStatus: false,
                    }
                }
                case 'name': {
                    return {
                        ...state,
                        openNamePageWrapStatus: false,
                    }
                }
                case 'phone': {
                    return {
                        ...state,
                        openPhonePageWrapStatus: false,
                    }
                }
                case 'notice': {
                    return {
                        ...state,
                        openNoticePageWrapStatus: false,
                    }
                }
                case 'noticeDetail': {
                    return {
                        ...state,
                        openNoticeDetailPageWrapStatus: false,
                    }
                }
                case 'question': {
                    return {
                        ...state,
                        openQuestionPageWrapStatus: false,
                    }
                }
                case 'setting': {
                    return {
                        ...state,
                        openSettingPageWrapStatus: false,
                    }
                }
                case 'loginPhone': {
                    return {
                        ...state,
                        openLoginPhonePageWrapStatus: false,
                    }
                }
                default: {
                    return {
                        ...state
                    }
                }
            }
        }
        case 'PageClose': {
            switch (action.data) {
                case 'info': {
                    return {
                        ...state,
                        openInfoPageStatus: false,
                    }
                }
                case 'name': {
                    return {
                        ...state,
                        openNamePageStatus: false,
                    }
                }
                case 'phone': {
                    return {
                        ...state,
                        openPhonePageStatus: false,
                    }
                }
                case 'notice': {
                    return {
                        ...state,
                        openNoticePageStatus: false,
                    }
                }
                case 'noticeDetail': {
                    return {
                        ...state,
                        openNoticeDetailPageStatus: false,
                    }
                }
                case 'question': {
                    return {
                        ...state,
                        openQuestionPageStatus: false,
                    }
                }
                case 'setting': {
                    return {
                        ...state,
                        openSettingPageStatus: false,
                    }
                }
                case 'loginPhone': {
                    return {
                        ...state,
                        openLoginPhonePageStatus: false,
                    }
                }
                default: {
                    return {
                        ...state
                    }
                }
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