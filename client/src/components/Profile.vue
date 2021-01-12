<template>
  <v-app>
    <v-dialog v-model="profileDialog" width="800px" persistent>
      <v-card>
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
                value="*********"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-lock"
                placeholder="New password"
                v-model="newPassword"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="error" outlined @click="closeProfileDialog">Close</v-btn>
          <v-btn text color="success" outlined @click="saveChanges">Save changes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profileDialog(){
      return this.$store.getters.profileDialog;
    },
    user(){
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      newPassword: ''
    };
  },
  methods: {
    closeProfileDialog: function(){
      this.$store.dispatch("closeProfileDialog");
    },
    saveChanges: function () {
      console.log("Saving changes");
      this.$store.dispatch("saveChanges", this.transaction);
      this.dialog = false;
    },
  }
};
</script>

<style>
</style>
