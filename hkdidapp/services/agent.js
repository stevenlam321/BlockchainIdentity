import axios from 'axios';

export const API_ROOT = 'http://localhost:8080';
//const API_ROOT = 'https://conduit.productionready.io/api';

export function imagePath(path){
    return API_ROOT + '/img/' + path;
}

const encode = encodeURIComponent;
const responseBody = res => res.data;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    axios.del(`${API_ROOT}${url}`).then(responseBody).catch(x=>x.response.data),
  get: url =>
    axios.get(`${API_ROOT}${url}`).then(responseBody).catch(x=>x.response.data),
  put: (url, body) =>
    axios.put(`${API_ROOT}${url}`, body).then(responseBody).catch(x=>x.response.data),
  post: (url, body) =>
    axios.post(`${API_ROOT}${url}`, body).then(responseBody).catch(x=>x.response.data)
};

const Auth = {
  me: () =>
    requests.get('/persons/me'),
  login: (email, password) =>
    requests.post('/persons/login', { email, password }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
};



export default {
  Auth,
  setToken: _token => { token = _token; }
};
