import React, {ChangeEvent, useState} from 'react';
import {useSelector} from 'react-redux';

import {Navigate} from 'react-router-dom';

import styles from './Profile.module.css';
import {AppStoreType, useAppDispatch} from "../../Bll/store";
import {changeUserNameInfoAC, changeUserNameTC} from '../../Bll/reducers/profile-reducer';
import Preloader from "../../Common/Preloader/Preloader";

const Profile = () => {

    const auth = useSelector<AppStoreType, boolean>(state => state.profile.helpers.isLoggedIn);
    const user = useSelector<AppStoreType, any>(state => state.profile);
    const loadingStatus = useSelector<AppStoreType, boolean>(state => state.profile.helpers.loadingStatus) // for preloader
    const userName = useSelector<AppStoreType, string>(state => state.profile.name)

    const [toggleInput, setToggleInput] = useState<boolean>(false)
    const [toggleChangeImageInput, setToggleChangeImageInput] = useState<boolean>(false)
    const [urlNewImage, setUrlNewImage] = useState<string>('')

    const dispatch = useAppDispatch()

    const onBlurHandler = () => {
        dispatch(changeUserNameTC({name: userName}))
        setToggleInput(false)
    }

    const onBlurHandlerForImage = () => {
        if (urlNewImage !== '') {
            dispatch(changeUserNameTC({avatar: urlNewImage}))
            setToggleChangeImageInput(false)
        } else {
            setToggleChangeImageInput(false)
        }
    }

    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeUserNameInfoAC(e.currentTarget.value))
        console.log(userName)
    }

    if (!auth) return <Navigate to="/login"/>;

    if (loadingStatus && !user) {
        return <Preloader/>
    }


    return (
        user && (
            <div className={styles.container}>
                <div className={styles.profile}>
                    <div className={styles.profile_info}>

                        {
                            toggleChangeImageInput
                                ? <div className={styles.inputForImage}>
                                    <input
                                        onChange={(e) => {
                                            setUrlNewImage(e.currentTarget.value)
                                        }}
                                        autoFocus
                                        placeholder={"url for new avatar"}
                                        onBlur={onBlurHandlerForImage}/>
                                </div>
                                : <img
                                    onDoubleClick={() => setToggleChangeImageInput(true)}
                                    src={user.avatar}
                                    alt="avatar"
                                    className={styles.avatar}/>
                        }

                        {
                            toggleInput
                                ? <input
                                    autoFocus
                                    value={userName}
                                    onChange={onChangeText}
                                    onBlur={onBlurHandler}/>
                                : <span
                                    style={{cursor: 'pointer'}}
                                    onDoubleClick={() => setToggleInput(true)}
                                    className={styles.name}
                                >
                                    {user.name}
                            </span>
                        }

                        <span className={styles.job}>Frontend Developer</span>
                    </div>
                </div>
            </div>
        )
    );
}

export default Profile;