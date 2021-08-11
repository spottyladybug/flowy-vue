<template lang="html">
  <div class="flowy-block mr-24px relative">
    <draggable
      v-model="array"
      group="flowy"
      @start="onStart"
      @stop="onStop"
    >
      <div v-for="element in array" :key="0">
        <slot name="preview"></slot>
      </div>
    </draggable>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import draggable from 'vuedraggable'

export default {
  components: {
    draggable,
  },
  props: {

  },
  data() {
    return {
      node: {
        componentName: '',
        props: {},
      },
    };
  },
  mounted() {
    const node = this.$scopedSlots.node()[0];
    this.node.componentName = node.componentOptions.tag;
    this.node.props = {
      ...node.componentOptions.propsData,
      ...node.data.attrs,
    };
  },
  destroyed() {

  },
  computed: {
    nodeData() {
      return this.node;
    },
    array() {
      return [this.node];
    }
  },
  methods: {
    onStart(event, data) {
      this.$emit('drag-start', { params: { node: this.node }});
    },
    onStop(event, data) {
      this.$emit('drag-stop', data);
    },
  },
};
</script>
