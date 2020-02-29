
import React from 'react';
import {Form,Button,Row,Col,Alert} from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import DisplayErrors from '../components/DisplayErrors';
import axios from 'axios';
import { observer,inject } from 'mobx-react';
const RegisterSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8),
    conf_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});
function RegisterForm(props){
    const { register, handleSubmit, errors } = useForm({
        validationSchema: RegisterSchema
    })
  
    const onSubmit = (data, e) => {
        props.commonStore.setLoading(true);
        axios.post('/persons/register', data)
          .then(function (response) {
            e.target.reset(); 
            const formResult = {
                result: "success",
                resultMessage: "Register success"
            };
            props.updateResult(formResult);
          })
          .catch(function (error) {
            const formResult = {
                result: "danger",
                resultMessage: error.response.data.message
            };
            props.updateResult(formResult);
          }).finally(function(){
            props.commonStore.setLoading(false);
          });
        
    }

    return (
    <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control type="text" name='email' placeholder="Email" id="email" ref={register}/>
                    <DisplayErrors errors={errors.email}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="mobile">Mobile</Form.Label>
                    <Form.Control type="text" name='mobile' placeholder="Mobile" id="mobile" ref={register}/>
                    <DisplayErrors errors={errors.mobile}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" id="password" ref={register}/>
                    <DisplayErrors errors={errors.password}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="conf_password">Confirm Password</Form.Label>
                    <Form.Control type="password" name='conf_password' placeholder="Confirm Password" id="conf_password" ref={register}/>
                    <DisplayErrors errors={errors.conf_password}/>
                </Form.Group>
                <Button variant="primary" type='submit'>Submit</Button>
    </Form>);
}
@inject("commonStore")
@observer
class RegisterPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            result: null,
            resultMessage:  null
        };
        this.updateResult=this.updateResult.bind(this);
    }
    updateResult(formResult){
        this.setState({
            result: formResult.result,
            resultMessage: formResult.resultMessage
        });
    }

   render(){
    
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }}>
            <h1>Register</h1>
            {this.state.result &&
            <Alert variant={this.state.result}>{this.state.resultMessage}</Alert>
            }
                <RegisterForm updateResult={this.updateResult} commonStore={this.props.commonStore}/>
            </Col>
        </Row>
    );
    }
  }
  export default RegisterPage;