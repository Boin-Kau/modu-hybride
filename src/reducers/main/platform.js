export const initialState = {
    serverPlatformList: [],
    categoryPlatformList: [],
    popularPlatformList: [],
    searchPlatformList: [],
    platformCategoryList: [],

    deletePopupWrap: false,
    deletePopup: false,
    deletePlatformName: null,
    deletePlatformIdx: null,

    searchDeleteStatus: false,
};

export const GetServerPlatformList = 'GetServerPlatformList';
export const GetCategoryPlatformList = 'GetCategoryPlatformList';
export const GetPopularPlatformList = 'GetPopularPlatformList';
export const GetSearchPlatformList = 'GetSearchPlatformList';
export const GetPlatformCategoryList = 'GetPlatformCategoryList';

export const UpdateSubscribeStatus = 'UpdateSubscribeStatus';

export const DeletePopupOpen = 'DeletePopupOpen';
export const DeletePopupClose = 'DeletePopupClose';

export const SearchDeleteTrue = 'SearchDeleteTrue';
export const SearchDeleteFalse = 'SearchDeleteFalse';


const reducer = (state = initialState, action) => {

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
        case 'GetPlatformCategoryList': {
            return {
                ...state,
                platformCategoryList: action.data
            }
        }
        case 'UpdateSubscribeStatus': {
            const serachPlatform = state.searchPlatformList.map((value) => {
                if (value.idx == action.data.platformIdx) {
                    value.isSubscribe = action.data.status;
                }
                return value;
            });

            return {
                ...state,
                searchPlatformList: serachPlatform
            }
        }
        case 'DeletePopupOpen': {
            return {
                ...state,
                deletePopupWrap: true,
                deletePopup: true,
                deletePlatformName: action.data.name,
                deletePlatformIdx: action.data.idx
            }
        }
        case 'DeletePopupClose': {
            return {
                ...state,
                deletePopupWrap: false,
                deletePopup: false,
                deletePlatformName: null,
                deletePlatformIdx: null
            }
        }
        case 'SearchDeleteTrue': {
            return {
                ...state,
                searchDeleteStatus: true
            }
        }
        case 'SearchDeleteFalse': {
            return {
                ...state,
                searchDeleteStatus: false
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