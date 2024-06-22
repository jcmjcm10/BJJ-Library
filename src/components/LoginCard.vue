<template>
  <!-- Login -->
  <div v-if="!isAuthenticate && !loading" class="content">
    <h1>Login</h1>
    <h2>e-mail</h2>
    <input class="login-input" type="text" v-model="username">

    <h2>Password</h2>
    <input class="login-input" type="password" v-model="password">
    <div class="button-login"> 
        <button @click="login()">Login</button>    
    </div>
      <p @click="goRegister()" style="padding-left: 90px; padding-top: 10px; font-size: 16px; text-decoration-line: underline;" href="">Registrarse</p> 
  </div> 

  <!-- Authenticate -->
   <div class="content">
    
   </div>
  <div v-if="isAuthenticate && !loading" class="content-singin">
        <div style="display: flex; align-items: center; justify-content: center; margin-top: -70px;">
          <q-img class="img-avatar"
            src="src/assets/userDefaultPhoto.png"
          />
        </div>
        <div style="display: flex; align-items: center; justify-content: center;">
          <h1>{{ authentication.username }}</h1>
        </div>
        <div class="button-login"> 
            <button @click="logout()">Logout</button>    
        </div>    
  </div>
  <!-- Loading -->
  <div v-if="loading" style="display: flex; align-items: center; justify-content: center;">
      <q-spinner
        color="primary"
        size="8em"
      />
  </div> 
  

</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'

import { useLoginStore } from 'src/stores/login'

export default defineComponent({
    name: 'LoginCard',    
    emits: ['goRegister'],
    components: {
    },
    setup (props, context) {
      const $q = useQuasar()
      const useLogin = useLoginStore()
      const username = ref('')
      const password = ref('')
      const isAuthenticate = ref(useLogin.isAuthenticate())
      const authentication = computed(()=> useLogin.getAuthentication())
      const loading = ref(false)
     
      function goRegister () {
        context.emit('goRegister')
      }

      function login() {
        loading.value = true
        useLogin.login(username.value, password.value)
        .then((response)=> {          
          if (response.status === 201) {
            isAuthenticate.value = true
          }
          loading.value = false
        })
        .catch(response => {
          console.log(response.response.data)
          $q.notify({
            message: response.response.data.mensaje,
            caption: '',
            color: 'red',
            icon: 'check',
            position: 'top'
          })
          loading.value = false
        })
      }

      function logout() {
        useLogin.logout()
        isAuthenticate.value = false
      }

      return {
        login,
        logout,
        goRegister,
        username,
        password,
        isAuthenticate,
        authentication,
        loading
      }
    }
})  
</script>

<style>
.login-panell {
  display: flex;
  align-items: center; 
  justify-content: center;
  font-family: 'Pin-Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Helvetica, 'ヒラギノ角ゴ Pro W3', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', Arial, sans-serif;
  width: 350px;
  height: 600px;
  background: white;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: auto;
}

.login-panell .content {
  width: 75%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-panell .content h1 {
  font-size: 32px;
  height: 55px;
  font-weight: bold;
  padding: 0px;
  margin: 0px;
  margin-top: -50px;
}

.login-panell .content h2 {
  color: rgb(104, 104, 104);
  font-size: 20px;
  margin: 10px 0px -10px 0px;
}

.login-input {
  display: block;
  padding: 20px;
  width: 100%;
  height: 50px;
  border: 1px solid rgb(192, 189, 189);
  border-radius: 300px;
  background: rgb(252, 251, 251);
  box-sizing: border-box;
}

.login-input:hover { 
  border: 3px solid rgba(25, 118, 210, 0.678);
}

.button-content {
  display: flex;
}

.button-login button {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 300px;
  background: rgba(25, 118, 210,1);
  color: white;
  font-size: 20px;
  box-sizing: border-box;
}

.button-login button:hover {
  background: rgba(25, 118, 210, 0.875);
}

.img-avatar {
  width:100px;
  height: 100px;
  margin-top: 70px;
}

.content-singin {
  display: block;
  width: 75%;
  height: 100%;
  margin: auto;  
}
.content-singin h1 {
  font-size: 32px;
  height: 55px;
  font-weight: bold;
  margin-top: -15px;  
}

</style>
