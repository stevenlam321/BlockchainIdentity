
import React,{useState} from 'react';
import {Button,Modal,Form} from 'react-bootstrap';
import { observer,inject } from 'mobx-react';
import { useForm } from 'react-hook-form'
import * as yup from 'yup';
import DisplayErrors from '../components/DisplayErrors';
import axios from 'axios';

const createSchema = yup.object().shape({
    name: yup.string().required().max(30),
    public_key: yup.string().required(),
});

function ApplicationForm(props){
    const { register, handleSubmit, errors } = useForm({
        validationSchema: createSchema
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
  
    const onSubmit = data => {
       const token = props.commonStore.token;
        props.commonStore.setLoading(true);
        axios.post('/applications', data)
          .then(function (response) {
            props.addApplication(response.data);
            handleClose();
          })
          .catch(function (error) {
            // const formResult = {
            //     result: "danger",
            //     resultMessage: error.response.data.message
            // };
            // props.updateResult(formResult);
          }).finally(function(){
            props.commonStore.setLoading(false);
          });
        
    }
    const submit = () => {
        
    }
    return (
        <div>
        <Button variant="primary" onClick={handleShow}>
        Create App
        </Button>
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title>Create a New App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)} id="form">
                    <Form.Group>
                        <Form.Label htmlFor="name">App Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="App Name" id="name" ref={register}/>
                        <DisplayErrors errors={errors.name}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="public_key">Public Key</Form.Label>
                        <Form.Control as="textarea" rows="5" name='public_key' placeholder="Public Key" id="public_key" ref={register}/>
                        <DisplayErrors errors={errors.public_key}/>
                    </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="primary" form='form' type="submit" onClick={submit}>
            Create
        </Button>
        </Modal.Footer>
    </Modal>
    </div>);
}


@inject("commonStore","applicationStore")
@observer
class ApplicationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            applications:[]
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.submitCreateApp = this.submitCreateApp.bind(this);
        this.addApplication = this.addApplication.bind(this);

    }
    componentDidMount(){
        const applications = [{"id":"APP-948uun1lfq","type":"did.application","person_id":"P-dbafu21xer","name":"fuck","secret":"bda62dd9d12090a3584ced28725424cfac1fdb32","public_key":"hfidskhfskhfks"},{"id":"APP-reb8oendb0","type":"did.application","person_id":"P-dbafu21xer","name":"haha","secret":"5ec3453825f0edbd495115f03c4d0bde3b097797","public_key":"hdisdhsdhis"},{"id":"APP-ru1kmndpxi","type":"did.application","person_id":"P-dbafu21xer","name":"fuck","secret":"188708d55a09f39d9b40b67f28e1aba63ac0d80d","public_key":"hfidskhfskhfks"},{"id":"APP-v399zcyato","type":"did.application","person_id":"P-dbafu21xer","name":"HKCC3","secret":"0aac64ff79b80715cf6799bf1a78c10b150f5ec3","public_key":"fuck2"},{"id":"APP-v3wj5k71lp","type":"did.application","person_id":"P-dbafu21xer","name":"HKCC3","secret":"79100c757d9bfa25d9c99e6b61c79a3c2b76a0c2","public_key":"fuck2"},{"id":"APP-w78uo9oums","type":"did.application","person_id":"P-dbafu21xer","name":"wddw","secret":"839e59e4301f15054c6732c0fe9ce72ff72d1c3f","public_key":"wdw"},{"id":"APP-wpg484axbb","type":"did.application","person_id":"P-dbafu21xer","name":"HKCC3","secret":"9bd034c89386e92c3411eb31635397534c5d9717","public_key":"fuck2"}];
        this.setState({
            applications
        });
        // const token = this.props.commonStore.token;
        // this.props.commonStore.setLoading(true);
        // axios.get('/applications')
        //   .then(response => {
        //       this.setState({
        //           applications:response.data
        //       }); 
        //     console.log(response);
        //   })
        //   .catch(error => {
        //       alert(error.message);
        //   }).finally(()=>{
        //    this.props.commonStore.setLoading(false);
        //   });
    }
    handleClose(){
        this.setState({show:false});
    }
    handleShow(){
        this.setState({show:true});
    }
    submitCreateApp(){
        this.setState({show:false});
    }
    showLetterName(name){
        return name.substring(0,1).toUpperCase();
    }
    showSecret(secret){
       alert(secret);
    }
    addApplication(application){
        this.setState(prevState => ({
            applications: [ application, ...prevState.applications]
        }))
    }
     
    
    render(){
        var applications = this.props.applicationStore.applications;
        return (
        <div>
            <h1>Applications</h1>
            <ApplicationForm commonStore={this.props.commonStore} addApplication={this.addApplication}/>
            <ul className="row applications">
                {
                    applications.map((application)=>{
                        return (
                        <li className="col-lg-4 col-md-6" key={application.id}>
                        <div className="row">
                            <div className="col-4">
                                 <div className="embed-responsive embed-responsive-1by1">
                                     <div className="embed-responsive-item">
                                        <div className="application-c-name">{this.showLetterName(application.name)}</div>
                                     </div>
                                 </div>
                            </div>
                            <div className="col-8">
                            <div className="application-name">{application.name}</div>
                                 <div className="application-id">App ID: {application.id} </div>
                                 <div className="application-id">App Secret: <Button variant="outline-secondary" className="show-secret" onClick={()=>{this.showSecret(application.secret)}}>Show</Button></div>
                            </div>
                        </div>
                     </li>)
                    })
                }
              

            </ul>
        </div>
        )
    }
  
}
export default ApplicationPage;