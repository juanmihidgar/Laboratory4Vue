<template>
  <v-snackbar
    :value="showSnackbar"
    :timeout="snackTimeout"
    color="blue-grey"
    absolute
    bottom
    rounded="pill"
  >
    {{ snackText }}
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Snackbar",
  props: { showSnackbar: Boolean, snackText: String, snackTimeout: Number },
});
</script>
