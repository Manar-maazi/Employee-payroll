import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import UserService from '../Service/UserService';
import {Button, Card, Flex, Form,  Input,   Typography} from 'antd';
import './Login.css';


import loginImage from '../assets/medicament.jpg';
import LoginIcon from '@mui/icons-material/Login';


function Login(){



    const [email, setEmail] = useState('')
const [mot_de_pass, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await UserService.login(email, mot_de_pass)
        if (userData != null && userData.token) {
            localStorage.setItem('token', userData.token)
            localStorage.setItem('role', userData.role)
            if(UserService.isComptable()) {
                navigate('/app/bulletin')
            }
           if(UserService.isAdmin()) {
            navigate('/app/dashboard')
        } 
        }else{
            setError("Email ou Mot de passe sont incorrect")
        }
        console.log(userData)
        
    } catch (error) {
        console.log(error)
        setError("Email ou Mot de passe sont incorrect")
        setTimeout(()=>{
            setError('');
        }, 5000);
    }
}

/*

  const handleLogin = async(values)=>{
    console.log(values);
  };*/
  return (

    <div className="login-page">
    <div className="login-content">
    <Card className="form-container Login body" bodyStyle={{ padding: '2px', width: '1000px' }}  >    
        <Flex  align="center"  >

            {/* form */}
            <Flex vertical flex={1} className='margin_input'>
                <Typography.Title level={3} strong className="title" style={{ color: '#006769' , fontSize: '30px' }}>

                   Bienvenue
                </Typography.Title>
                <Typography.Text type="secondary"  className="slogan" style={{ position: 'relative',color: '#40A578', top: '50px', fontSize: '24px' }}>
                  G.E.B.S
                </Typography.Text>
                    <div style={{ marginTop: '80px' }}>
                    {error && <p className="error-message" style={{ color: '#ff0000 ' , fontSize: '15px', textAlign: 'center', fontWeight: 'bold'}}>{error}</p>}
               <Form layout='vertical' onSubmit={handleSubmit} autoComplete="off"  >
              
                    <Form.Item
                     name="email" 
                     rules={[
                        {
                            required:true,
                            message:'please input your Email!',

                        },
                        {
                            type:'email',
                            message:'the input is not valid Email',
                        },
                    ]}
                    >
                        <Input  size="large" placeholder="entrer votre email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                   </Form.Item>
        <Form.Item
                    
                     name="mot_de_pass" 
                     rules={[
                        {
                            required:true,
                            message:'please input your Password!',

                        },
                    
                    ]}
                    >
                        <Input.Password  type="password"  size="large" placeholder="entrer votre mot de passe"  value={mot_de_pass} onChange={(e) => setPassword(e.target.value)} />

                    </Form.Item>


                    
           
                    

                    {/*
                     error && <Alert description={error} type='error' showIcon closable className="alert"
                    />*/
                    }
                  
                    <Form.Item style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-block' }}> 
                        <Button htmlType="submit" size="large" className="btn" onClick={handleSubmit} style={{ marginBottom: '10px'}} >
                            <LoginIcon style={{ fontSize: 'large', marginRight: 8,marginBottom:4 }} />
                            <span style={{ fontWeight: 'bold' }}>Se connecter</span>
                        </Button>
                        </div>
                    </Form.Item>
               </Form>
               </div>
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <Typography.Text type="secondary" style={{ marginTop: '0px', display: 'block' }}>
                            &copy;{new Date().getFullYear()} Copyright GEBS:
                            <a href="https://pharmagebs.com/" target="_blank" rel="noopener noreferrer">
                                pharmagebs.com
                            </a>
                        </Typography.Text>
                    </div>
            </Flex>

            {/* image */}
            <Flex flex={1} style={{ margin: '10px'}}>
                <img src={loginImage} className='auth-image' alt='myimage' style={{ width: '600px', height: '450px' ,maxWidth:'none'}}/>
            </Flex>
        </Flex>
   
    </Card>
    </div>
    </div>
  )
}

export default Login
