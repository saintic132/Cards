import React from 'react';
import s from './Preloader.module.css'
import preloader from '../img/Preloader2.svg'


const Preloader = () => {
    return (
        <div className={s.main}>
           <img style={{width: '50px'}} src={preloader} alt='Preloader'/>
        </div>
    );
};

export default Preloader;