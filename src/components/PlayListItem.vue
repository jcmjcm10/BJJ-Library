<template>
    <div id="play-list-item" class="playListItem-continer" @click="onClickVideo()">
        <div style=" align-self: center; justify-self: center; margin: 10px;">              
            <svg @click.stop="changeOrder(true, video.id)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m280-400 200-200 200 200H280Z"/></svg>         
            <svg @click.stop="changeOrder(false, video.id)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-360 280-560h400L480-360Z"/></svg>
        </div>
        <div class="gred-content">
            <img :src="linkMiniatura" style="border-radius: 10px;" alt="" width="100%" height="100%">
        </div>
        <div class="gred-content">
            <p style="font-size:small; font-weight: bold;">{{ video.title }}</p>
        </div>
        <div style="padding: 8px;">
            <q-btn flat round size="xs"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg></q-btn>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, ref, onMounted } from 'vue'

import { useBjjLibraryStore } from 'src/stores/bjj-library'

const useBjjLibrary = useBjjLibraryStore()

export default defineComponent({
    name: 'PlayListItem',
    props: ['video'],
    emits: ['onClickVideo', 'changeOrder'],
    setup(props, context) {
        const linkMiniatura = ref(`https://img.youtube.com/vi/${props.video.youtubeID}/sddefault.jpg`)
        onMounted (()=> {
            // const playListItem = document.getElementById('play-list-item')
            // playListItem.addEventListener('mouseenter', () => {
            // console.log('entro el raton a')
            // })
        })
        
        function dragVideo () {
            console.log('emito')
            context.emit('dragVideo', true)
        } 

        function onClickVideo () {
            context.emit('onClickVideo',props.video)
        }

        function changeOrder (up, videoID) {
            context.emit('changeOrder', up, videoID)
        }

        return {
            linkMiniatura,
            onClickVideo,
            dragVideo,
            changeOrder
        }
    }
})




</script>

<style>
.playListItem-continer {
    display: grid;
    grid-template-columns: 25px 200px auto 35px;
    border-radius: 10px;
    margin: 0px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.gred-content {
    width: 100%;
    height: 150px;
    padding: 5px;
}

</style>