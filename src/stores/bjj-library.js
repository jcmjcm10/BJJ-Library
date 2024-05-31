import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as BJJLIBRARY_API from 'src/API/bjj-library'
import { useLoginStore } from 'src/stores/login'


export const useBjjLibraryStore = defineStore('bjj-library', () => {
  
  //State
  const useLogin = useLoginStore()

  const tecnicsList = ref([])
  const listsSelected = ref([])
  const techniquesLists = ref([])
  const tagsList = ref([])
  
  //Actions
  const refreshData = () => {
    BJJLIBRARY_API.getVideos()
      .then(response => {
        if (response.status == 200) {
          tecnicsList.value = response.data.results
        }
      })
    updateTagsList()
    updateTechnicalsLists()
    console.log('Listas',techniquesLists.value)
  }
  
  const updateTagsList = () => {
    BJJLIBRARY_API.getTags()
      .then(response => {
        tagsList.value = response.data.results
      })
  }

  const updateTechnicalsLists = () => {
     BJJLIBRARY_API.getVideoLists()
      .then(response => {
        if (response.status == 200) {
          techniquesLists.value = response.data.results
        }
      })
  }
  
  const saveVideo = (requestBody) => {
    return BJJLIBRARY_API.addVideo(requestBody)
    .then(response => {
      refreshData()
      return response
    })
  } 

  const addList = (requestBody) => {
    return BJJLIBRARY_API.addList(requestBody)
    .then(response => {
      refreshData()
      return response
    })
  }

  const updateVideo = (requestBody) => {
    return BJJLIBRARY_API.updateVideo(requestBody)
    .then(response => {
      refreshData()
      return response
    })
  }
  
  const deleteVideo = (pk) => {
    return BJJLIBRARY_API.deleteVideo(pk)
    .then(response => {
      refreshData()
      return response
    })
  }

  const deleteList = (pk) => {
    return BJJLIBRARY_API.deleteList(pk)
    .then(response => {
      refreshData()
      return response
    })
  }

  const addVideoInList = (requestBody) => {
    BJJLIBRARY_API.addVideoInList(requestBody)
    .then((response) => {
      if (response.status == 200) {
        for(let i = 0; i < techniquesLists.value.length; i++) {
          if (techniquesLists.value[i].id == response.data.id) {
            techniquesLists.value[i] = response.data
          }
        }
      }
    })
  }

  const removeVideoInList = (requestBody) => {
    BJJLIBRARY_API.removeVideoInList(requestBody)
    .then((response) => {
      if(response.status == 200) {        
        let list_index = techniquesLists.value.findIndex((list) => list.id == requestBody.list)
        const videoList = techniquesLists.value[list_index]
        techniquesLists.value[list_index].videos = videoList.videos.filter((video) => {
          return video.id != requestBody.video
        })
      }
    })
  }

  const reorderVideoListItem = (playListId, requestBody) => {
    console.log(playListId)
    BJJLIBRARY_API.reorderVideoListItem(playListId, requestBody)
    .then((response) => {
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

  const getPlayList = (id) => {
    let result = null
    techniquesLists.value.forEach((playList) => {
      if (playList.id == id) {
        result = playList
      }
    });
    return result
  }

  const getVideosOfListSelected = () => {
    var result = []
    techniquesLists.value.forEach((list) => {
      if (listsSelected.value.includes(list.id)) {
        result = result.concat(list.videos)
      }
    })
    return result
  }
  
  refreshData()
  updateTagsList()

  return {
    tecnicsList,
    tagsList,
    techniquesLists,
    listsSelected,
    updateTagsList,
    saveVideo,
    updateVideo,
    getVideo,
    deleteVideo,
    refreshData,
    updateTechnicalsLists,
    getVideosOfListSelected,
    getPlayList,
    addList,
    deleteList,
    addVideoInList,
    removeVideoInList,
    reorderVideoListItem,
  }

})