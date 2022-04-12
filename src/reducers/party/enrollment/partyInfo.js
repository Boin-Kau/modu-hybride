export const initialState = {
    partyTitle: null,
    membership: null,
    openChatLink: null,
};

export const ResetPartyInfo = 'ResetPartyInfo';
const UpdatePartyInfo = 'UpdatePartyInfo';

export const UpdatePartyInfoAction = (data) => {
    return {
        type: UpdatePartyInfo,
        data: data
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ResetPartyInfo': {
            return initialState
        }
        case 'UpdatePartyInfo': {
            return {
                ...state,
                ...action.data
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