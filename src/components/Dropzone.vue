<script>
/* eslint-disable no-underscore-dangle */
export default {
  props: ['data', 'group', 'start', 'stop', 'move'],
  data() {
    return {
      over: false,
      active: false,
    };
  },
  watch: {
    start: function (newValue) {
      this.onDragStart(newValue.event)
    },
    stop: function (newValue) {
      this.onDragStop(newValue.event)
    },
    move: function (newValue) {
      this.onDragMove(newValue.event)
    }
  },
  methods: {
    onDragStart(_event) {
      console.log('start-event', _event)
      this.active = true;
    },
    onDragMove(_event) {
      console.log('move-event', _event)
    },
    onDragStop(_event) {
      console.log('stop-event', _event)
      this.active = false;
      if (!this.over) {
        return true;
      }
      this.over = false;

      this.$emit('receive', _event.source._source);
      _event.source._source.oldComponent.$emit('drop', {
        ..._event.source._source,
        data: this.data,
      });

      return true;
    },
    sameGroup(event) {
      const sourceGroup = event.source._source.oldComponent.group;
      return Array.isArray(this.group)
        ? this.group.includes(sourceGroup) : sourceGroup === this.group;
    },
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
