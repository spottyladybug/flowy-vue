<script>
/* eslint-disable no-underscore-dangle */
export default {
  props: ['node'],
  data() {
    return {
      over: false,
      active: false,
    };
  },
  mounted() {
    document.addEventListener('flowy-node-drag-start', this.onDragStart);
    document.addEventListener('flowy-node-drag-move', this.onDragMove);
    document.addEventListener('flowy-node-drag-stop', this.onDragStop);
  },
  destroyed() {
    document.removeEventListener('flowy-node-drag-start', this.onDragStart);
    document.removeEventListener('flowy-node-drag-move', this.onDragMove);
    document.removeEventListener('flowy-node-drag-stop', this.onDragStop);
  },
  methods: {
    onDragStart(_event) {
      console.log('start-event', _event)
      if (_event.detail.event.to.id === `${this.node.id}`) {
        this.active = true;
      }
    },
    onDragMove(_event) {
      console.log('move-event', _event)
    },
    onDragStop(_event) {
      console.log('stop-event', _event)
      if (_event.detail.event.to.id === _event.detail.event.from.id) {
        return;
      }
      if (_event.detail.event.to.id !== `${this.node.id}`) {
        return;
      }
      this.active = false;
      this.$emit('receive', _event);
    }
  },
  render() {
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({
        over: this.over,
        active: this.active,
      });
    }

    return this.$scopedSlots.default()[0];
  },
};
</script>
