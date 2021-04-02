export const initialState = {
    openSearchPageWrapStatus: false,
    openSearchPageStatus: false,
};
const SearchPageWrapOpen = 'SearchPageWrapOpen';
const SearchPageOpen = 'SearchPageOpen';
const SearchPageWrapClose = 'SearchPageWrapClose';
const SearchPageClose = 'SearchPageClose';



export const SearchPageWrapOpenAction = {
    type: SearchPageWrapOpen,
};
export const SearchPageOpenAction = {
    type: SearchPageOpen,
};
export const SearchPageWrapCloseAction = {
    type: SearchPageWrapClose,
};
export const SearchPageCloseAction = {
    type: SearchPageClose,
};

const reducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case 'SearchPageWrapOpen': {
            return {
                ...state,
                openSearchPageWrapStatus: true,
            }
        }
        case 'SearchPageOpen': {
            return {
                ...state,
                openSearchPageStatus: true,
            }
        }
        case 'SearchPageWrapClose': {
            return {
                ...state,
                openSearchPageWrapStatus: false,
            }
        }
        case 'SearchPageClose': {
            return {
                ...state,
                openSearchPageStatus: false,
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