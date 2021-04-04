<template>
  <div>
    <login-page v-bind="{ login, updateLogin, loginRequest, loginError }" />
    <div>
      <Snackbar v-bind="{ showSnackbar, snackText, snackTimeout }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { loginRequest } from "../../rest-api/api/login";
import { baseRoutes } from "../../router";
import LoginPage from "./Page.vue";
import { createEmptyLogin, Login, createEmptyLoginError } from "./viewModel";
import { mapLoginVMToModel } from "./mapper";
import { validation } from "./validations";
import { Snackbar } from "../../common/snackbar";

export default Vue.extend({
  name: "PageLoginContainer",
  components: { LoginPage, Snackbar },
  data() {
    return {
      login: createEmptyLogin(),
      loginError: createEmptyLoginError(),
      showSnackbar: false,
      snackText: "",
      snackTimeout: 2000,
    };
  },
  methods: {
    updateLogin(field: string, value: string) {
      this.login = {
        ...this.login,
        [field]: value,
      };

      validation.validateField(field, value).then((result) => {
        this.loginError = {
          ...this.loginError,
          [field]: result,
        };
      });
    },
    loginRequest() {
      validation.validateForm(this.login).then((result) => {
        if (result.succeeded) {
          const loginModel = mapLoginVMToModel(this.login);

          loginRequest(loginModel)
            .then(() => {
              this.$router.push(baseRoutes.recipe);
            })
            .catch((error) => {
              this.snackText = `${error}. Try with user: admin password: test`;
              this.showSnackbar = true;
              setTimeout(() => {
                this.showSnackbar = false;
              }, this.snackTimeout);
            });
        } else {
          this.loginError = {
            ...this.loginError,
            ...result.fieldErrors,
          };
        }
      });
    },
  },
});
</script>
