import React, {useEffect} from 'react';
import style from './Profile.module.css'
import {EditProfile} from "./UserProfile/EditProfile/EditProfile";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {setEditProfileAC} from "../../../../store/reducers/profile-reducer";
import {UserProfile} from "./UserProfile/UserProfile";
import {CardsFilter} from "./CardsFilter/CardsFilter";
import {UserPacksList} from "./UserPacksList/UserPacksList";
import {Redirect} from "../../../../common/Redirect/Redirect";
import {PacksCardsFilter} from "../PacksList/PacksCardsFilter/PacksCardsFilter";

type ProfilePropsType = {
    isLoginIn: boolean
    loadProfile?: true
}

const Profile: React.FC<ProfilePropsType> = ({loadProfile}: ProfilePropsType) => {

    const nameProfile = useAppSelector(state => state.profile.name)
    const avatarProfile = useAppSelector(state => state.profile.avatar)
    const isEditProfile = useAppSelector(state => state.profile.helpers.editProfile)


    const dispatch = useAppDispatch()

    const clickToEditProfile = (editMode: boolean) => {
        dispatch(setEditProfileAC(editMode))
    }

    useEffect(() => {
        return () => {
            if (isEditProfile) {
                dispatch(setEditProfileAC(false))
            }
        }
    }, [isEditProfile, dispatch])

    if (isEditProfile) {
        return <EditProfile
            clickToEditProfile={clickToEditProfile}
        />
    }


    return (
        <div className={style.profile__container}>
            <div className={style.profile__body}>
                <div className={style.profile__body_profile}>

                    {
                        loadProfile
                            ?
                            <UserProfile
                                name={nameProfile}
                                avatar={avatarProfile}
                                clickToEditProfile={clickToEditProfile}
                            />
                            :
                            <PacksCardsFilter/>
                    }

                    <CardsFilter/>

                </div>
                <div className={style.profile__body_main}>

                    <UserPacksList
                        loadProfile={loadProfile}
                    />

                </div>
            </div>
        </div>
    );
};

export default Redirect(Profile)