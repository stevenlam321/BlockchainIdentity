import { observable, action, reaction ,computed } from 'mobx';
// import agent from '../agent';

class CommonStore {
  @observable token = window.localStorage.getItem('access_token');
  @observable loading = false;
  @observable logined = false;


   constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('access_token', token);
        } else {
          window.localStorage.removeItem('access_token');
        }
      }
    );
  }


  @action setLoading(loading) {
    this.loading = loading;
  }

  @action setLogined(logined) {
    this.logined = logined;
  }
  @action logout() {
    this.token = null;
  }

  @computed get islogined(){
      return this.token!=null;
  }

  @action setToken(token) {
    this.token = token;
  }

}

export default new CommonStore();
