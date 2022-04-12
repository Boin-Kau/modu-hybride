export const initialState = {
    page: 1,
};

export const ResetCurrentPage = 'ResetCurrentPage';
const UpdateCurrentPage = 'UpdateCurrentPage';

export const UpdateCurrentPageAction = (data) => {
    return {
        type: UpdateCurrentPage,
        data: data
    }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ResetCurrentPage': {
            return initialState
        }
        case 'UpdateCurrentPage': {
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