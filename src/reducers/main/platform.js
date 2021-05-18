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

export const UpdateSubscribeStatus = 'UpdateSubscribeStatus';


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
        case 'UpdateSubscribeStatus': {
            // const repPlatform = state.serverPlatformList.map((value) => {
            //     if (value.idx == action.data.platformIdx) {
            //         value.isSubscribe = action.data.status;
            //     }
            //     return value;
            // });

            // const categoryPlatform = state.categoryPlatformList;
            // for (let i = 0; i < categoryPlatform.length; i++) {
            //     for (let j = 0; j < categoryPlatform[i].platformServer.length; j++) {

            //         if (categoryPlatform[i].platformServer[j].idx == action.data.platformIdx) {
            //             categoryPlatform[i].platformServer[j].isSubscribe = action.data.status;
            //         }
            //     }
            // }

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
        default: {
            return {
                ...state,
            }
        }
    }
};

export default reducer;