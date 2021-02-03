<template>
  <div class="app">
    <v-main>
      <v-app>
        <vuetify-query-builder :rules="rules" />
      </v-app>
    </v-main>
  </div>
</template>

<script>
import Vue from "vue";
import VuetifyQueryBuilder from "@/vuetify-query-builder.vue";
import { RuleTypes } from "@/utilities.js";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VuetifyQueryBuilder,
  },
  data() {
    return {
      rules: [
        {
          type: RuleTypes.NUMBER,
          id: 2,
          label: "Age",
        },
        {
          type: RuleTypes.SELECT,
          id: 3,
          label: "Color",
          options: [
            { label: "red", value: "Red" },
            { label: "orange", value: "Orange" },
            { label: "yellow", value: "Yellow" },
            { label: "green", value: "Green" },
            { label: "blue", value: "Blue" },
            { label: "indigo", value: "Indigo" },
            { label: "violet", value: "Violet" },
          ],
        },
        {
          type: RuleTypes.MULTI_SELECT,
          id: 4,
          label: "Multi Color",
          options: [
            { label: "red", value: "Red" },
            { label: "orange", value: "Orange" },
            { label: "yellow", value: "Yellow" },
            { label: "green", value: "Green" },
            { label: "blue", value: "Blue" },
            { label: "indigo", value: "Indigo" },
            { label: "violet", value: "Violet" },
          ],
        },
      ],
    };
  },
});
</script>

