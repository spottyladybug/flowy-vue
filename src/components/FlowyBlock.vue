<template lang="html">
  <div class="flowy-block mr-24px relative">
    <slot></slot>
    <draggable
      :value="[node]"
      class="flowy-draggable"
      :id="node.id"
      group="flowy"
      :move="onDragMove"
      @dragover.native="onDragover"
      @dragleave.native="onDragleave"
      @change="onChange"
      @end="onDragEnd"
      @start="onDragStart"
    >
      <div :key="0">
        <DropIndicator :show='showIndicator' :not-allowed='!dropAllowed' />
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
import DropIndicator from "./DropIndicator";

export default {
  components: {
    draggable,
    DropIndicator,
  },
  props: {
    dropAllowed: {
      type: Boolean,
      required: false,
      default: true,
    },
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
      showIndicator: false,
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
    onDragleave(_event) {
      this.showIndicator = false;
    },
    onDragover(_event) {
      this.showIndicator = true;
    },
    onChange(_event) {
      if (!_event.added) {
        return;
      }
      this.showIndicator = false;
      this.$emit('add', _event.added.element);
    },
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
