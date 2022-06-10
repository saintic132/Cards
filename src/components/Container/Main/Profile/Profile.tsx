import React, {useEffect, useState} from 'react';
import style from './Profile.module.css'
import {EditProfile} from "./UserProfile/EditProfile/EditProfile";
import {useAppDispatch, useAppSelector} from "../../../../store/store";
import {setEditProfileAC} from "../../../../store/reducers/profile-reducer";
import {UserProfile} from "./UserProfile/UserProfile";
import {CardsFilter} from "./CardsFilter/CardsFilter";
import {ProfilePacksList} from "./ProfilePacksList/ProfilePacksList";
import {Redirect} from "../../../../common/Redirect/Redirect";
import {PacksCardsFilter} from "../PacksList/PacksCardsFilter/PacksCardsFilter";

type ProfilePropsType = {
    isLoginIn: boolean
    loadProfile?: boolean
}

const Profile: React.FC<ProfilePropsType> = ({loadProfile}: ProfilePropsType) => {

    const [activePage, setActive] = useState<'all' | 'my'>('all');

    const profileData = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()

    const clickToEditProfile = (editMode: boolean) => {
        dispatch(setEditProfileAC(editMode))
    }

    useEffect(() => {
        return () => {
            if (profileData.helpers.editProfile) {
                dispatch(setEditProfileAC(false))
            }
        }
    }, [profileData.helpers.editProfile, dispatch])

    if (profileData.helpers.editProfile) {
        return <EditProfile
            profileData={profileData}
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
                                name={profileData.name}
                                avatar={profileData.avatar}
                                clickToEditProfile={clickToEditProfile}
                            />
                            :
                            <PacksCardsFilter
                                activePage={activePage}
                                setActive={setActive}
                            />
                    }

                    <CardsFilter/>

                </div>
                <div className={style.profile__body_main}>

                    <ProfilePacksList
                        activePage={activePage}
                    />

                </div>
            </div>
        </div>
    );
};

export default Redirect(Profile)