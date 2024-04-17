import axios from 'axios'
import { useLoginStore } from 'src/stores/login'
const useLogin = useLoginStore()
// const API_ROOT = 'http://127.0.0.1:8000/'
const API_ROOT = 'https://jcmjcm10.pythonanywhere.com/'

export function getTags () {
    const url = API_ROOT + 'Tag/'
    return axios.get(url)
}

export function getAxiosConfig () {
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: useLogin.getAccesToken()
        }
    }
    return axiosConfig
}

export function addVideo (requestBody) {
    console.log(useLogin.getAccesToken())
    const url = API_ROOT + 'video/'
    requestBody.accestoken = useLogin.getAccesToken()
    const requestVideo = requestBody
    return axios.post(url, JSON.stringify(requestVideo), getAxiosConfig()).then( response => {
        if (response.status === 200) {
            const url = API_ROOT + 'videoTag/'
            requestBody.tags.forEach(tag => {
                const requestVideoTag = {videoId: response.data.id, tagId: tag.value, accesToken: useLogin.getAccesToken()}
                axios.post(url, JSON.stringify(requestVideoTag), getAxiosConfig())
            })            
        }
    })
}

export function updateVideo (requestBody) {
    requestBody.accestoken = useLogin.getAccesToken()
    const url = API_ROOT + 'video/' + requestBody.id + '/'
    const requestVideo = requestBody
    return axios.put(url, JSON.stringify(requestVideo), getAxiosConfig()).then( response => {
        if (response.status === 200) {
            const url = API_ROOT + 'videoTag/'
            requestBody.tags.forEach(tag => {
                const requestVideoTag = {videoId: response.data.id, tagId: tag.value, edit: true}
                axios.post(url, JSON.stringify(requestVideoTag), getAxiosConfig())
            })            
        }
    })
}

export function deleteVideo (pk) {
    var requestBody = {accestoken: useLogin.getAccesToken()}
    const url = API_ROOT + 'video/' + pk + '/'
    return axios.delete(url, getAxiosConfig())
}

