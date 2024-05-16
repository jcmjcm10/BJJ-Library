<template>
    <div class="video-panel">
        <q-video class="video" :src="video.url"></q-video>
        <p class="title">{{video.title}}</p>
        
        <!-- Options -->
        <div class="video-tools-continer">
            <q-btn @click="showAddtoListDialog=true" flat rounded backgrun="">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"/></svg>
                Añadir a lista
            </q-btn>
            <q-btn flat rounded class="video-more-options">                
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
            </q-btn>
        </div>

        <div class="tag-continer">
            <div 
                class="tag-box"
                v-for="tag in video.tags"
                :key="tag"
            >
                {{ tag }}
            </div>
        </div>
        <div class="video-panel-content-btn">
            <q-btn flat  @click="editVideo()" style="color: white; background-color: var(--q-primary);">Editar</q-btn>
            <q-btn @click="showConfirmDeleteDialog=true" flat style="margin-left:10px; background: #ed4646; color:white;">Eliminar</q-btn>

        </div>

        <!-- delete confirm dialog -->
        <q-dialog
            v-model="showConfirmDeleteDialog"
        >
            <div style=" width:300px; height: 150px; background: white; font-weight: bold;">
                <p style="margin: 30px 20px 0px 20px;">¿ Seguro que quieres eliminar el video ?</p>
                <br>
                <q-btn @click="deleteVideo()" v-close-popup style="margin: 0 10px 0 75px; width: 70px;"  >
                    Sí
                </q-btn>
                <q-btn v-close-popup style="width: 70px;">
                    No
                </q-btn>
            </div>
        </q-dialog>

        <!-- add video to list dialog -->
        <q-dialog
            v-model="showAddtoListDialog"
        >

        <div style="background-color: white; padding: 15px;">
            <div
                v-for="list in techniquesLists" 
                :key="list.id"
                style="display: flex; align-items: center; position: relative;"
            >
                <q-checkbox @click="addVidoToList(list.id)"  v-model="addListCheck[list.id]" style="margin-right: 40px;">
                    {{ list.title }}
                </q-checkbox>
                <svg style="position: absolute; right: 0px;" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="grey" d="M819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm374-99-58-58q21-37 32.5-77.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v45L261-814q48-31 103-48.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 61-17.5 116T814-261Z"/></svg>
            </div>
           
        </div>

        </q-dialog>


    </div>
</template>

<script>
import { defineComponent, onMounted, ref, computed } from 'vue'


import { useBjjLibraryStore } from 'src/stores/bjj-library'
import { Result } from 'postcss'

const useBjjLibrary = useBjjLibraryStore()

export default defineComponent ({
    name: 'VideoPanel',
    props:['video'],
    setup (props, context) {
    
    const showConfirmDeleteDialog = ref(false)
    const showAddtoListDialog = ref(false) 
    const addListCheck = ref({})
    
    const techniquesLists = computed(() => useBjjLibrary.techniquesLists)
    

    onMounted(() => {
        techniquesLists.value.forEach(list => {
            var result = false
            list.videos.forEach(video => {
                if (video.id === props.video.id) {
                    result = true
                }
            })
            addListCheck.value[list.id] = result
        });

        console.log('montado',addListCheck.value)
    })

    
    function editVideo () {
      context.emit('editVideo', props.video.id)
    }

    function deleteVideo () {
      useBjjLibrary.deleteVideo(props.video.id)
    }

    function addVidoToList (listId) {        
        if(addListCheck.value[listId]) {
            useBjjLibrary.addVideoInList({list: listId, video: props.video.id})
        } else {
            useBjjLibrary.removeVideoInList({list: listId, video: props.video.id})
        }       
    }
    



    return {
        editVideo,
        deleteVideo,
        addVidoToList,
        showConfirmDeleteDialog,
        showAddtoListDialog,
        techniquesLists,
        addListCheck
    }

    }
})
    
</script>
<style>
.video {
    width: 100%;
    height: 46%;
    margin: auto;
}
.video-panel {
    position: relative;
    width: 100%;
    height: 500px;
    background: white;
    padding: 10px;
}

.video-panel .title {
    font-size: 20px;
    margin: 0px;
}

.video-panel p {
    font-size: 16px;
}

.tag-box {
    background: #1976d2;
    padding: 3px 15px 3px 15px ;
    margin-right: 5px;
    margin-top: 8px;
    color: white;
    border-radius: 5000px;
}

.tag-continer {
    display: flex; 
    flex-wrap: wrap;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 10px;
    padding-top: 2px;
}

.video-panel-separator {
    border-top: 1px solid rgba(0, 0, 0, 0.174);
}

.video-panel-content-btn {
    position: absolute;
    margin: 10px;
    right: 10px;
}

.video-tools-continer {
    position: relative;
    display: flex;
    padding: 5px;
}

.video-more-options {
    position: absolute;
    right: 0px;
}



</style>