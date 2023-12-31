import { useState, useEffect } from "react"

import { FaSignInAlt } from "react-icons/fa"
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import { login, reset } from "../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import Spinner from "../components/Spinner"

const Login = () => {




    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    const [formData, setFormData] = useState({

        email: '',
        password: '',
    })

    const {email, password} = formData


    useEffect(()=> {
        if(isError){
            toast.error(message)
        }
        //REdirect when logged in
        if(isSuccess || user ){
            navigate('/')

        }
        dispatch(reset())

    }, [isError, isSuccess, user, message, navigate, dispatch])







    const onChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }) )
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))


    }

    if(isLoading){
        return <Spinner />

    }
  return (
    <>
        <section className="heading">
            <h1>
                <FaSignInAlt /> Login


            </h1>
            <p>Please Login to get Support</p>


        </section>
        <section className="form">
            <form onSubmit={onSubmitHandler}>



                <div className="form-group">
                    <input type='text'
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange = {onChangeHandler}
                    placeholder = 'Enter your email'
                    required

                    />


                </div>

                <div className="form-group">
                    <input type='password'
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange = {onChangeHandler}
                    placeholder = 'Enter your password'
                    required

                    />


                </div>




                <div className="form-group">
                    <button className="btn btn-block">
                        Submit
                    </button>

                </div>
            </form>
        </section>



    </>
  )
}

export default Login