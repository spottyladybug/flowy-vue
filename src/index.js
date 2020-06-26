import DraggablePlugin from '@hipsjs/shopify-draggable-vue';
import Flowy from './components/Flowy.vue';
import FlowyNode from './components/FlowyNode.vue';
import FlowyBlock from './components/FlowyBlock.vue';
import FlowyNewBlock from './components/FlowyNewBlock.vue';

const VuePlugin = {};

VuePlugin.install = function install(_Vue) {
  const Vue = _Vue;
  Vue.use(DraggablePlugin, {

  });

  Vue.component('Flowy', Flowy);
  Vue.component('FlowyNode', FlowyNode);
  Vue.component('FlowyBlock', FlowyBlock);
  Vue.component('FlowyNewBlock', FlowyNewBlock);
};

export default VuePlugin;
