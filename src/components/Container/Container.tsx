import {Main} from "./Main/Main";
import React from "react";
import {Nav} from "./Nav/Nav";
import style from './Container.module.css'

export function Container() {
    return (
        <div className={style.container}>
            <Nav />
            <Main/>
        </div>
    )
}