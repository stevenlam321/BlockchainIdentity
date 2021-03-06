import { ADD_TODO, TOGGLE_TODO, SET_FILTER,LOGIN,LOGOUT, SET_LOADING ,
  SET_TOKEN,SET_PERSON,} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

export const login = (email,password) => ({type:LOGIN,payload:{email,password}});

export const setLoading = loading => ({type:SET_LOADING,payload:{loading}});

export const setToken = token => ({type:SET_TOKEN,payload:{token}});

export const setPerson = person => ({type:SET_PERSON,payload:{person}});

