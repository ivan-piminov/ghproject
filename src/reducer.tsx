import {ItemRep} from "./Types/type";

export const SET_COMPANY = "SET-COMPANY";
export const LOADER_STATUS = "LOADER-STATUS";
export const CHANGE_NAME = "CHANGE-NAME";
export const MODAL_WINDOW_STATUS = "MODAL-WINDOW-STATUS";
export const CHANGE_PAGE = "CHANGE-PAGE";
export const SET_PAGE = "SET-PAGE";


 export type InitialStateType = {
    data: Array<ItemRep>
    loading: boolean
    totalCompanyCount: number,
    pageSize: number,
    currentPage: number,
    nameCompany: string,
    modalWindowStatus: boolean
}


const initialState: InitialStateType = {
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

const reducer = (state: InitialStateType = initialState, action:ActionTypes) => {
    switch (action.type) {
        case CHANGE_NAME:
            return {
                ...state,
                nameCompany: action.newName
            };
        case SET_COMPANY:
            return {
                ...state,
                data: action.companyData,
                loading: false,
            };
        case CHANGE_PAGE:
            return {
                ...state,
                nameCompany: action.nameCompany,
                currentPage: action.newPage
            };
        case SET_PAGE:
            return {
                ...state,
                data: action.companyData
            };
        case LOADER_STATUS:
            return {
                ...state,
                loading: action.isActive
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

export type ActionTypes =
    ModalWindowStatusActionType
    | LoaderStatusActionType
    | SetNewCompanyActionType
    | LoadDataCompanyActionType
    | SetNewPageActionType
    | LoadDataPageActionType

type ModalWindowStatusActionType = {
    type: typeof MODAL_WINDOW_STATUS
    isActive: boolean
}
type LoaderStatusActionType = {
    type: typeof LOADER_STATUS
    isActive: boolean
}
type SetNewCompanyActionType = {
    type: typeof CHANGE_NAME
    newName: string
}
type LoadDataCompanyActionType = {
    type: typeof SET_COMPANY
    companyData: Array<ItemRep>

}
type SetNewPageActionType = {
    type: typeof CHANGE_PAGE
    nameCompany: string
    newPage: number
}
type LoadDataPageActionType = {
    type: typeof SET_PAGE
    companyData: Array<ItemRep>
}
// action для модального окна и Preloader
export const modalWindowStatusAC = (isActive: boolean): ModalWindowStatusActionType => ({type: MODAL_WINDOW_STATUS, isActive});
export const loaderStatusAC = (isActive: boolean): LoaderStatusActionType => ({type: LOADER_STATUS, isActive});

// action для данных о компании
export const newCompanyNameAC = (newName: string): SetNewCompanyActionType => ({type: CHANGE_NAME, newName});
export const loadDataAC = (companyData: Array<ItemRep>): LoadDataCompanyActionType => ({type: SET_COMPANY, companyData});

// action для данных при смене страницы
export const newCurrentPageAC = (nameCompany: string, newPage: number): SetNewPageActionType => ({type: CHANGE_PAGE, nameCompany, newPage});
export const loadPageAC = (companyData: Array<ItemRep>): LoadDataPageActionType => ({type: SET_PAGE, companyData});


