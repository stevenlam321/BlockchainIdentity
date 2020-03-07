import { observable, action} from 'mobx';
import axios from 'axios';
import commonStore from './commonStore';
class applicationStore {

  @observable applications = []
  @observable loading = false;

  constructor() {
   // this.applications = [{ "id": "APP-d8uun1lfq", "type": "did.application", "person_id": "P-dbafu21xer", "name": "fuck", "secret": "bda62dd9d12090a3584ced28725424cfac1fdb32", "public_key": "hfidskhfskhfks" }, { "id": "APP-reb8oendb0", "type": "did.application", "person_id": "P-dbafu21xer", "name": "haha", "secret": "5ec3453825f0edbd495115f03c4d0bde3b097797", "public_key": "hdisdhsdhis" }, { "id": "APP-ru1kmndpxi", "type": "did.application", "person_id": "P-dbafu21xer", "name": "fuck", "secret": "188708d55a09f39d9b40b67f28e1aba63ac0d80d", "public_key": "hfidskhfskhfks" }, { "id": "APP-v399zcyato", "type": "did.application", "person_id": "P-dbafu21xer", "name": "HKCC3", "secret": "0aac64ff79b80715cf6799bf1a78c10b150f5ec3", "public_key": "fuck2" }, { "id": "APP-v3wj5k71lp", "type": "did.application", "person_id": "P-dbafu21xer", "name": "HKCC3", "secret": "79100c757d9bfa25d9c99e6b61c79a3c2b76a0c2", "public_key": "fuck2" }, { "id": "APP-w78uo9oums", "type": "did.application", "person_id": "P-dbafu21xer", "name": "wddw", "secret": "839e59e4301f15054c6732c0fe9ce72ff72d1c3f", "public_key": "wdw" }, { "id": "APP-wpg484axbb", "type": "did.application", "person_id": "P-dbafu21xer", "name": "HKCC3", "secret": "9bd034c89386e92c3411eb31635397534c5d9717", "public_key": "fuck2" }];
  }


  @action setLoading(loading) {
    this.loading = loading;
  }

  @action loadApplications() {
    this.isLoading = true;
    commonStore.setLoading(true);
    axios.get('/applications')
          .then((response) => {
            this.applications = response.data;
          })
          .catch(function (error) {
            console.log(error);
          }).finally(function(){
            commonStore.setLoading(false);
           // props.commonStore.setLoading(false);
          });
  }
  @action addApplication(application) {
    this.applications.push(application);
  }

}

export default new applicationStore();
