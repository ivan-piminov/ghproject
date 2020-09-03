import {all, call, put, takeEvery} from 'redux-saga/effects'
import {CHANGE_NAME, CHANGE_PAGE, loadDataAC, loaderStatusAC, loadPageAC, modalWindowStatusAC} from "./reducer";
import {api} from "./api";
import {ItemRep} from "./Types/type";

// все watch-ры

export function* watchAll() {
    yield all([
        takeEvery(CHANGE_NAME, workerLoadData),
        takeEvery(CHANGE_PAGE, workerLoadNewPage)
    ]);
}

// worker на загрузку данных о компании

type SetNewCompanyActionType = {
    type: typeof CHANGE_NAME
    newName: string
}

export function* workerLoadData(action:SetNewCompanyActionType):Generator {
    try {
        yield put(loaderStatusAC(true));

        const res:Array<ItemRep> | any = yield call(loadData, action.newName);
        yield put(loadDataAC(res.data));

        yield put(loaderStatusAC(false));
        yield put(modalWindowStatusAC(false))

    } catch (e) {
        yield put(modalWindowStatusAC(true));
        yield put(loaderStatusAC(false))
    }
}

export async function loadData(name:string, currentPage = 1) {
    return await api.getData(name, currentPage)
}


// worker на загрузку данных при смене страниц

type SetNewPageActionType = {
    type: typeof CHANGE_PAGE
    nameCompany: string
    newPage: number
}

export function* workerLoadNewPage(action:SetNewPageActionType):Generator {
    try {
        yield put(loaderStatusAC(true));

        const res:Array<ItemRep> | any = yield call(loadNewPageData, action.nameCompany, action.newPage);

        yield put(loadPageAC(res.data));

        yield put(loaderStatusAC(false));
        yield put(modalWindowStatusAC(false))

    } catch (e) {
        yield put(modalWindowStatusAC(true));
        yield put(loaderStatusAC(false))
    }
}

export async function loadNewPageData(name:string, currentPage = 1) {
    return await api.getData(name, currentPage)
}


