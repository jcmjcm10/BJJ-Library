import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as BJJLIBRARY_API from 'src/API/bjj-library'

export const useBjjLibraryStore = defineStore('bjj-library', () => {
  const tecnicsList = ref([])
  const tagsList = ref([])

  //Actions
  const refreshData = () => {
    const url = 'https://jcmjcm10.pythonanywhere.com/video/'
    // const url = 'http://127.0.0.1:8000/video/'

    fetch(url)
    .then(response => {    
      if (!response.ok) {
        throw new Error(`Error de red - código ${response.status}`);
      }
      return response.json();
    })
    .then(json => {      
      tecnicsList.value = json.results
    })
    .catch(error => {
      console.error(`Error al leer el archivo JSON: ${error.message}`);
    })
  }

  const updateTagsList = () => {
    BJJLIBRARY_API.getTags()
      .then( response => {
        tagsList.value = response.data.results
      })
  }
  
  const saveVideo = (requestBody) => {
    BJJLIBRARY_API.addVideo(requestBody)
      .then(response => {
        refreshData()
      })

  } 

  const updateVideo = (requestBody) => {
    BJJLIBRARY_API.updateVideo(requestBody)
    .then(response => {
      refreshData()
    })
  }
  
  const deleteVideo = (pk) => {
    BJJLIBRARY_API.deleteVideo(pk)
    .then(response => {
      refreshData()
    })
  }

  //Getters
  const getVideo = (id) => {
    var result = null
    tecnicsList.value.forEach( video => { //OPT: fer cerca y no recorregut
      console.log(video.id)
      if(video.id === id) {
        result = video
      }
    })
    return result
  }

  //Mutations
  const addTecnicsList = (tecnic) => {
    tecnicsList.value.push(tecnic)
  }
  
  refreshData()
  updateTagsList()

  return {
    tecnicsList,
    tagsList,
    updateTagsList,
    saveVideo,
    updateVideo,
    getVideo,
    deleteVideo
  }

})