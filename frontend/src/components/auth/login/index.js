import React,{useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../../reducers/login'
import { useHistory } from 'react-router';
import './login.css'

require (`dotenv`).config()

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory()

    const dispatch = useDispatch()
    const lastVisited = useSelector(state => state.lastVisited.path)


    const handleLogin = ()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER}login`,{
            email,
            password
        })
        .then((result)=>{
            dispatch(setToken(result.data.token));
            localStorage.setItem('token',result.data.token);
            history.push('/')
        }).catch((err)=>{
            console.log(err.response.data)
            throw err
        })
    }


    return (<>
    <div>
        <input placeholder='Enter email' type='text' onChange={(e)=>{
            setEmail(e.target.value)
        }} /> <br/>
        <input placeholder='Enter password' type='password' onChange={(e)=>{
            setPassword(e.target.value)
        }} /> <br/>
        <button onClick={handleLogin} >Sign in</button>
    </div>
    </>)
}

export default Login;