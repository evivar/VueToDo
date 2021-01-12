<template>
  <v-app id="inspire">
    <v-main style="background-color: #181924">
      <v-container>
        <v-row>
          <v-col cols="12" sm="4">
            <v-sheet
              rounded="lg"
              min-height="32vh"
              style="bacground-color: #24252f"
            >
              <div class="px-2 py-4">
                <v-card elevation="2">
                  <div
                    style="display:flex; justify-content:center;align-items:center"
                  >
                    <div style="display:flex; flex-direction:column">
                      <v-card-title style="justify-content: start">{{
                        user.username
                      }}</v-card-title>
                      <v-card-subtitle style="text-align:start;padding-top:0px">
                        {{ user.email }}
                      </v-card-subtitle>
                    </div>
                    <v-card-actions style="width:100%;justify-content:center">
                      <v-btn outlined @click="openProfileDialog">
                        <v-icon left dark>mdi-account</v-icon>
                        Profile
                      </v-btn>
                    </v-card-actions>
                  </div>
                  <v-card-text>
                    <div>
                      <v-progress-linear
                        background-color="#505159"
                        color="success"
                        rounded
                        height="20"
                        v-model="nonCompletedPct"
                        class="no-click"
                      >
                        {{ nonCompleted.length }}/{{ totalNotes }} Active notes
                      </v-progress-linear>
                      <br />
                      <v-progress-linear
                        background-color="#505159"
                        color="error"
                        rounded
                        height="20"
                        v-model="completedPct"
                        class="no-click"
                      >
                        {{ completed.length }}/{{ totalNotes }} Completed notes
                      </v-progress-linear>
                      <br />
                      <v-progress-linear
                        background-color="#505159"
                        color="#181924"
                        rounded
                        height="20"
                        value="100"
                        class="no-click"
                      >
                        {{ totalNotes }} Notes
                      </v-progress-linear>
                    </div>
                  </v-card-text>
                </v-card>
              </div>
              <div>
                <v-btn
                  class="ma-2"
                  outlined
                  color="error"
                  @click="deleteCompletedNotes"
                >
                  <v-icon left dark>mdi-delete</v-icon>
                  Delete completed notes
                </v-btn>
                <v-btn class="ma-2" outlined color="white" @click="logout">
                  <v-icon left dark>mdi-exit-to-app</v-icon>
                  Logout
                </v-btn>
              </div>
            </v-sheet>
            <br />
            <v-sheet
              rounded="lg"
              min-height="auto"
              style="bacground-color: #24252f"
            >
              <div class="px-6 py-4">
                <v-card elevation="2">
                  <v-card-title>New Note</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="12">
                        <v-textarea
                          outlined
                          name="input-7-4"
                          label="Note"
                          v-model="note"
                        ></v-textarea>
                      </v-col>
                      <v-col>
                        <v-btn outlined color="white" @click="addNote">
                          <v-icon left dark>mdi-plus</v-icon>
                          Add note
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-sheet
              height="96vh"
              rounded="lg"
              style="bacground-color: #24252f"
            >
              <div style="height: 65%; padding:.25em">
                <h2>Active notes</h2>
                <hr />
                <div class="notesDiv" style="overflow-y: auto; height: 90%">
                  <v-card
                    elevation="5"
                    class="ma-2"
                    style="background-color: #4638C2"
                    v-for="note of nonCompleted"
                    :key="note.id"
                  >
                    <v-card-title>{{ note.note }}</v-card-title>
                    <v-card-subtitle style="text-align: end">{{
                      note.created
                    }}</v-card-subtitle>
                    <v-card-actions>
                      <v-btn
                        outlined
                        color="error"
                        @click="deleteNote(note.id)"
                      >
                        <v-icon center dark>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn
                        outlined
                        color="success"
                        @click="completeNote(note.id)"
                      >
                        <v-icon center dark>mdi-check</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </div>
              <div style="height: 35%; padding:.25em">
                <h2>Completed notes</h2>
                <hr />
                <div class="notesDiv" style="overflow-y: auto; height: 90%">
                  <v-card
                    elevation="5"
                    class="ma-2"
                    style="background-color: #4638C2"
                    v-for="note of completed"
                    :key="note.id"
                  >
                    <v-card-title style="text-decoration:line-through">{{
                      note.note
                    }}</v-card-title>
                    <v-card-actions>
                      <v-btn
                        outlined
                        color="error"
                        @click="deleteNote(note.id)"
                      >
                        <v-icon center dark>mdi-delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </div>
              </div>
            </v-sheet>
          </v-col>
          <profile></profile>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Profile from "./Profile.vue";

export default {
  name: "Home",
  components: {
    Profile
  },
  mounted() {
    if (!this.isLoggedIn) {
      this.$router.push({ path: "/login" });
    } else {
      this.$store.dispatch("setUser", this.$route.params);
      this.$store.dispatch("getNotes");
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    completed() {
      return this.$store.getters.completed;
    },
    nonCompleted() {
      return this.$store.getters.nonCompleted;
    },
    totalNotes() {
      return this.$store.getters.totalNotes;
    },
    completedPct() {
      return this.$store.getters.completedPct;
    },
    nonCompletedPct() {
      return this.$store.getters.nonCompletedPct;
    }
  },
  data() {
    return {
      note: ""
    };
  },
  methods: {
    openProfileDialog() {
      this.$store.dispatch("openProfileDialog");
    },
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: "/login" });
      });
    },
    deleteCompletedNotes: function() {
      this.$store.dispatch("deleteCompletedNotes");
    },
    addNote: function() {
      if (this.note.length > 0) {
        this.$store.dispatch("addNote", this.note).then(() => {
          this.note = "";
        });
      }
    },
    deleteNote: function(noteId) {
      this.$store.dispatch("deleteNote", noteId);
    },
    completeNote: function(noteId) {
      this.$store.dispatch("completeNote", noteId);
    }
  }
};
</script>

<style lang="css">
.no-click {
  pointer-events: none;
}

.notesDiv {
  margin-top: 0.5em;
  border-radius: 20px;
}

.notesDiv::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.notesDiv::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 20px;
  border-radius: 20px;
}

/* Handle */
.notesDiv::-webkit-scrollbar-thumb {
  -webkit-border-radius: 20px;
  border-radius: 20px;
  background: white;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
.notesDiv::-webkit-scrollbar-thumb:window-inactive {
  background: lightgrey;
}
</style>
