export const initialState = {
    selectedPartyIdx: null,
    selectedPartyTitle: null,
    selectedPartyOpenChatLink: null,
    selectedPartyRoomStatus: null,
    selectedPartyIsEnrolled: null,
    selectedPartyPlatformInfo: {},
    selectedPartyPartyInfo: {},
    selectedPartyMembershipInfo: {},
};

export const ResetParty = 'ResetParty';
const UpdateParty = 'UpdateParty';

export const UpdatePartyAction = (data) => {
    return {
        type: UpdateParty,
        data: data
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ResetParty': {
            return initialState
        }
        case 'UpdateParty': {
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