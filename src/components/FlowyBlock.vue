<template lang="html">
  <div class="flowy-block mr-24px relative">
    <slot></slot>
    <draggable
      :list="[node]"
      class="flowy-draggable"
      :id="node.id"
      group="flowy"
      :move="onDragMove"
      @end="onDragEnd"
      @start="onDragStart"
    >
      <div :key="0">
        <component
          :is="component"
          v-bind="{ ...$props, ...$attrs, ...passedProps }"
          ref="block"
        />
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
    node: {
      type: Object,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {

    };
  },
  mounted() {

  },
  destroyed() {

  },
  computed: {
    component() {
      return this.node.nodeComponent;
      // return find(this.blocks, { name: this.node.block }).name;
    },
    passedProps() {
      return this.node.data;
    },
  },
  methods: {
    onDragMove(_event) {
      this.$emit('move', _event);
    },
    onDragEnd(_event) {
      this.$emit('end', _event);
    },
    onDragStart(_event) {
      this.$emit('start', _event);
    },
  },
  render(c) {
    const item = this.$scopedSlots.default()[0];
    return item;
  },
};
</script>
