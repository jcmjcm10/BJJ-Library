<template>
  <div>
    <div class="content">
      <h1>Registrarse</h1>
      <h2>Usuario</h2>
      <input class="login-input" type="text" v-model="username">
      <p class="error">{{ errorMessage.username }}</p>
      <h2>Correo</h2>
      <input class="login-input" type="text" v-model="email">
      <p class="error">{{ errorMessage.email }}</p>
      <h2>Contraseña</h2>
      <input class="login-input" type="password" v-model="password">
      <p class="error">{{ errorMessage.password }}</p>
     <h2>Repite la Contraseña</h2>
      <input class="login-input" type="password" v-model="password2">

      <div class="button-login"> 
        <button @click="register()">Registrarse</button>    
      </div>  
      <p @click="goLogin()" style="padding-left: 110px; padding-top: 10px; font-size: 16px; text-decoration-line: underline;" href="">Login</p> 

    </div>      
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'

import { useLoginStore } from 'src/stores/login'

export default defineComponent({
    name: 'LoginCard', 
    emits: ['goLogin'],   
    components: {
    },
    setup (props, context) {
      const userLogin = useLoginStore()
      const $q = useQuasar()

      const username = ref('')
      const password = ref('')
      const password2 = ref('')
      const email = ref('')
      const errorMessage = ref({password:'', username: '', email: ''})
      function goLogin () {
        context.emit('goLogin')
      }

      function register () {
        
        errorMessage.value = {}
        if (password.value != password2.value) {
          errorMessage.value.password = 'La contraseña no coincide'
          return
        }

        var requestData = {
          username: username.value,
          password: password.value,
          email: email.value
        }
        userLogin.register(requestData)
        .then( response => {
          if (response.status == 201) {
            $q.notify({
              message: 'Usuario Registrado correctamente',
              caption: '',
              color: 'green',
              icon: 'check',
              position: 'top'
            })
            goLogin()
          }
        })
        .catch( response => {
          errorMessage.value = response.response.data.message
          console.log(errorMessage.value)
        })
      }

      return {
        goLogin,
        register,
        username,
        password,
        password2,
        email,
        errorMessage
      }
    }
})  
</script>

<style>
.register-panell .content {
  width: 75%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.register-panell .content h1 {
  font-size: 32px;
  height: 55px;
  font-weight: bold;
  padding: 0px;
  margin: 0px;
  margin-top: -50px;
}

.register-panell .content h2 {
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
  height: 100%
}
.content-singin h1 {
  font-size: 32px;
  height: 55px;
  font-weight: bold;
  margin-top: -15px;  
}

.error {
  color: rgb(227, 55, 55);
  margin-top: 5px;
}

</style>
