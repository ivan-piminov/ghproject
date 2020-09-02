import React from "react";
import {useDispatch} from "react-redux";
import {modalWindowStatusAC} from "../reducer";
import style from './ModalWindow.module.css'


const ModalWindow=()=>{

    const dispatch = useDispatch();

    const changeStatus = () => {
        dispatch (modalWindowStatusAC(false))
    };

    return(
       <div className={style.wrapperModal}>
           <div className={style.textModal}>Ошибка, компания не найдена. Попробуйте ввести другое название</div>
           <div>
               <button className="btn btn-primary btn-sm" onClick={changeStatus}> закрыть</button>
           </div>
       </div>
    )
};
export default ModalWindow;


