<template>
  <v-form>
    <v-text-field
      filled
      label="Name"
      :value="recipe.name"
      :rules="[resultRecipeNameError]"
      @input="(name) => onUpdateRecipe('name', name)"
      @click:append="onAddIngredient(ingredient)"
    />

    <v-text-field
      filled
      label="Ingredients"
      placeholder="Add ingredient"
      append-icon="add"
      v-model="ingredient"
      @click:append="onAddIngredient(ingredient)"
    />

    <ingredient-list-component
      :ingredients="recipe.ingredients"
      :on-remove-ingredient="onRemoveIngredient"
    />

    <v-alert
      :value="!recipeError.ingredients.succeeded"
      color="error"
      outlined
      >{{ recipeError.ingredients.message }}</v-alert
    >

    <v-textarea
      label="Description"
      filled
      placeholder="Description...."
      rows="10"
      :value="recipe.description"
      :rules="[resultRecipeDescriptionError]"
      :no-resize="true"
      @input="(value) => onUpdateRecipe('description', value)"
    ></v-textarea>
    <v-text-field
      filled
      label="Image URL"
      :value="recipe.image"
      @change="(image) => onUpdateRecipe('image', image)"
    />
    <div v-if="recipe.image" class="imageContainer">
      <img :src="recipe.image" />
    </div>
    <v-btn
      type="button"
      color="success"
      :disabled="
        !this.recipeError.name.succeeded ||
          !this.recipeError.description.succeeded ||
          recipe.ingredients.length == 0
      "
      @click.prevent="onSave"
      >Save</v-btn
    >
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import IngredientListComponent from "./IngredientList.vue";
import { FormProps } from "../formProps";

export default Vue.extend({
  name: "FormComponent",
  components: { IngredientListComponent },
  props: {
    recipe: { required: true },
    recipeError: { required: true },
    onUpdateRecipe: { required: true },
    onSave: { required: true },
    onRemoveIngredient: { required: true },
    onAddIngredient: { required: true },
  } as FormProps,
  data() {
    return {
      ingredient: "",
    };
  },
  computed: {
    resultRecipeNameError(): boolean | string {
      return this.recipeError.name.succeeded || this.recipeError.name.message;
    },
    resultRecipeDescriptionError(): boolean | string {
      return (
        this.recipeError.description.succeeded ||
        this.recipeError.description.message
      );
    },
  },
});
</script>

<style scooped>
.imageContainer {
  display: flex;
  flex: 1;
  justify-content: center;
  height: 15rem;
  background: rgba(0, 0, 0, 0.12);
  margin-top: -2rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
.imageContainer img {
  border-radius: 3rem;
}
</style>
