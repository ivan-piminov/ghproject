import {takeEvery, put, call, all} from 'redux-saga/effects'
import {CHANGE_NAME, CHANGE_PAGE, loadDataAC, loaderStatusAC, loadPageAC, modalWindowStatusAC} from "./reducer";
import {api} from "./api";

// все watch-ры

export function* watchAll() {
    yield all([
        takeEvery(CHANGE_NAME, workerLoadData),
        takeEvery(CHANGE_PAGE, workerLoadNewPage)
    ]);
}

// worker на загрузку данных о компании

export function* workerLoadData(action) {
    try {
        yield put(loaderStatusAC(true));

        const res = yield call(loadData, action.newName);
        yield put(loadDataAC(res.data));

        yield put(loaderStatusAC(false));
        yield put(modalWindowStatusAC(false))

    } catch (e) {
        yield put(modalWindowStatusAC(true));
        yield put(loaderStatusAC(false))
    }
}

export async function loadData(name, currentPage = 1) {
    return await api.getData(name, currentPage)
}


// worker на загрузку данных при смене страниц

export function* workerLoadNewPage(action) {
    try {
        yield put(loaderStatusAC(true));

        const res = yield call(loadNewPageData, action.nameCompany, action.newPage);

        yield put(loadPageAC(res.data));

        yield put(loaderStatusAC(false));
        yield put(modalWindowStatusAC(false))

    } catch (e) {
        yield put(modalWindowStatusAC(true));
        yield put(loaderStatusAC(false))
    }
}

export async function loadNewPageData(name, currentPage = 1) {
    return await api.getData(name, currentPage)
}


