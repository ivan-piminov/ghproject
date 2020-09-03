import React, {useState} from 'react';
import './Search.css';
import {newCompanyNameAC} from "../reducer";
import {useDispatch} from "react-redux";


// компонент поиска компании (считывание значения с инпута, dispatch назавания компании в store)
const Search = () => {
    const [name, changeName] = useState('');
    const setNewName = (e) => {
        changeName(e.currentTarget.value)
    };

    const dispatch = useDispatch();

    const findCompany = (name) => {
        dispatch(newCompanyNameAC(name))
    };

    return (
        <div>
            <div className='wrapper'>
                <input type="text" placeholder='введите название' required value={name} onChange={setNewName}/>
                <button onClick={() => findCompany(name)} type="button" className="btn btn-primary btn-sm">поиск
                </button>
            </div>
            <div><span>Название компании: {name}</span></div>
        </div>

    );
};

export default Search;
