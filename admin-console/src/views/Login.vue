<template>
  <div class="outer">
    <Loading/>
    <div class="form-container">
      <b-container>
        <b-row>
          <b-col lg="6" offset-lg="3">
            <div class="login-form-container">
                <h3 class="form-header">HKDID Admin Console</h3>
                <b-form @submit="onSubmit" v-if="show" validated >
                  <b-form-group
                    label="Email address:"
                    label-for="email"
                  >
                    <b-form-input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="Enter email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="Your Password:" label-for="password">
                    <b-form-input
                      id="password"
                      v-model="form.password"
                      type="password"
                      required
                      placeholder="Enter password"
                    ></b-form-input>
                  </b-form-group>
                  <b-alert show variant="danger" v-if="error">{{error}}</b-alert>
                  <b-button type="submit" variant="primary">Submit</b-button>
                </b-form>
              </div>
          </b-col>
        </b-row>
        </b-container>
        </div>
      </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
import Loading from '../components/Loading';

  export default {
    name:"Login",
    components: {
        Loading
    },
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        error:'',
        show: true
      }
    },
    methods: {
      ...mapActions(['login']),
      onSubmit(evt) {
        evt.preventDefault()
        const email = this.form.email;
        const password = this.form.password;
        this.login({email,password}).then(() => this.$router.push('/'))
       .catch((err) => {
         this.form.email = '';
         this.form.password = '';
         this.error = err.message;
          console.log(err);
       });
      },
    },
  }
</script>
<style>
body,html{
  height: 100%;
}
#app{
  height: 100%;
}
.form-container{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.login-form-container{
  border: 1px solid grey;
}
.form-header{
  background: rgb(44, 189, 247);
  padding: 15px;
}
form{
  padding: 0 15px 15px 15px;
}
.outer{
  height: 100%;
}
</style>