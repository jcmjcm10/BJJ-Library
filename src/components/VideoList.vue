<template>
    <div ref class="boxItem"  @click="showContent=!showContent">
        <div style="display: flex; padding:0px;">
            <q-checkbox @click="onCheck" class="checkbox" v-model="isCheck" size="xl"/>
            <p class="technicalItem">{{ title }}</p>
            <!-- <q-btn class="align-left" style="margin: 12px 5px 0px 0px;" flat ><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg></q-btn> -->
            
            <q-btn-dropdown v-if="owner" @click="showContent = !showContent" class="align-left" style="margin: 12px 5px 0px 0px;" flat dropdown-icon="menu">
                <q-list>
                    <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>                       
                        <q-item-label @click="goConfigList()">Editar</q-item-label>
                    </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="onItemClick">
                    <q-item-section>                       
                        <q-item-label @click="confirmDeleteDialog=true">Eliminar</q-item-label>
                    </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </div>
        <div v-if="showContent">
            <ol>
                <li 
                    v-for="technical in technicals"
                    :key="technical.id"
                >
                    {{ technical.title }}
                </li>
                
            </ol>
        </div>    
            
         <!-- delete confirm dialog -->
        <q-dialog
            v-model="confirmDeleteDialog"
        >
            <div style=" width:300px; height: 150px; background: white; font-weight: bold;">
                <p style="margin: 30px 20px 0px 20px;">¿Seguro que quieres eliminar la Lista?</p>
                <br>
                <q-btn @click="deleteList()" v-close-popup style="margin: 0 10px 0 75px; width: 70px;"  >
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
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'

import { useBjjLibraryStore } from 'src/stores/bjj-library'

const useBjjLibrary = useBjjLibraryStore()

export default defineComponent({
    name: 'VideoList',
    props: ['id','title','technicals', 'owner'],
    setup(props) {
        const $q = useQuasar()
        const isCheck = ref(false)
        const showContent = ref(false)
        const confirmDeleteDialog = ref(false)
        
        onMounted(()=> {
            isCheck.value = useBjjLibrary.listsSelected.includes(props.id)
        })

        function onCheck() {
            
            if (isCheck.value) {
                if (!useBjjLibrary.listsSelected.includes(props.id)) {
                    useBjjLibrary.listsSelected.push(props.id)
                }
            }
            else {
                if (useBjjLibrary.listsSelected.includes(props.id)) {
                    let index = useBjjLibrary.listsSelected.indexOf(props.id); // Encuentra la posición del número en la lista
                    useBjjLibrary.listsSelected.splice(index, 1);
                }
            }
        }

        function goConfigList () {
            this.$router.push(`/playList/${props.id}`);
        }
        
        function deleteList () {
            useBjjLibrary.deleteList(props.id)
            .then((response) => {
                if(response.status === 200) {
                    $q.notify({
                        message: `Lista ${props.title} eliminada.`,
                        caption: '',
                        color: 'green',
                        icon: 'check',
                        position: 'top'
                    })
                }
            })
        }

        return {
            isCheck,
            showContent,
            confirmDeleteDialog,
            onCheck,
            deleteList,
            goConfigList,
        }
    }
})




</script>

<style>
.boxItem {
    width: 95%;
    border-radius: 6px;
    border: 1px solid grey;
    background: #ecececc8;
    margin: 0px auto 10px auto;
    position: relative;
}

p.technicalItem {
    color: rgb(0, 0, 0);
    margin-top: auto;
    margin-bottom: auto;
    font-size: 20px;
}

.align-left {
    position: absolute;
    right: 0px;
}


</style>