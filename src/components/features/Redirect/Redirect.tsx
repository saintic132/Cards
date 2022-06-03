import React from 'react';
import {Navigate} from "react-router-dom";


export function Redirect<T extends { isLoginIn: boolean }>(Component: React.ComponentType<T>) {

    return (props: T) => {
        if (!props.isLoginIn) return <Navigate to="/login"/>
        return (
            <Component {...props}/>
        )
    }
}