import { observable, action, reaction ,computed } from 'mobx';
// import agent from '../agent';

class CommonStore {

  @observable appName = 'Conduit';
  @observable token = window.localStorage.getItem('access_token');
  @observable loading = false;
  @observable logined = false;

  @observable tags = [];
  @observable isLoadingTags = false;

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

  // @action loadTags() {
  //   this.isLoadingTags = true;
  //   return agent.Tags.getAll()
  //     .then(action(({ tags }) => { this.tags = tags.map(t => t.toLowerCase()); }))
  //     .finally(action(() => { this.isLoadingTags = false; }))
  // }

  @action setToken(token) {
    this.token = token;
  }

}

export default new CommonStore();
