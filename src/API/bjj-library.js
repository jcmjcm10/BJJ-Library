import axios from 'axios'
import { useLoginStore } from 'src/stores/login'
const API_ROOT = 'http://127.0.0.1:8000/'
// const API_ROOT = 'https://jcmjcm10.pythonanywhere.com/'
// const API_ROOT = 'https://u1973231.pythonanywhere.com/'


export function getAxiosConfig () {
    const useLogin = useLoginStore()
    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + useLogin.getAccesToken()
        }
    }
    return axiosConfig
}

export function getVideos () {
    const url = API_ROOT + 'video/'
    return axios.get(url, getAxiosConfig())
}

export function getVideoLists() {
    const url = API_ROOT + 'VideoList/'
    return axios.get(url, getAxiosConfig())
}

export function getTags () {
    const url = API_ROOT + 'Tag/'
    return axios.get(url, getAxiosConfig())
}


//Login
export function login (requestBody) {
    const useLogin = useLoginStore()
    const url = API_ROOT + 'login/'
    const promis = axios.post(url, requestBody)
    promis.then(response => {
        if (response.status == 201) {
            const authentication = {
                username: response.data.user.username,
                email: response.data.user.email,
                accesToken: response.data.token,
                isAuthenticate: true,
                isStaff:  response.data.user.is_staff
            }
            useLogin.setAuthentication(authentication)
        }
    })
    return promis

}

export function logout (token) {
    const useLogin = useLoginStore()
    const url = API_ROOT + 'logout/' + '?token=' + token
    return axios.get(url)
}

//Register

export function register (requestBody) {
    const url = API_ROOT + 'user/'
    return axios.post(url, requestBody)
}

export function addVideo (requestBody) {
    const useLogin = useLoginStore()
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
        return response
    })
}

export function updateVideo (requestBody) {
    const useLogin = useLoginStore()
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
        return response
    })
}

export function deleteVideo (pk) {
    const url = API_ROOT + 'video/' + pk + '/'
    return axios.delete(url, getAxiosConfig())
}

export function addList (requestBody) {
    const url = API_ROOT + 'VideoList/'
    return axios.post(url,JSON.stringify(requestBody), getAxiosConfig())
}

export function addVideoInList (requestBody) {
    requestBody.op = 'insert'
    const url = API_ROOT + 'VideoList/' + requestBody.list + '/'
    return axios.put(url, JSON.stringify(requestBody), getAxiosConfig())
}

export function removeVideoInList (requestBody) {
    requestBody.op = 'remove'
    const url = API_ROOT + 'VideoList/' + requestBody.list + '/'
    return axios.put(url, JSON.stringify(requestBody), getAxiosConfig())
}

export function reorderVideoListItem (playListId, requestBody) {
    const url = API_ROOT + 'VideoList/' + playListId + '/'
    return axios.put(url, JSON.stringify(requestBody), getAxiosConfig())
}

export function deleteList (pk) {
    const url = API_ROOT + 'VideoList/' + pk + '/'
    return axios.delete(url, getAxiosConfig())
}