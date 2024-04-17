<template>
    <div class="login-panell">
        <div class="content">
            <h1>Login</h1>
            <h2>e-mail</h2>
        <input class="login-input" type="text">

        <h2>Password</h2>
        <input class="login-input" type="password">
        <div class="button-login"> 
            <button>Register</button>
            <button>Login</button>    
        </div>   
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'MainLayout',
    
    components: {
    },
    setup () {

    }
})  
</script>

<style>
.login-panell {
  font-family: 'Pin-Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', Helvetica, 'ヒラギノ角ゴ Pro W3', 'メイリオ', Meiryo, 'ＭＳ Ｐゴシック', Arial, sans-serif;
  width: 350px;
  height: 400px;
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
  width: 45%;
  height: 50px;
  margin-top: 20px;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 300px;
  background: rgba(25, 118, 210,1);
  color: white;
  font-size: 20px;
  box-sizing: border-box;
}
.button-login button:first-child {
  background: rgb(255, 255, 255);
  margin-right: 10%;
  outline: 3px solid rgba(25, 118, 210,1);
  color: rgba(25, 118, 210,1);
  height: 47px;
}

.button-login button:first-child:hover {
  background: rgba(25, 118, 210, 0.244);

}

.button-login button:hover {
  background: rgba(25, 118, 210, 0.875);
}
</style>
