<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form @submit.prevent="login" lazy-validation ref="formRef">
          <v-card class="elevation-12">
            <v-toolbar dark>
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field
                v-model="email"
                name="email"
                :rules="!formSent ? [] : [this.requiredFieldRule]"
                label="Email"
                type="text"
                inputmode="email"
                required
                color="secondary"
              ></v-text-field>
              <v-text-field
                v-model="password"
                name="password"
                :rules="!formSent ? [] : [this.requiredFieldRule, this.minLengthRule(6)]"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                required
                color="secondary"
                :type="showPass ? 'text' : 'password'"
              ></v-text-field>
              <span v-if="errorMessage" class="error--text mt-3">{{ errorMessage }}</span>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" dark>Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'Home',
    data: () => ({
      formSent: false,
      email: '',
      password: '',
      showPass: false,
      errorMessage: '',
    }),
    computed: {
    },
    methods: {
      async login() {
        this.formSent = true;
        if(!this.email || !this.password)
          return;
        try {
          await this.$store.dispatch('signInAndStoreToken', { email: this.email, password: this.password});
          await this.$router.push({ path: this.$route.query.redirectTo as string || '/about' });
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
      requiredFieldRule(value: string) {
        return !value ? 'This field is required' : true;
      },
      minLengthRule(minLength: number) {
        return function(value: string) {
          return value.length < minLength ? `Password must have at least ${minLength} characters` : true;
        };
      },
    },
  });
</script>
