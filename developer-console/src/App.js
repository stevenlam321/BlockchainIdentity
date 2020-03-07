
import dotenv from 'dotenv';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Loading from './components/Loading';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplicationPage from './pages/ApplicationPage';
import NotFoundPage from './pages/NotFoundPage';
import LogoutPage from './pages/LogoutPage';
import {Container} from 'react-bootstrap';
import { observer,inject } from 'mobx-react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createBrowserHistory } from "history";
dotenv.config();
const history = createBrowserHistory();


@inject("commonStore")
@observer
class App extends React.Component {
  constructor(props){
    super(props);
}
  componentDidMount(){
    // fetch('http://localhost:8080/attributes/')
    // .then(res => res.json())
    // .then((data) => {
    //   console.log(data);
    //  // this.setState({ contacts: data })
    // })
    // .catch(console.log)
  }
 
  render() {
    return (
      <Router>
        <div className="App">
            {this.props.commonStore.loading && <Loading/>}
            <Header logined={this.props.commonStore.islogined} commonStore={this.props.commonStore}  history={history}/>            
            <Container className="content">
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/login"  component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              <PrivateRoute path="/applications" logined={this.props.commonStore.islogined}>
                <ApplicationPage/>
              </PrivateRoute>
              <PrivateRoute path="/logout" logined={this.props.commonStore.islogined}>
                  <LogoutPage/>
              </PrivateRoute>
            
              
              <Route path="*" component={NotFoundPage}/>
            </Switch>
            </Container>
        </div>
    </Router>
  )
  }
}

export default App;
