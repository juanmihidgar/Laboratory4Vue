<template>
  <v-data-table
    :headers="headers"
    :items="recipes"
    item-key="id"
    class="elevation-1"
    :search="searchText"
  >
    <template v-slot:[`item.description`]="{ item }">
      <div class="recipeDescription">{{ item.description }}</div>
    </template>
    <template v-slot:[`item.ingredients`]="{ item }">
      <v-chip
        v-for="ingredient of item.ingredients"
        outlined
        :key="ingredient"
        class="ingredientChip"
        >{{ ingredient }}</v-chip
      >
    </template>
    <template v-slot:[`item.image`]="{ item }">
      <img
        :src="item.image"
        onerror="this.onerror=null; this.src='https://static.thenounproject.com/png/140281-200.png'"
        class="imageList"
      />
    </template>
    <template v-slot:[`item.edit`]="{ item }">
      <v-icon small class="mr-4" @click="editRecipe(item.id)">
        mdi-pencil
      </v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Recipe } from "../viewModel";
import HeaderComponent from "./Header.vue";
import RowComponent from "./Row.vue";
import { baseRoutes } from "../../../../router";

export default Vue.extend({
  name: "TableComponent",
  components: { HeaderComponent, RowComponent },
  props: {
    recipes: { required: true } as PropOptions<Recipe[]>,
    searchText: String,
    headers: { required: true } as PropOptions,
  },
  methods: {
    editRecipe(id: Number): void {
      this.$router.push(`${baseRoutes.recipe}/${id}`);
    },
  },
});
</script>

<style scoped>
.imageList {
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
}
.ingredientChip {
  margin: 0.2rem 0.2rem;
}
.recipeDescription {
  white-space: pre-line;
}
</style>
