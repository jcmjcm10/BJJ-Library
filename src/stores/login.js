import { defineStore } from 'pinia'
import { ref } from 'vue'

import * as BJJLIBRARY_API from 'src/API/bjj-library'
import { useBjjLibraryStore } from 'src/stores/bjj-library'

export const useLoginStore = defineStore('login', () => {
  const authentication = ref({
    username: '',
    email:'',
    accesToken:'',
    isAuthenticate: false,
    isStaff: false,
  })

  //Start methods
  getUserData()
  //private
  function getUserData () {
    if (localStorage.getItem('authentication') !== null) {
      authentication.value =  JSON.parse(localStorage.getItem('authentication'))    
    }
  }

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

  function getAuthentication () {
    return authentication.value
  }

  function isAuthenticate () {
    return authentication.value.isAuthenticate
  }

  //seters
  function setAccestoken (token) {
    authentication.value.accesToken = token
    localStorage.setItem('authentication', JSON.stringify(authentication.value))
  }

  function setAuthentication (auth) {
    authentication.value = auth
    localStorage.setItem('authentication', JSON.stringify(authentication.value))
  }

  //Actions
  function login (username, password) {
    
    const promis = BJJLIBRARY_API.login({ username:username, password:password})
    promis.then((response) => {
      const useBjjlibrary = useBjjLibraryStore()
      useBjjlibrary.refreshData()
    })
    return promis
  }

  function logout () {
    BJJLIBRARY_API.logout(getAccesToken())
    localStorage.removeItem('authentication')   
    authentication.value = {
      username: '',
      email:'',
      accesToken:'',
      isAuthenticate: false,
      isStaff: false
    }
  }

  return {
    getUserName,
    getEmail,
    getAccesToken,
    setAccestoken,
    setAuthentication,
    login,
    logout,
    getAuthentication,
    isAuthenticate,
    authentication
  }

})