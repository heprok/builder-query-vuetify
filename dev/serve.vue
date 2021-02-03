<script>
import Vue from 'vue';
import VuetifyQueryBuilder from '@/vuetify-query-builder.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VuetifyQueryBuilder
  }
});
</script>

<template>
  <div id="app">
    <vuetify-query-builder />
  </div>
</template>
