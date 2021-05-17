export const initialState = {
    serverPlatformList: [],
    categoryPlatformList: [],
    popularPlatformList: [],
    searchPlatformList: []
};

export const GetServerPlatformList = 'GetServerPlatformList';
export const GetCategoryPlatformList = 'GetCategoryPlatformList';
export const GetPopularPlatformList = 'GetPopularPlatformList';
export const GetSearchPlatformList = 'GetSearchPlatformList';


// export const GetServerPlatformListAction = {
//     type: GetServerPlatformList,
// };
// export const GetPopularPlatformListAction = {
//     type: GetPopularPlatformList,
// };

const reducer = (state = initialState, action) => {

    const { serverPlatformList } = initialState;

    switch (action.type) {
        case 'GetServerPlatformList': {
            return {
                ...state,
                serverPlatformList: action.data
            }
        }
        case 'GetCategoryPlatformList': {
            return {
                ...state,
                categoryPlatformList: action.data
            }
        }
        case 'GetPopularPlatformList': {
            return {
                ...state,
                popularPlatformList: action.data
            }
        }
        case 'GetSearchPlatformList': {
            return {
                ...state,
                searchPlatformList: action.data
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