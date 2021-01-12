<template>
  <v-row justify="center">
    <div style="margin-top: 6rem">
      <v-alert
        :value="showError"
        color="pink"
        dark
        border="top"
        icon="mdi-error"
        transition="scale-transition"
      >
        {{ this.loginError }}
      </v-alert>
      <v-alert
        :value="showSuccess"
        color="green"
        dark
        border="top"
        transition="scale-transition"
      >
        {{ this.loginError }}
      </v-alert>
    </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-toolbar color="#4638C2" dark flat>
          <v-spacer>
            <v-toolbar-title style="font-size: 2.5rem"
              >Vue ToDo</v-toolbar-title
            >
          </v-spacer>
          <template v-slot:extension>
            <v-tabs fixed-tabs v-model="tabs" align-center>
              <v-tabs-slider color="#FFFFFF"></v-tabs-slider>

              <v-tab v-for="item in items" :key="item">
                {{ item }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items
          color="#24252F"
          v-model="tabs"
          style="background-color: #24252f"
        >
          <v-tab-item>
            <v-card color="#24252F" style="color: white" flat>
              <v-card-title class="justify-center"> Login </v-card-title>
              <v-card-text>
                <v-form ref="loginForm" lazy-validation>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginUsername"
                        label="Username"
                        prepend-inner-icon="mdi-account"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginPassword"
                        label="Password"
                        type="password"
                        prepend-inner-icon="mdi-lock"
                        required
                        outlined
                        @keyup.enter="login()"
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex mx-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        dark
                        color="#4F41C5"
                        v-on:click="login()"
                        >Login</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card color="#24252F" flat>
              <v-card-title class="justify-center"> Register </v-card-title>
              <v-card-text>
                <v-form ref="registerForm" lazy-validation>
                  <v-row>
                    <v-col cols="8">
                      <v-text-field
                        v-model="registerEmail"
                        label="E-mail"
                        prepend-inner-icon="mdi-email"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="registerUsername"
                        label="Username"
                        prepend-inner-icon="mdi-account"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="registerPassword"
                        label="Password"
                        prepend-inner-icon="mdi-lock"
                        required
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex mx-auto" cols="12" sm="3" xsm="12">
                      <v-btn
                        x-large
                        block
                        dark
                        color="#4F41C5"
                        v-on:click="register()"
                        >Register</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  computed: {
    userId() {
      return this.$store.getters.userId;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    loginError() {
      return this.$store.getters.loginError;
    },
    registrationComplete() {
      return this.$store.getters.registrationComplete;
    },
    registrationMessage() {
      return this.$store.getters.registrationMessage;
    },
  },
  data() {
    return {
      dialog: true,
      tabs: null,
      showError: false,
      showSuccess: false,
      items: ["login", "register"],
      loginUsername: "",
      loginPassword: "",
      registerEmail: "",
      registerUsername: "",
      registerPassword: "",
    };
  },
  methods: {
    login() {
      const loginUser = {
        username: this.loginUsername,
        password: this.loginPassword,
      };
      this.$store.dispatch("loginUser", loginUser).then(() => {
        if (this.isLoggedIn) {
          this.$router.push({ name: "Home", params: {user: loginUser} });
        } else {
          this.showError = true;
          window.setInterval(() => {
            this.showError = false;
          }, 3000);
        }
      });
    },
    register() {
      const registerUser = {
        email: this.registerEmail,
        username: this.registerUsername,
        password: this.registerPassword,
      };
      this.$store.dispatch("registerUser", registerUser).then(() => {
        if (this.registrationComplete) {
          this.tabs = 0;
          this.registerEmail = "";
          this.registerUsername = "";
          this.registerPassword = "";
          this.showSuccess = true;
          window.setInterval(() => {
            this.showSuccess = false;
          }, 3000);
        } else {
          this.showError = true;
          window.setInterval(() => {
            this.showError = false;
          }, 3000);
        }
      });
    },
  },
};
</script>

<style lang="css">
.v-text-field--outlined >>> fieldset {
  border-color: white;
}
</style>
