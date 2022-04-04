export const initialState = {
    selectedPlatformIdx: null,
    selectedPlatformName: null,
    selectedPlatformCategoryIdx: null,
    selectedPlatformImgUrl: null,
    selectedPlatformImgColor: null,
    selectedPlatformImgInitial: null,
};

export const ResetPlatform = 'ResetPlatform';
const UpdatePlatform = 'UpdatePlatform';

export const UpdatePlatformAction = (data) => {
    return {
        type: UpdatePlatform,
        data: data
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ResetPlatform': {
            return initialState
        }
        case 'UpdatePlatform': {
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