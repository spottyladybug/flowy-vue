<template lang="html">
  <div class="flowy-block mr-24px relative">
    <draggable
      :value="[nodeData]"
      :move="onMove"
      :group="{ name: 'flowy', pull: 'clone', put: false }"
      @start="onStart"
      @end="onStop"
    >
      <div :key="0">
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
  },
  methods: {
    onMove(event) {
      this.$emit('drag-move', { params: { node: this.node }});
    },
    onStart(event, data) {
      this.$emit('drag-start', { params: { node: this.node }});
    },
    onStop(event) {
      this.$emit('drag-stop', { params: { node: this.node }});
    },
  },
};
</script>
