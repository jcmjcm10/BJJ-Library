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
        <q-btn class="addvideo-btn" round icon="add" @click="addVideoPanell = true"></q-btn>
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

    <!--Contenido de la pagina-->
    <q-page-container>
      <router-view @editVideo="editVideo" />
    </q-page-container>

  </q-layout>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
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
    const useLogin = useLoginStore()
    const leftDrawerOpen = ref(false)
    const userName = computed(() => useLogin.getUserName())
    const addVideoPanell = ref(false)
    const accesToken = ref('')
    const loginPanell = ref(false)

    function editVideo(id) {
      console.log('editando el video', id)
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
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      editVideo,
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
  bottom: 10px;
  right: 20px;
}

</style>