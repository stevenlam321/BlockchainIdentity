
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {imagePath} from '../utils';
export default function HomePage(props) {
    const [attributes,setAttributes] = useState([]);
    const [organizations,setOrganizations] = useState([]);
    const [credentials,setCredentials] = useState([]);

    useEffect(()=>{
        axios.get('/attributes').then(response=>{
            setAttributes(response.data);
        });
    
        axios.get('/organizations').then(response=>{
            setOrganizations(response.data);
        });

        axios.get('/credentials').then(response=>{
            setCredentials(response.data);
        });
    },[]);
   
    // axios.get('/attributes').then(response=>{
    //     setAttributes(response.data);
    // });

    return (
        <div>
            <h1>Docs</h1>
            <h3 className="section">Attributes</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {attributes.map( attribute =>(
                    <tr key={attribute.id}>
                        <td>{attribute.id}</td>
                        <td>{attribute.name}</td>
                    </tr>
                )
                )}
                </tbody>
            </table>
            <h3 className="section">Organizations</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Logo</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                {organizations.map( organization =>(
                    <tr key={organization.id}>
                        <td>{organization.id}</td>
                        <td><img src={imagePath(organization.logo)} style={{height:"100px"}}/></td>
                        <td>{organization.name}</td>
                    </tr>
                )
                )}
                </tbody>
            </table>
            <h3 className="section">Credentials</h3>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Issuer</th>
                        <th>Attributes</th>
                    </tr>
                </thead>
                <tbody>
                {credentials.map( credential =>(
                    <tr key={credential.id}>
                        <td>{credential.id}</td>
                        <td>{credential.name}</td>
                        <td>
                            {credential.organization_name}<br/><br/>
                            <img src={imagePath(credential.organization_logo)} style={{height:"100px"}}/>
                            </td>
                        <td>
                        <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                    {credential.attributes.map( attribute =>(
                        <tr key={attribute.attribute_id}>
                            <td>{attribute.attribute_id}</td>
                            <td>{attribute.name}</td>
                        </tr>
                    )
                        )}
                        </tbody>
                    </table>
                        </td>
                    </tr>
                )
                )}
                </tbody>
            </table>
      </div>
  );
}