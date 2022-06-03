import React, {memo, useEffect, useState} from 'react';
import style from './EditProfile.module.css'
import SuperButton from "../../../../../../common/c4-common_buttons/c2-SuperButton/SuperButton";
import {useAppDispatch} from "../../../../../../store/store";
import noAvatar from '../../../../../../assets/a1-img/no-avatar.png'
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {
    editProfileThunk,
    InitialProfileStateType,
    setErrorToProfileAC
} from "../../../../../../store/reducers/profile-reducer";

type EditProfilePropsType = {
    profileData: InitialProfileStateType
    clickToEditProfile: (editProfile: boolean) => void
}

type FormikValues = {
    name: string
    avatar: string | undefined | null
}

export const EditProfile = memo(({profileData, clickToEditProfile}: EditProfilePropsType) => {

    const dispatch = useAppDispatch()

    const [showUploadAvatar, setShowUploadAvatar] = useState<boolean>(false);

    const cancelToEditProfile = () => {
        clickToEditProfile(false)
    }

    const initialValues: FormikValues = {
        name: profileData.name,
        avatar: null,
    }
    const validate = Yup.object({
        name: Yup.string().max(40, 'Max length is 15').required('Required'),
    })
    const onSubmit = (values: FormikValues) => {
        let {name, avatar} = values
        if ((name === profileData.name && avatar === null) || avatar === profileData.avatar) {
            clickToEditProfile(false)
        } else if (!avatar) {
            dispatch(editProfileThunk(name))
        } else {
            dispatch(editProfileThunk(name, avatar))
        }
    }

    useEffect(() => {
        dispatch(setErrorToProfileAC(null))
    }, [dispatch])

    return (
        <div className={style.editProfile__container}>
            <div className={style.editProfile__edit_body}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validate}
                    onSubmit={onSubmit}
                >
                    <Form className={style.editProfile__edit}>
                        <h2>Personal Information</h2>
                        <img
                            className={style.editProfile__img_avatar}
                            src={profileData.avatar ? noAvatar : profileData.avatar}
                            alt="avatar"
                            onClick={() => setShowUploadAvatar(!showUploadAvatar)}
                        />

                        {/*Добавление по специальной картинке - добавить*/}

                        {/*<img*/}
                        {/*    className={style.editProfile__img_add_new_photo}*/}
                        {/*    src={newPhoto}*/}
                        {/*    alt='new'*/}
                        {/*    onClick={() => setShowUploadAvatar(!showUploadAvatar)}*/}
                        {/*/>*/}
                        {
                            !showUploadAvatar &&
                            <div className={style.fakeDivAvatarUrl}/>
                        }
                        {
                            showUploadAvatar &&
                                <Field
                                    className={style.editProfile__edit_input}
                                    name='avatar'
                                    type='text'
                                    placeholder='Enter url or base64'
                                />
                        }
                        <div className={style.editProfile__edit}>
                            <label>Nickname</label>
                            <Field
                                className={style.editProfile__edit_input}
                                name='name'
                                placeholder='Enter your name'
                            />
                            <ErrorMessage name="name" component="div"
                                          className={style.editProfile__edit_error}/>
                        </div>
                        <div className={style.editProfile__edit}>
                            <label>Email</label>
                            <Field
                                className={style.editProfile__edit_input}
                                name='email'
                                placeholder='Enter your email'
                                value={profileData.email}
                            />
                            <ErrorMessage name="email" component="div"
                                          className={style.editProfile__edit_error}/>
                        </div>
                        {
                            !profileData.errorMessage &&
                            <div className={style.fakeDiv}/>
                        }
                        {
                            profileData.errorMessage &&
                            <div className={style.editProfile__edit_server_error}>
                                {profileData.errorMessage}
                            </div>
                        }
                        <div className={style.editProfile__edit_buttons}>
                            <SuperButton
                                className={style.editProfile__edit_buttonCancel}
                                type="reset"
                                onClick={cancelToEditProfile}
                            >
                                Cancel
                            </SuperButton>
                            <SuperButton
                                className={style.editProfile__edit_buttonSave}
                                type='submit'
                                disabled={profileData.disableButton}
                            >
                                Save
                            </SuperButton>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
})