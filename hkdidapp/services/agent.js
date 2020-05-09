import axios from 'axios';

// export const API_ROOT = 'http://localhost:8080';
export const API_ROOT = 'http://192.168.1.183:8080';
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
    axios.del(`${API_ROOT}${url}`).then(responseBody),
  get: url =>
    axios.get(`${API_ROOT}${url}`).then(responseBody),
  put: (url, body) =>
    axios.put(`${API_ROOT}${url}`, body).then(responseBody),
  post: (url, body) =>
    axios.post(`${API_ROOT}${url}`, body).then(responseBody)
};

const Auth = {
  me: () =>
    requests.get('/persons/me'),
  login: (email, password) =>
    requests.post('/persons/login', { email, password }),
  register: (email, password) =>
    requests.post('/persons/register', {email, password})
};
const Application = {
  showApplicationRequest: (app_id,person_id,credentials) =>{
    console.log(app_id,person_id,credentials);
    return requests.post('/applications/request_info',{app_id,person_id,credentials})
  }
};

export default {
  Auth,
  Application,
  setToken: _token => { token = _token; }
};
