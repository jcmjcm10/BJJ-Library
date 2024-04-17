import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoginStore = defineStore('login', () => {
  const username = ref('')
  const accesToken = ref('')
  accesToken.value = localStorage.getItem('accesToken')

  function getUserName () {
    return username.value
  }

  function getAccesToken () {
    return accesToken.value
  }

  function setAccestoken (token) {
    localStorage.setItem('accesToken', token)
    accesToken.value = token
  }

  return {
    username,
    accesToken,
    getUserName,
    getAccesToken,
    setAccestoken
  }

})