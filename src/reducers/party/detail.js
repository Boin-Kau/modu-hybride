// 파티 리스트 -> 파티 상세 페이지로 데이터의 데이터 전달에 사용되는 리덕스

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