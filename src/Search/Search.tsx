import React, {useState} from 'react';
import './Search.css';
import {ActionTypes, newCompanyNameAC} from "../reducer";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";


// компонент поиска компании (считывание значения с инпута, dispatch назавания компании в store)
const Search:React.FC = () => {
    const [name, changeName] = useState<string>('');
    const setNewName = (e:React.ChangeEvent<HTMLInputElement>):void => {
        changeName(e.currentTarget.value)
    };

    const dispatch = useDispatch<Dispatch<ActionTypes>>();

    const findCompany = (name:string):void => {
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
