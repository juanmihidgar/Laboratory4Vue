<template>
  <div>
    <recipe-edit-page
      v-bind="{
        recipe,
        recipeError,
        onUpdateRecipe,
        onAddIngredient,
        onSave,
        onRemoveIngredient,
      }"
    />
    <Snackbar v-bind="{ showSnackbar, snackText, snackTimeout }" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import RecipeEditPage from "./Page.vue";
import { fetchRecipeById, save } from "../../../rest-api/api/recipe";
import { mapRecipeModelToVm, mapRecipeVmToModel } from "./mapper";
import { createEmptyRecipe, createEmptyRecipeError } from "./viewModel";
import { validations } from "./validations";
import { Snackbar } from "../../../common/snackbar";

export default Vue.extend({
  name: "RecipeEditPageContainer",
  components: { RecipeEditPage, Snackbar },
  props: { id: String },
  data() {
    return {
      recipe: createEmptyRecipe(),
      recipeError: createEmptyRecipeError(),
      showSnackbar: false,
      snackText: "",
      snackTimeout: 2000,
    };
  },
  beforeMount() {
    const id = Number(this.id || 0);
    fetchRecipeById(id)
      .then((recipe) => {
        this.recipe = mapRecipeModelToVm(recipe);
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
    onUpdateRecipe(field: string, value: string) {
      this.recipe = {
        ...this.recipe,
        [field]: value,
      };
      this.validateRecipeField(field, value);
    },
    onSave() {
      validations.validateForm(this.recipe).then((result) => {
        if (result.succeeded) {
          const recipe = mapRecipeVmToModel(this.recipe);
          save(recipe)
            .then((message) => {
              this.$router.back();
            })
            .catch((error) => {
              this.snackText = `Saving error: ${error}`;
              this.showSnackbar = true;
              setTimeout(() => {
                this.showSnackbar = false;
              }, this.snackTimeout);
            });
        } else {
          this.recipeError = {
            ...this.recipeError,
            ...result.fieldErrors,
          };
        }
      });
    },
    onAddIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: [...this.recipe.ingredients, ingredient],
      };
      this.validateRecipeField("ingredients", this.recipe.ingredients);
    },
    onRemoveIngredient(ingredient: string) {
      this.recipe = {
        ...this.recipe,
        ingredients: this.recipe.ingredients.filter(
          (item) => item !== ingredient
        ),
      };
      this.validateRecipeField("ingredients", this.recipe.ingredients);
    },
    validateRecipeField(field, value) {
      validations
        .validateField(field, value)
        .then((result) => this.updateRecipeError(field, result));
    },
    updateRecipeError(field, result) {
      this.recipeError = {
        ...this.recipeError,
        [field]: result,
      };
    },
  },
});
</script>
