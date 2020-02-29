
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
import {Container,Spinner} from 'react-bootstrap';
import { observer,inject } from 'mobx-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";
import { HashRouter } from "react-router-dom";
dotenv.config();
const history = createBrowserHistory();

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    console.log(cb);
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};


function isLoggedin(){
  const access_token = localStorage.getItem("access_token");
  if(access_token){
    return true;
  }else{
    return false;
  }
}
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
            {!this.props.commonStore.appLoaded && <Loading/>}
            <Header logined={this.props.commonStore.islogined} commonStore={this.props.commonStore}  history={history}/>            
            <Container>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/login"  component={LoginPage}/>
              <Route path="/register" component={RegisterPage}/>
              <PrivateRoute path="/applications" logined={this.props.commonStore.islogined}>
                  <ApplicationPage/>
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
