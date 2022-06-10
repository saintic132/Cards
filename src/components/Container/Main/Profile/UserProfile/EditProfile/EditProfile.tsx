import React, {memo, useEffect, useState} from 'react';
import style from './EditProfile.module.css'
import SuperButton from "../../../../../../common/buttons/c2-SuperButton/SuperButton";
import {useAppDispatch, useAppSelector} from "../../../../../../store/store";
import noAvatar from '../../../../../../assets/img/avatar/no-avatar.png'
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {editProfileThunk, setErrorToProfileAC} from "../../../../../../store/reducers/profile-reducer";

type EditProfilePropsType = {
    clickToEditProfile: (editProfile: boolean) => void
}

type FormikValues = {
    name: string
    avatar: string | undefined | null
}

export const EditProfile = memo(({clickToEditProfile}: EditProfilePropsType) => {

    const nameProfile = useAppSelector(state => state.profile.name)
    const avatarProfile = useAppSelector(state => state.profile.avatar)
    const emailProfile = useAppSelector(state => state.profile.email)
    const errorMessage = useAppSelector(state => state.profile.helpers.errorMessage)
    const disableButton = useAppSelector(state => state.profile.helpers.disableButton)

    const dispatch = useAppDispatch()

    const [showUploadAvatar, setShowUploadAvatar] = useState<boolean>(false);

    const cancelToEditProfile = () => {
        clickToEditProfile(false)
    }

    const initialValues: FormikValues = {
        name: nameProfile,
        avatar: avatarProfile,
    }
    const validate = Yup.object({
        name: Yup.string().max(40, 'Max length is 15').required('Required'),
    })
    const onSubmit = (values: FormikValues) => {
        let {name, avatar} = values
        if ((name === nameProfile && avatar === null) || avatar === avatarProfile) {
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
                            src={avatarProfile ? noAvatar : avatarProfile}
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
                                value={emailProfile}
                            />
                            <ErrorMessage name="email" component="div"
                                          className={style.editProfile__edit_error}/>
                        </div>
                        {
                            !errorMessage &&
                            <div className={style.fakeDiv}/>
                        }
                        {
                            errorMessage &&
                            <div className={style.editProfile__edit_server_error}>
                                {errorMessage}
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
                                disabled={disableButton}
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