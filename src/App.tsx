import React, {useEffect} from 'react';
import {Container} from "./components/Container/Container";
import {useAppDispatch, useAppSelector} from "./store/store";
import {isAuthUser} from "./store/reducers/profile-reducer";

function App() {

    const isInitializedContent = useAppSelector(state => state.profile.helpers.initializedContent)


    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isInitializedContent) {
            dispatch(isAuthUser())
        }
    }, [dispatch, isInitializedContent])

    return (
        <>
            {
                isInitializedContent && <Container/>
            }
        </>
    )
}

export default App;
