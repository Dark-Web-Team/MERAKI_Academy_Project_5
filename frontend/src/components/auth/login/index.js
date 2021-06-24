import React,{useState} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../../../reducers/login'
import { useHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Container,InputGroup,FormControl,Alert} from "react-bootstrap"
import './login.css'

require (`dotenv`).config()

const Login = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory()

    const dispatch = useDispatch()
    const lastVisited = useSelector(state => state.lastVisited.path)

    const [errMessage, setErrMessage] = useState('');
    const [errPresent, setErrPresent] = useState(false);


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
            console.log(err.response)
            setErrPresent(true)
            setErrMessage(err.response.data)
            throw err
        })
    }


    return (<>
    <div className='login'>
    <Container className='loginArea' >
        <p className="login_text">Login</p> <br/>
    <InputGroup className="mb-3" onChange={(e)=>{
        setEmail(e.target.value)
    }}>
    <FormControl
      placeholder="Enter username"
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  <InputGroup className="mb-3" onChange={(e)=>{
        setPassword(e.target.value)
    }}>
    <FormControl
      placeholder="Enter password"
      aria-label="Password"
      aria-describedby="basic-addon1"
      type='password'
    />
  </InputGroup>
        <Button onClick={handleLogin} size="lg" >Sign in</Button>
        {errPresent && <div><br/> <Alert variant='danger' style={{width:"35vw", textAlign:'center'}}>
    {errMessage}
  </Alert></div>}
    </Container>
    
    </div>
    </>)
}

export default Login;