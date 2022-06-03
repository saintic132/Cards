import SuperInputText from "../../../common/c4-common_buttons/c1-SuperInputText/SuperInputText"
import SuperCheckbox
    from "../../../common/c4-common_buttons/c3-SuperCheckbox/SuperCheckbox";
import SuperButton from "../../../common/c4-common_buttons/c2-SuperButton/SuperButton";
import style from './Login.module.css'
import {ForgotPass} from "../ForgotPass/ForgotPass";
import {useFormik} from "formik";
import {loginTC} from "../../../store/reducers/profile-reducer";
import {useAppDispatch, useAppSelector} from "../../../store/store";
import {Navigate} from "react-router-dom";
import * as Yup from 'yup';

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.profile.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(5, 'Must be 5 characters at least')
                .required('Required'),
        }),
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={style.login__container}>
            <div className={style.login__body}>
                <h1 className={style.title}>It-incubator</h1>
                <h2 className={style.subtitle}>Sign In</h2>

                <form className={style.form} onSubmit={formik.handleSubmit}>
                    <label>Email</label>
                    <SuperInputText className={style.inputText}
                                    placeholder='Enter your email' {...formik.getFieldProps('email')}/>
                    {formik.touched.email && formik.errors.email &&
                    <div style={{color: 'red'}}>{formik.errors.email}</div>}

                    <label>Password</label>
                    <SuperInputText className={style.inputText}
                                    placeholder='Enter your password' {...formik.getFieldProps('password')}/>
                    {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red'}}>{formik.errors.password}</div>}

                    <SuperCheckbox className={style.inputCheckbox} {...formik.getFieldProps('rememberMe')}>Remember
                        me</SuperCheckbox>
                    <ForgotPass className={style.forgotPass}/>
                    <div className={style.btnContainer}>
                        <SuperButton className={style.btn} type={'submit'}>Login</SuperButton>
                    </div>
                </form>

                <div className={style.helpBlock}>
                    <a href={'#'}>Don’t have an account?</a><br/>
                    <a href={'#'}>Sign Up</a>
                </div>
            </div>
        </div>
    )
};