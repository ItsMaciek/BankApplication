<template>
  <div id="app">
    <div id="LoginMenu">
      <form @submit.prevent="register">
        <h2>Register</h2>
        <div>
          <input type="text" v-model="username" required placeholder="Username"/>
        </div>
        <div>
          <input type="password" v-model="password" required placeholder="Password"/>
        </div>
        <div>
          <input type="password" v-model="confirmpassword" required placeholder="Confirm Password"/>
        </div>
        <button class="fancy" type="submit">Register</button>
        <router-link to="/login">Login</router-link>
      </form>
    </div>
    </div>
  </template>

  <style>
  #app{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #LoginMenu{
    text-align: center;

    width: 50vw;
    height: 50vh;
    background: rgba(51, 51, 51, 0.95);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10.7px);
    -webkit-backdrop-filter: blur(10.7px);
    border: 1px solid rgba(51, 51, 51, 1);

    display: flex;
    justify-content: center;
}
#LoginMenu form{
    display: flex;
    width: 50%;
    gap: 15px;
    flex-direction: column;
    justify-content: center;
}
h2{
  margin: 0;
}
</style>

  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmpassword: '',
      };
    },
    methods: {
      async register() {
        try {
          if (this.password != this.confirmpassword) {
            alert("Passwords Don't Match");
            return;
          }
          const res = await axios.post('/users/register', {
            username: this.username,
            password: this.password,
          });

          localStorage.setItem('token', res.data.token);
          this.$router.push('/account');
        } catch (err) {
          console.error(err.response.data);
        }
      },
    },
  };
  </script>
  