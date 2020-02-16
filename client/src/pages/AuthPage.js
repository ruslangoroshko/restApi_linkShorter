import React, {useState, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

const AuthPage = () => {
    /*
        CONTEXT  AuthContect include Auth data {token, userId, login(), logout() }
        HOOK useHttp
    */
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    // On input change
    const changeHandler = e => {
        clearError()
        setForm({...form, [e.target.name]: e.target.value})
    }

    // 
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', "POST", {...form})
            console.log(data)
        } catch (e) {

        }
    }

    //
    const authHandler = async () => {
        try {
            const data = await request('/api/auth/login', "POST", {...form})
            auth.login(data.token, data.id)
            console.log(data)
        } catch (e) {

        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6 col-12">

                <h4 className="d-flex justify-content-center mb-3">Log In</h4>
                {error ? (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : null}

                <div className="form-group">
                    <label htmlFor="InputEmail1">Email address</label>
                    <input 
                        onChange={changeHandler}
                        type="email" className="form-control" id="InputEmail1" name="email" placeholder="Enter email"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="InputPassword1">Password</label>
                    <input 
                        onChange={changeHandler}
                        type="password" className="form-control" name="password" id="InputPassword1" placeholder="Password"/>
                </div>
                <div className="btn-group">
                    <button 
                        onClick={authHandler}
                        className="btn btn-primary">Sign In</button>
                    <button 
                        onClick={registerHandler}
                        disabled={loading}
                        type="submit" className="btn btn-link">Register Now</button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage