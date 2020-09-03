import * as React from 'react'
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import ModalWindow from "../ModalWindow/ModalWindow";
import style from './Table.module.css'
import {ActionTypes, newCurrentPageAC} from "../BLL/reducer";
import {AppStateType} from "../BLL/store";
import {Dispatch} from "redux";


const Table: React.FC = () => {

    const name = useSelector((store: AppStateType) => store.companyInformation.nameCompany);

    const dispatch = useDispatch<Dispatch<ActionTypes>>();

    const ChangeCurrentPage = (p: number): void => {
        dispatch(newCurrentPageAC(name, p))
    };

    //Считывание необходимых значений из store через useSelector

    const data = useSelector((store: AppStateType) => store.companyInformation.data);

    const loaderStatus = useSelector((store: AppStateType) => store.companyInformation.loading);

    const totalCompanyCount = useSelector((store: AppStateType) => store.companyInformation.totalCompanyCount);

    const pageSize = useSelector((store: AppStateType) => store.companyInformation.pageSize);

    const currentPage = useSelector((store: AppStateType) => store.companyInformation.currentPage);

    const modalStatus = useSelector((store: AppStateType) => store.companyInformation.modalWindowStatus);

    // начальный расчет для пагинации

    const pagesCount = Math.ceil(totalCompanyCount / pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        // проверка корректности ввода названия компании, при необходимости вывод модального окна об ошибке. Подгрузка Preloader и отрисовка данных о компании
        <div className={style.wrapperTable}>
            {modalStatus
                ? <ModalWindow/>
                : null
            }

            {loaderStatus
                ? <Loader/>
                : <div>
                    <div>
                        {pages.map(p => {
                            const classes = [];
                            if (currentPage === p) {
                                classes.push(style.selectedPage)
                            }
                            return <span key={p} className={classes.join()} onClick={(e) => {
                                ChangeCurrentPage(p)
                            }}>{p}</span>
                        })}
                    </div>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th>Название репозитория</th>
                            <th>URL репозитория</th>
                            <th>Количество форков</th>
                            <th>Количество watchers</th>
                            <th>Количество звезд</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(i => (
                            <tr key={i.id}>
                                <td>{i.name}</td>
                                <td>{i.html_url}</td>
                                <td>{i.forks_count}</td>
                                <td>{i.watchers_count}</td>
                                <td>{i.stargazers_count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
};
export default Table
