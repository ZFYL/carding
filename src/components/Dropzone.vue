<template>
  <draggable
    :id="id"
    class="cardDropzone"
    :class="id"
    :list="list"
    group="cards"
    item-key="cards[0].image"
    @change="checkMethod"
  >
    <template #item="{element}">
      <img
        class="singleCard"
        :src="{ ...element }.cards[0].image"
        alt=""
      >
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "Dropzone",
  components: {
    draggable,
  },
  props: {list : {type: Array, default: ()=>[]},id: {type: String, default: ""}},
  emits: ['fireCheck'],
  methods: {
    checkMethod(event) {
      this.$emit("fireCheck", event);
    },
  },
};
</script>
