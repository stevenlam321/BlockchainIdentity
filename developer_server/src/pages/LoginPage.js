
import React from 'react';
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import DisplayErrors from '../components/DisplayErrors';
import axios from 'axios';
const LoginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

function LoginForm(props){
    const { register, handleSubmit, errors } = useForm({
        validationSchema: LoginSchema
    })
  
    const onSubmit = data => {
        axios.post('/persons/login', data)
          .then(function (response) {
            localStorage.setItem("access_token", response.data);
            const access_token = localStorage.getItem("access_token");
            const formResult = {
                result: "success",
                resultMessage: "Login success"
            };
            props.updateResult(formResult);
            props.updateLoginStatus(true);
          })
          .catch(function (error) {
            const formResult = {
                result: "danger",
                resultMessage: error.response.data.message
            };
            props.updateResult(formResult);
          });
        
    }
    return (<Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="text" name='email' placeholder="Email" id="email" ref={register}/>
                    <DisplayErrors errors={errors.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" id="password" ref={register}/>
                    <DisplayErrors errors={errors.password}/>
                </Form.Group>
                <Button variant="primary" type='submit'>Submit</Button>
    </Form>);
}
export default class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            result: null,
            resultMessage:  null
        };
        this.updateResult=this.updateResult.bind(this);
        this.updateLoginStatus=this.updateLoginStatus.bind(this);

    }
    updateResult(formResult){
        this.setState({
            result: formResult.result,
            resultMessage: formResult.resultMessage
        });
    }
    updateLoginStatus(logined){
        this.props.updateLoginStatus(logined);
    }
   render(){
    
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
            <h1>Login</h1>
            {this.state.result &&
            <Alert variant={this.state.result}>{this.state.resultMessage}</Alert>
            }
                <LoginForm updateResult={this.updateResult} updateLoginStatus={this.updateLoginStatus}/>
            </Col>
        </Row>
    );
    }
  }