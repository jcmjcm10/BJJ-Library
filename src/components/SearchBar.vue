<template>
  <q-item>
    <q-input ref="searchBar" class="searchBar" style="width: 95%; margin: auto;" filled rounded outlined v-model="txtSearch" label="Buscador">
      <div v-if="showSearchPanel" class="continerMenu">
        <ul style="list-style: none;">
          <li @click="selectTag(tag)"
            v-for="tag in tagsOptions"
            :key="tag"
          >{{ tag }}</li>
        </ul>
      </div>
    </q-input>
  </q-item>
  <q-btn @click="$emit('onTxtSearchChange',txtSearch)">Buscar</q-btn>
 
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'

import { useBjjLibraryStore } from 'src/stores/bjj-library'

export default defineComponent({
  name: 'SearchBar',
  emits: ['onTxtSearchChange'],
  watch: {
    txtSearch() {
      this.search()
      this.$refs.searchBar.focus()
      this.filterTagsOption(this.$refs.searchBar.modelValue)
    }
  },
  setup(props, context) {

    //Storage
    const useBjjLibrary = useBjjLibraryStore()
    
    // Computeds
    const tags = computed(() => {
      const result = []
      var tagList = useBjjLibrary.tagsList
      tagList.forEach(tag => {
        result.push(tag.name)
      })
      return result
    })

    // Reactive variables
    const txtSearch = ref('')
    const tagSelect = ref(null)
    const options = ref([])
    const tagsOptions = ref([])
    const showSearchPanel = ref(false)
    
    // Functions
    function selectTag(tag) {
      const words = txtSearch.value.split(' ')
      words[words.length-1] = tag
      txtSearch.value=''
      words.forEach(word => {
        txtSearch.value += word
        txtSearch.value += ' '
      })
      setTimeout(() => {
        showSearchPanel.value = false
      },1)
      search()
    }

    function filterTagsOption () {
      const words = txtSearch.value.split(' ')
      if (txtSearch.value == '' || txtSearch.value == ' '  || txtSearch.value[txtSearch.value.length-1] == ' ') {
        showSearchPanel.value = false
        return 
      }
      const lastWord = words[words.length-1]
      tagsOptions.value = []
      tags.value.forEach(tag => {
        if (tag.toLowerCase().includes(lastWord.toLowerCase()))
        {
          tagsOptions.value.push(tag)
        }
      })

      if (tagsOptions.value.length <= 0) {
        showSearchPanel.value = false
      } else {
        showSearchPanel.value = true
      }
    }

    function search () {
      console.log('ejecuto')
      context.emit('onTxtSearchChange',txtSearch.value)
    }

    onMounted(() => {
      setTimeout(() => search(), 500)
        
    })
    return {
      txtSearch,
      tags,
      options,
      tagSelect,
      tagsOptions,
      showSearchPanel,
      selectTag,
      filterTagsOption,
      search
    }
  }
})

  


</script>

<style>
.fixPos {
  position: absolute;
  top: 0;
  left: 140;

}

.q-field--filled.q-field--rounded .q-field__control {
  border-radius: 28px 28px 28px 28px;
}

.searchBar {
  position: relative;
  overflow: visible;
}

.continerMenu {
  background: rgb(250, 250, 250);
  border: 1px solid rgb(240, 240, 240);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  overflow: visible;
  width: 100%;
  position: absolute;
  left: 2px;
  top: 60px;
  
  border-radius: 10px;
  z-index: 10;
}

.continerMenu ul {
  padding: 0px;
}


.continerMenu li {
  padding: 5px 10px 5px 10px;
  color: black;
}

.continerMenu li:hover {
  background: rgb(231, 231, 231);
}


</style>