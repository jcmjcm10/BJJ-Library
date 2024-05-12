<template>
    <div class="video-panel">
        <q-video class="video" :src="video.url"></q-video>
        <p class="title">{{video.title}}</p>
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
    </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'


import { useBjjLibraryStore } from 'src/stores/bjj-library'

const useBjjLibrary = useBjjLibraryStore()

export default defineComponent ({
    name: 'VideoPanel',
    props:['video'],
    setup (props, context) {
    
    const showConfirmDeleteDialog = ref(false)
    onMounted(() => {
        console.log('montado',props.video)
    })

    
    function editVideo () {
      context.emit('editVideo', props.video.id)
    }

    function deleteVideo () {
      useBjjLibrary.deleteVideo(props.video.id)
    }



    return {
        editVideo,
        deleteVideo,
        showConfirmDeleteDialog
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




</style>