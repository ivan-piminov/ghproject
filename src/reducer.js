import {api} from "./api";

export const SET_COMPANY = "SET-COMPANY";
const LOADER_STATUS = "LOADER-STATUS";
const CHANGE_NAME = "CHANGE-NAME";
const MODAL_WINDOW_STATUS = "MODAL-WINDOW-STATUS";

const initialState = {
    data: [
        // {
        //     id: 1,
        //     name: "codemod",
        //     html_url: "https://github.com/facebook/codemod",
        //     forks_count: 177,
        //     watchers_count: 3533,
        //     stargazers_count: 3533
        // },
        // {
        //     id: 2,
        //     name: "aaa",
        //     html_url: "https://github.com/facebook/aaa",
        //     forks_count: 17,
        //     watchers_count: 333,
        //     stargazers_count: 35833
        // },
        // {
        //     id: 3,
        //     name: "bbbb",
        //     html_url: "https://github.com/facebook/bbbb",
        //     forks_count: 1897,
        //     watchers_count: 3533,
        //     stargazers_count: 35733
        // },
        // {
        //     id: 4,
        //     name: "cccc",
        //     html_url: "https://github.com/facebook/cccc",
        //     forks_count: 3000,
        //     watchers_count: 3753,
        //     stargazers_count: 358833
        // }
    ],
    loading: false,
    totalCompanyCount: 100,
    pageSize: 8,
    currentPage: 1,
    nameCompany: "",
    modalWindowStatus: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COMPANY:
            return {
                ...state,
                data: action.companyData,
                loading: false,
                currentPage: action.currentPage
            };
        case LOADER_STATUS:
            return {
                ...state,
                loading: action.isActive
            };
        case CHANGE_NAME:
            return {
                ...state,
                nameCompany: action.newName
            };
        case MODAL_WINDOW_STATUS:
            return {
                ...state,
                modalWindowStatus: action.isActive
            };
        default:
            return state;
    }
};
export default reducer;

//action creators

export const modalWindowStatusAC = (isActive) => ({type: MODAL_WINDOW_STATUS, isActive});

const newCompanyNameAC = (newName) => ({type: CHANGE_NAME, newName});

const loaderStatusAC = (isActive) => ({type: LOADER_STATUS, isActive});

const loadDataAC = (companyData, currentPage) => ({type: SET_COMPANY, companyData, currentPage});

//thunk creators

export const getData = (name, currentPage = 1) => (dispatch) => {
    dispatch(loaderStatusAC(true));
    dispatch(newCompanyNameAC(name));
    api.getData(name, currentPage)
        .then(res => {
            dispatch(loadDataAC(res.data, currentPage));
            dispatch(loaderStatusAC(false));
            dispatch(modalWindowStatusAC(false))
        })
        .catch(res => {
            dispatch(modalWindowStatusAC(true));
            dispatch(loaderStatusAC(false))
        })
};
