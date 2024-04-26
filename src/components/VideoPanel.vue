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
    </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'

export default defineComponent ({
    name: 'VideoPanel',
    props:['video'],
    setup (props, context) {
    
    onMounted(() => {
        console.log('montado',props.video)
    })
    return {
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




</style>