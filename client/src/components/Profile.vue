<template>
  <v-app>
    <v-dialog v-model="profileDialog" width="800px" persistent>
      <v-card>
        <v-alert
          v-model="showErrorProfile"
          color="pink"
          dark
          border="top"
          icon="mdi-error"
          transition="scale-transition"
        >
          New password can't be empty
        </v-alert>
        <v-card-title class="grey darken-2">Profile</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-account"
                placeholder="Username"
                v-model="user.username"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-email"
                placeholder="E-mail"
                v-model="user.email"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-lock"
                placeholder="Old password"
                readonly
                :value="user.password"
                :append-icon="oldPasswordState ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (oldPasswordState = !oldPasswordState)"
                :type="oldPasswordState ? 'password' : 'text'"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                :rules="newPasswordRules"
                prepend-icon="mdi-lock"
                placeholder="New password"
                v-model="newPassword"
                :append-icon="newPasswordState ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="() => (newPasswordState = !newPasswordState)"
                :type="newPasswordState ? 'password' : 'text'"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions style="display:flex; justify-content: space-between">
          <v-btn
            class="ma-2"
            color="error"
            outlined
            @click="closeProfileDialog"
          >
            <v-icon left dark>mdi-close</v-icon>
            Close</v-btn
          >
          <v-btn class="ma-2" color="success" outlined @click="saveChanges">
            <v-icon left dark>mdi-content-save</v-icon>
            Save changes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profileDialog() {
      return this.$store.getters.profileDialog;
    },
    user() {
      return this.$store.getters.user;
    },
    showErrorProfile() {
      return this.$store.getters.showErrorProfile;
    }
  },
  data() {
    return {
      newPassword: "",
      newPasswordRules: [
        newPassword => !!newPassword || "New password is required",
        newPassword =>
          /^(?!\s*$).+/.test(newPassword) || "New password can't be blank"
      ],
      oldPasswordState: String,
      newPasswordState: String
    };
  },
  methods: {
    closeProfileDialog: function() {
      this.newPassword = "";
      this.$store.dispatch("closeProfileDialog");
    },
    saveChanges: function() {

      const payload = {
        user: this.user,
        newPassword: this.newPassword
      };
      if (payload.user && payload.newPassword) {
        this.$store.dispatch("saveChanges", payload).then(() => {
          if (!this.showErrorProfile) {
            payload.user.password = payload.newPassword;
            this.$store.dispatch("setUser", payload);
            this.newPassword = "";
            this.$store.dispatch("closeProfileDialog");
          } else {
            window.setInterval(() => {
              this.$store.dispatch("closeErrorProfileDialog");
            }, 3000);
          }
        });
      } else {
        this.$store.dispatch("openErrorProfileDialog");
        window.setInterval(() => {
          this.$store.dispatch("closeErrorProfileDialog");
        }, 3000);
      }
    }
  }
};
</script>

<style></style>
