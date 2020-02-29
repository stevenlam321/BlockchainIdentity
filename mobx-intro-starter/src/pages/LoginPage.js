
import React from 'react';
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import DisplayErrors from '../components/DisplayErrors';
import axios from 'axios';
import { observer,inject } from 'mobx-react';
import { withRouter } from "react-router-dom";

const LoginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
});

function LoginForm(props){
    const { register, handleSubmit, errors } = useForm({
        validationSchema: LoginSchema
    })
  
    const onSubmit = data => {
        props.updateResult({result:null,resultMessage:null});
        props.commonStore.setAppLoaded(false);
        axios.post('/persons/login', data)
          .then(function (response) {
            const access_token = response.data;
            props.commonStore.setToken(access_token);
            const formResult = {
                result: "success",
                resultMessage: "Login success"
            };
            props.updateResult(formResult);
            props.commonStore.setLogined(true);
            props.history.push("/");
          })
          .catch(function (error) {
            const formResult = {
                result: "danger",
                resultMessage: error.response.data.message
            };
            props.updateResult(formResult);
          }).finally(function(){
            props.commonStore.setAppLoaded(true);
          });
        
    }
    return (<Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="text" name='email' value="steven.lam@yahoo.com.hk" placeholder="Email" id="email" ref={register}/>
                    <DisplayErrors errors={errors.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">password</Form.Label>
                    <Form.Control type="password" name='password' value="12345678" placeholder="Password" id="password" ref={register}/>
                    <DisplayErrors errors={errors.password}/>
                </Form.Group>
                <Button variant="primary" type='submit'>Submit</Button>
    </Form>);
}
@inject("commonStore")
@observer
class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            result: null,
            resultMessage:  null
        };
        this.updateResult=this.updateResult.bind(this);
        this.resetResult=this.resetResult.bind(this); 
          
        if(this.props.commonStore.islogined){
            this.props.history.push("/");
        }
    }
    updateResult(formResult){
        this.setState({
            result: formResult.result,
            resultMessage: formResult.resultMessage
        });
    }
    resetResult(){
        this.setState({
            result: null,
            resultMessage: null
        });
    }

   render(){
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
            <h1>Login</h1>
            {this.state.result &&
            <Alert variant={this.state.result}>{this.state.resultMessage}</Alert>
            }
                <LoginForm history={this.props.history} updateResult={this.updateResult} commonStore={this.props.commonStore}/>
            </Col>
        </Row>
    );
    }
  }

  export default LoginPage;
