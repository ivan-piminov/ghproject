import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import Loader from "../Loader/Loader";
import {getData} from "../reducer";
import ModalWindow from "../ModalWindow/ModalWindow";
import style from './Table.module.css'


const Table = () => {

    const name = useSelector((store) => store.companyInformation.nameCompany);

    const dispatch = useDispatch();

    const ChangeCurrentPage = (p) => {
        dispatch(getData(name, p))
    };

    //Считывание необходимых значений из store через useSelector

    const data = useSelector((store) => store.companyInformation.data);

    const loaderStatus = useSelector((store) => store.companyInformation.loading);

    const totalCompanyCount = useSelector((store) => store.companyInformation.totalCompanyCount);

    const pageSize = useSelector((store) => store.companyInformation.pageSize);

    const currentPage = useSelector((store) => store.companyInformation.currentPage);

    const modalStatus = useSelector((store) => store.companyInformation.modalWindowStatus);

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
                            return <span className={currentPage === p && style.selectedPage} onClick={(e) => {
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
