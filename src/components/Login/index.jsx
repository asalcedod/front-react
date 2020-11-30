import React, { useState, useEffect } from 'react';
import { baseUrl } from './../constants/url'
import md5 from 'md5';
import PasswordModal from './PasswordModal'
import Logo from './Logo/Logo';
import Label from './Label/Label';
import Input from './Input/Input'
import axios from 'axios'
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import { confirmAlert } from 'react-confirm-alert';
import './../../styles/react-confirm-alert.css';

const Login = (props) => {
    const cookies = new Cookies()
    const [form, setForm] = useState({
        identification: '',
        password: ''
    });
    const [identificationError, setIdentificationError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [email, setEmail] = useState('');
    const [hasError, setHasError] = useState(false);

    const login = async () => {
        await axios.get(baseUrl + `users/${form.identification}/${form.password}`)
            .then(response => {
                return response.data
            }).then(response => {
                ifMatch(response)
            }).catch(err => {
                setHasError(true);
                alert(err)
            })
    }

    useEffect(() => {
        if (cookies.get('form')) {
            props.history.push('/Submit');
        }
    })

    const handleChange = e => {
        const { name, value } = e.target
        setPasswordError(false)
        setIdentificationError(false)
        if (name === "password") {
            if (value.length < 6) {
                setPasswordError(true);
                setForm({
                    ...form,
                    [name]: null
                })
            }
            else {
                setPasswordError(false);
                setForm({
                    ...form,
                    [name]: md5(value)
                })
            }
        } else {
            if (value.length < 2) {
                setIdentificationError(true);
                setForm({
                    ...form,
                    [name]: null
                })
            }
            else {
                setIdentificationError(false);
                setForm({
                    ...form,
                    [name]: value
                })
            }
        }
    };

    const ifMatch = (param) => {
        if (param.identification === form.identification && param.password === form.password) {
            cookies.set('form', param, { path: '/' })
            // setIsLogin(true);
            props.history.push('/Submit');
        }
        else {
            // setIsLogin(false);
            setEmail(param)
            setHasError(true)
            confirmAlert({
                title: 'Password or username incorrect',
                message: 'Do you want to try with another user?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => window.location.reload()
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }
    }

    return (
        <div className='login-container'>
            <div className='login-content'>
                <Logo />
                {hasError &&
                    <lable className='label-alert'>
                        Your password or username are incorrect or do not exist.
                    </lable>
                }
                <Label text='User' />
                <div>
                    <i className="fa fa-user form-control-feedback"></i>
                    <Input
                        attribute={{
                            id: 'identification',
                            name: 'identification',
                            type: 'text',
                            placeholder: 'Enter your user'
                        }}
                        handleChange={handleChange}
                        param={identificationError}
                    />
                </div>
                <Label text='Password' />
                <div>
                    <i className="fa fa-lock form-control-feedback"></i>
                    <Input
                        attribute={{
                            id: 'password',
                            name: 'password',
                            type: 'Password',
                            placeholder: 'Enter your password'
                        }}
                        handleChange={handleChange}
                        param={passwordError}
                    />
                </div>
                {passwordError &&
                    <label className='label-error'>
                        invalid or incorrect password
                    </label>
                }

                <div className='submit-button-container'>
                    <button onClick={() => login()} className='submit'>
                        Login
                    </button>
                </div>
                {email.email ? <PasswordModal userLogin={email} /> : null}
            </div>
        </div>
    )
};

export default Login;
