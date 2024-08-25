<template>
  <div>
    <draggable v-model="list" @start="handleDragStart" ref="draggableRef">
      <template #item="{element}">
        <div class="draggable-item">
          {{ element }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  setup() {
    const list = ref(['Item 1', 'Item 2', 'Item 3']);
    const handleDragStart = () => {
      // Almacenamos una referencia al componente draggable
      var draggableComponent = null
      onMounted(()=> {
        const draggableComponent = this.$refs.draggableRef;
        if (draggableComponent) {
        draggableComponent.draggable = true; // Habilitamos el arrastre
        setTimeout(() => {
          draggableComponent.draggable = false; // Deshabilitamos el arrastre después de 1 segundo
          draggableComponent.$el.classList.add('no-transition'); // Añadimos la clase para desactivar la transición
          setTimeout(() => {
            draggableComponent.$el.classList.remove('no-transition'); // Removemos la clase después de la siguiente iteración del bucle de renderizado
          }, 0);
        }, 1000);
      }
      })
     
    };

    return {
      list,
      handleDragStart
    };
  }
};
</script>

<style>
.draggable-item {
  background-color: #f0f0f0;
  padding: 10px;
  margin-bottom: 5px;
  cursor: move;
  transition: transform 0.2s ease; /* Aseguramos que la transición solo aplique cuando el arrastre está activo */
}

.no-transition {
  transition: none !important; /* Anulamos la transición */
}
</style>
