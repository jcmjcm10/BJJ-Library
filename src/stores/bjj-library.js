import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as BJJLIBRARY_API from 'src/API/bjj-library'
import axios from 'axios'
import { useLoginStore } from 'src/stores/login'


export const useBjjLibraryStore = defineStore('bjj-library', () => {
  const useLogin = useLoginStore()
  
  const tecnicsList = ref([])
  const tagsList = ref([])
  

  const refreshData = () => {
    BJJLIBRARY_API.getVideos()
      .then(response => {
        if (response.status == 200) {
          tecnicsList.value = response.data.results
        }
      })
  }


  
  const updateTagsList = () => {
    BJJLIBRARY_API.getTags()
      .then(response => {
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
    deleteVideo,
    refreshData
  }

})