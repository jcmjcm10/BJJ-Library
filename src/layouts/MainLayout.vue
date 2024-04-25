<template>
  <q-layout view="lHh Lpr lFf">
    <!--Menu superior-->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title style="font-size: 18px;">
          BJJ Library
        </q-toolbar-title>
        
        <!--Añadir video-->
        <q-dialog v-model="addVideoPanell">
          <AddVideoCard  @closeAddVideoPanell="closeAddVideoPanell"/>
        </q-dialog>


        <!--Apartado de login-->
        <q-item-label v-if="userName != ''" class="q-ma-sm"  @click="loginPanell=true"> {{ userName }}</q-item-label>
        <q-btn  v-if="userName == ''" flat class="q-ma-sm" style="font-size: 13px;" @click="loginPanell=true">Login</q-btn>
        <q-dialog v-model="loginPanell">
          <LoginCard/>
          <!-- <q-card margin>
            <q-input filled v-model="accesToken" @change="setAccesToken"></q-input>
          </q-card> -->
        </q-dialog>
      </q-toolbar>
    </q-header>    
    
    <!--Drawer-->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <q-list>
      <q-item-label
      header
      style="color: black"
      >
      <p style="font-size: 23px;">Tablon de Anuncios</p>
      <div>versión: 0.0.1b</div>
    </q-item-label>
       
        <!--Anuncio1-->
        <q-card style="margin: 10px; background-color: rgba(242, 255, 0, 0.072);">
          <q-icon name="warning" style="margin-left: 10px; margin-top: 10px; color: orange;"></q-icon>
          <q-card-section style="color: gray;">
            Advertencia: La aplicación está en desarrollo y podría haber pérdida de contenidos subidos por los usuarios. Agradecemos su comprensión durante este proceso de mejora.
          </q-card-section>
        </q-card>

      </q-list>
    </q-drawer>

    <q-footer bordered style=" color:white;">
        <q-tabs no-caps indicator-color="transparent" v-model="tabMenu" @click="onClickBottomMenu(tabMenu)">
          <q-tab name="videos" label="Videos" />
          <q-tab name="add" label="Añadir" />
          <q-tab name="lists" label="Listas" />
        </q-tabs>
      </q-footer>
      
    <!--Contenido de la pagina-->
    <q-page-container>
      <router-view @editVideo="editVideo" />
    </q-page-container>

  </q-layout>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLoginStore } from 'src/stores/login'
import AddVideoCard from 'src/components/AddVideoCard.vue'
import LoginCard from 'src/components/LoginCard.vue'


export default defineComponent({
  name: 'MainLayout',

  components: {
    AddVideoCard,
    LoginCard
  },

  setup () {
    const router = useRouter()
    const useLogin = useLoginStore()

    const leftDrawerOpen = ref(false)
    const userName = computed(() => useLogin.getUserName())
    const addVideoPanell = ref(false)
    const accesToken = ref('')
    const loginPanell = ref(false)
    const tabMenu = ref('default')

    function editVideo(id) {
      console.log('editando el video', id)
    }

    function onClickBottomMenu (value) {
      switch(value) {
        case 'add':
          openAddVideoPanell()
          break
        case 'videos':
          router.push('/videos');
          break
        case 'lists':
          router.push('/lists');
          break
        }
       
      }

    function openAddVideoPanell () {
      addVideoPanell.value = true
    }

    function closeAddVideoPanell () {
      addVideoPanell.value = false
    }
    
    function setAccesToken () {
      useLogin.setAccestoken(accesToken.value)
    }

    return {
      leftDrawerOpen,
      userName,
      addVideoPanell,
      loginPanell,
      accesToken,
      tabMenu,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      editVideo,
      onClickBottomMenu,
      openAddVideoPanell,
      closeAddVideoPanell,
      setAccesToken,
    }
  }
})
</script>


<style>

.addvideo-btn {
  background: var(--q-primary);
  position: fixed;
  bottom: 80px;
  right: 20px;
}

</style>