import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as BJJLIBRARY_API from 'src/API/bjj-library'


export const useLoginStore = defineStore('login', () => {
  const authentication = ref({
    username: '',
    email:'',
    accesToken:''
  })
  authentication.value.accesToken = localStorage.getItem('accesToken')

  //Geters
  function getUserName () {
    return authentication.value.username 
  }

  function getEmail () {
    return authentication.value.email
  }

  function getAccesToken () {
    return authentication.value.accesToken 
  }

  //seters
  function setAccestoken (token) {
    localStorage.setItem('accesToken', token)
    authentication.value.accesToken = token
  }

  function setAuthentification (authentication) {
    authentication.value = authentication
    setAccestoken(authentication.accesToken)
    console.log('authentification', authentication.value)
  }

  //Actions
  function login (username, password) {
    BJJLIBRARY_API.login({ username:username, password:password})
  }

  function logout () {
    BJJLIBRARY_API.logout(getAccesToken())
    localStorage.setItem('accesToken', '')
    authentication.value = {
      username: '',
      email:'',
      accesToken:''
    }    
  }

  return {
    getUserName,
    getEmail,
    getAccesToken,
    setAccestoken,
    setAuthentification,
    login,
    logout
  }

})