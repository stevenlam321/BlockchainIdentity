
import React from 'react';
import {Button} from 'react-bootstrap';
import { observer,inject } from 'mobx-react';
import ApplicationForm from '../components/ApplicationForm';
import EditApplicationForm from '../components/EditApplicationForm';


@inject("commonStore","applicationStore")
@observer
class ApplicationPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            showEdit:false,
            application:null
        };
        this.showEditForm = this.showEditForm.bind(this);
        this.closeEditForm = this.closeEditForm.bind(this);
        
    }
    componentDidMount(){
       this.props.applicationStore.loadApplications();
    }
    showLetterName(name){
        return name.substring(0,1).toUpperCase();
    }
    showSecret(secret){
       alert(secret);
    }
    showEditForm(application){
        this.setState({showEdit:true,application});
    }
    closeEditForm(){
        this.setState({showEdit:false});
    }
    
    render(){
        var applications = this.props.applicationStore.applications;
        return (
        <div>
            <h1>Applications</h1>
            <ApplicationForm commonStore={this.props.commonStore} applicationStore={this.props.applicationStore}/>
            <EditApplicationForm commonStore={this.props.commonStore} applicationStore={this.props.applicationStore} show={this.state.showEdit}
             closeEditForm={this.closeEditForm} application={this.state.application}/>
            <ul className="row applications">
                {
                    applications.map((application)=>{
                        return (
                        <li className="col-lg-4 col-md-6" key={application.id}>
                        <div className="row">
                            <div className="col-4">
                                 <div className="embed-responsive embed-responsive-1by1" onClick={()=>this.showEditForm(application)}>
                                     <div className="embed-responsive-item">
                                        <div className="application-c-name">{this.showLetterName(application.name)}</div>
                                     </div>
                                 </div>
                            </div>
                            <div className="col-8">
                            <div className="application-name" onClick={()=>this.showEditForm(application)}>{application.name}</div>
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