<template>
  <div class="app">
    <v-main>
      <v-app>
        <builder-query-vuetify :rules="rules" v-model="query" />
        <v-btn @click="getQuery" color="primary"> click </v-btn>
      </v-app>
    </v-main>
  </div>
</template>

<script>
import Vue from "vue";
import BuilderQueryVuetify from "@/BuilderQueryVuetify.vue";
import { RuleTypes } from "@/utilities.js";

export default Vue.extend({
  name: "ServeDev",
  components: {
    BuilderQueryVuetify,
  },
  methods: {
    getQuery() {
      console.log(this.query.children);
    },
  },
  data() {
    return {
      query: {
        operator: "AND",
        children: [],
      },
      rules: [
        {
          type: RuleTypes.TEXT,
          id: 1,
          label: "First Name",
          nameTable: "s.",
        },
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
        {
          type: RuleTypes.DATE,
          id: 5,
          label: "Date",
        },
        {
          type: RuleTypes.TIME,
          id: 6,
          label: "Time",
        },
        {
          type: RuleTypes.BOOL,
          id: 7,
          label: "Bool",
        },
        {
          type: RuleTypes.AGGREGATE,
          id: 8,
          label: "Aggregate",
        },
        {
          type: RuleTypes.BOOL_INPUT,
          id: 9,
          label: "Bool input",
        },
      ],
    };
  },
});
</script>

