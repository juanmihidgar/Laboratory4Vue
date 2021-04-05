<template>
  <div>
    <recipe-list-page
      v-bind="{ searchText, recipes: filteredRecipes, onSearch, headers }"
    />
    <Snackbar v-bind="{ showSnackbar, snackText, snackTimeout }" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { fetchRecipes } from "../../../rest-api/api/recipe";
import { filterRecipesByCommaSeparatedText } from "./business/filterRecipeBusiness";
import { mapRecipeListModelToVm } from "./mapper";
import { Recipe } from "./viewModel";
import RecipeListPage from "./Page.vue";
import { Snackbar } from "../../../common/snackbar";

export default Vue.extend({
  name: "RecipeListPageContainer",
  components: {
    RecipeListPage,
    Snackbar,
  },
  data() {
    return {
      recipes: [] as Recipe[],
      searchText: "",
      showSnackbar: false,
      snackText: "",
      snackTimeout: 2000,
    };
  },
  computed: {
    headers() {
      return [
        { text: "Name", value: "name" },
        { text: "Description", value: "description" },
        { text: "ingredients", value: "ingredients" },
        { text: "Image", value: "image", sortable: false, width: "10rem" },
        { text: "Edit", value: "edit", sortable: false },
      ];
    },
    filteredRecipes(): Recipe[] {
      return filterRecipesByCommaSeparatedText(this.recipes, this.searchText);
    },
  },
  created() {
    fetchRecipes()
      .then((recipes) => {
        this.recipes = mapRecipeListModelToVm(recipes);
      })
      .catch((error) => {
        this.snackText = error;
        this.showSnackbar = true;
        setTimeout(() => {
          this.showSnackbar = false;
        }, this.snackTimeout);
      });
  },
  methods: {
    onSearch(value: string) {
      this.searchText = value;
    },
  },
});
</script>
