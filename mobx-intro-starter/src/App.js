
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
import { observer } from 'mobx-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

 import TodoStore from './stores/todoStore';

// import ObservableTodoStore from './mobx-class';

// console.log(ObservableTodoStore);
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

@observer
class TodoList extends React.Component {
  render() {
    const store = this.props.store;
    return (
      <div>
        { store.report }
        <ul>
        { store.todos.map(
          (todo, idx) => <TodoView todo={ todo } key={ idx } />
        ) }
        </ul>
        { store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null }
        <button onClick={ this.onNewTodo }>New Todo</button>
        <small> (double-click a todo to edit)</small>

      </div>
    );
  }

  onNewTodo = () => {
    this.props.store.addTodo(prompt('Enter a new todo:','coffee plz'));
  }
}

@observer
class TodoView extends React.Component {
  render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={ this.onRename }>
        <input
          type='checkbox'
          checked={ todo.completed }
          onChange={ this.onToggleCompleted }
        />
        { todo.task }
        { todo.assignee
          ? <small>{ todo.assignee.name }</small>
          : null
        }
      </li>
    );
  }

  onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  onRename = () => {
    const todo = this.props.todo;
    todo.task = prompt('Task name', todo.task) || todo.task;
  }
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
            <TodoList store={ TodoStore } /> 
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
