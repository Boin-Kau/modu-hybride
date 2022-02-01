import ReactGA from 'react-ga';


//GA 카테고리
export const GA_CATEOGRY = Object.freeze({
    USER: "User",
    SUBSCRIBE: "Subscribe",
    PARTY: "Party",
    SYSTEM: "System"
})

//GA 액션
export const GA_USER_ACTION = Object.freeze({
    LOGIN: "Login an Account",
    LOGOUT: "Logout an Account",
    SIGNIN: "SignUp an Account",
    SIGNOUT: "Delete an Account",
    FINDNAME: "Find User Name",
})

export const GA_SUBSCRIBE_ACTION = Object.freeze({
    TOTAL: "Click Total Subscribe Tab",
    CATEGORY: "Click Category Subscribe Tab",
    SUBMIT: "Submit Subscribe Data",
    UPDATE: "Update Subscribe Data",
    DELETE: "Delete Subscribe Data",
})

export const GA_PARTY_ACTION = Object.freeze({
    DETAIL: "Click Party Detail",
    SUBMIT: "Submit Party Data",
    UPDATE: "Update Party Data",
    DELETE: "Delete Party Data",
    BANISH: "Banish Party User",
    JOIN: "Join Party",
    LEAVE: "Leave Party",
    REPORT: "Report Party",
})

export const GA_SYSTEM_ACTION = Object.freeze({
    PUSHNOTION: "Turn On Push Notification",
    PUSHNOTIOFF: "Turn Off Push Notification",
    MARKETINGNOTION: "Turn On Marketting Notification",
    MARKETINGNOTIOFF: "Turn Off Marketting Notification",
    NOTICE: "Click Notice Detail Tab"
})

//ga event 모듈
export const GAEventSubmit = (category, action) => {
    ReactGA.event({
        category: category,
        action: action
    });
}