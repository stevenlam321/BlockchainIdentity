
import dotenv from 'dotenv';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Loading from './components/Loading';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ApplicationPage from './pages/ApplicationPage';
import NotFoundPage from './pages/NotFoundPage';
import {Container,Spinner} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

dotenv.config();

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
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        logined: false,
        loading:true
    };
    this.updateLoginStatus=this.updateLoginStatus.bind(this);
    this.updateLoading=this.updateLoading.bind(this);


}
  componentDidMount(){
    this.setState({
      loading: false
  });
    const access_token = localStorage.getItem("access_token");
    if(access_token){
      this.setState({
        logined: true
    });
    }
    // fetch('http://localhost:8080/attributes/')
    // .then(res => res.json())
    // .then((data) => {
    //   console.log(data);
    //  // this.setState({ contacts: data })
    // })
    // .catch(console.log)
  }
  updateLoginStatus (logined){
    this.setState({
      logined: logined
    });
  }
  updateLoading (loading){
    this.setState({
      loading: loading
    });
  }
  
  render() {
    return (
      <Router>
        <div className="App">
            {this.state.loading && <Loading/>}
            <Header logined={this.state.logined}/>            
            <Container>
            <Switch>
              <Route exact path="/">
                <HomePage/>
              </Route>
               <Route path="/login">
               <LoginPage updateLoginStatus={this.updateLoginStatus}/>
              </Route>
               <Route path="/register">
               <RegisterPage updateLoading={this.updateLoading}/>
              </Route>
              <Route path="/logout">
                  <RegisterPage updateLoading={this.updateLoading}/>
              </Route>
              <PrivateRoute path="/applications">
                  <ApplicationPage />
              </PrivateRoute>
              <Route path="*">
                  <NotFoundPage />
              </Route>
            </Switch>
            </Container>
        </div>
    </Router>
  )
  }
}

export default App;
