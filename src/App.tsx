import React, {useEffect} from 'react';
import './App.css';
import Routess from "./Components/features/Routes/Routes";
import NavBar from "./Components/features/NavBar/NavBar";
import {useSelector} from "react-redux";
import {AppStoreType, useAppDispatch} from "./Bll/store";
import {isAuthUser} from './Bll/reducers/profile-reducer';

function App() {

    const isInitializedContent = useSelector<AppStoreType, boolean>(state => state.profile.helpers.initializedContent)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isInitializedContent) {
            dispatch(isAuthUser())
        }
    }, [dispatch, isInitializedContent])

    return (
        <div className="App">
            {
                isInitializedContent &&
                <>
                    <NavBar/>
                    <Routess/>
                </>
            }
        </div>
    );
}

export default App;
