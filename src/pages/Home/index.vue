<template>
  <v-row>
    <v-col cols="3">
      <v-card outlined>
        <v-col class="py-0 text-center grey lighten-4">
          <v-avatar size="110">
            <img :src="user.avatar" :alt="user.name" />
          </v-avatar>
        </v-col>
        <v-col class="text-center py-0 grey lighten-4">
          {{ user.name }}
        </v-col>
        <v-col class="text-center caption pt-0 grey lighten-4 ">
          @{{ user.username }}
        </v-col>
        <v-divider />
        <v-list nav color="grey lighten-5">
          <v-subheader class="px-0">Meus Projetos</v-subheader>
          <v-list-item
            link
            v-for="project in userProjects"
            :key="project.id"
            class="py-0 my-0"
            :to="`projects/${project.code}`"
          >
            <v-list-item-content class="body-2">
              {{ project.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card outlined class="mt-3">
        <v-list nav color="grey lighten-5">
          <v-subheader class="px-0">Deu Match!</v-subheader>
          <v-subheader class="pa-0 mt-n6 caption"
            >Projetos que estão precisando de você</v-subheader
          >
          <v-list-item
            link
            v-for="project in suggestedProjects"
            :key="project.id"
            class="py-0 my-0"
            :to="`projects/${project.code}`"
          >
            <v-list-item-content class="body-2">
              {{ project.name }}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="9" class="pt-0">
      <v-row>
        <v-col cols="7">
          <v-textarea
            v-model="publication"
            placeholder="Escreva sua publicação ou atualizações de seus projetos"
            outlined
          />
        </v-col>
        <v-col cols="5">
          <v-row>
            <v-col cols="auto" class="px-0 pt-4">
              <v-icon :color="projects.length ? 'primary' : 'secondary'"
                >mdi-link-variant</v-icon
              >
            </v-col>
            <v-col class="py-0">
              <v-combobox
                v-model="projects"
                clearable
                deletable-chips
                hide-selected
                label="Escolha o projeto"
                multiple
                outlined
                persistent-hint
                small-chips
                :items="userProjects"
                item-text="name"
              />
              <v-col cols="12" class="px-0 pb-0 mt-3">
                <v-btn depressed color="primary" block :disabled="!publication">
                  Publicar
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-card
        outlined
        v-for="{
          authorID,
          content,
          date,
          projectCode,
          likes,
          shares,
          liked,
          comments,
          projectsID
        } in feed"
        :key="content"
        class="mb-3"
        color="grey lighten-5"
      >
        <v-row>
          <v-col cols="auto">
            <v-avatar class="ml-2" size="70">
              <img :src="getUser(authorID).avatar" />
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-row>
              <v-col cols="8" class="py-0">
                <v-subheader class="font-weight-medium">
                  {{ getUser(authorID).name }}
                </v-subheader>
                <v-subheader class="mt-n7">
                  {{ date }}
                </v-subheader>
              </v-col>

              <v-col class="text-end pr-5" v-if="projectsID.length">
                <v-chip color="orange darken-2" dark>
                  atualização de projeto
                </v-chip>
              </v-col>

              <v-col cols="12" class="py-0 mt-n2">
                <v-divider class="mr-4" />
              </v-col>

              <v-col
                v-html="
                  content.replace(':projectCode', getProjectCode(projectCode))
                "
              />

              <v-col cols="12">
                <v-btn text :color="liked ? 'red' : null">
                  <v-icon>
                    {{ liked ? "mdi-heart" : "mdi-heart-outline" }}
                  </v-icon>
                  {{ likes }}
                </v-btn>

                <v-btn text>
                  <v-icon>
                    mdi-share
                  </v-icon>
                  {{ shares }}
                </v-btn>
              </v-col>
              <v-col cols="12" class="pb-0 px-6">
                <v-text-field
                  rounded
                  filled
                  placeholder="Adicionar comentário..."
                  append-icon="mdi-send"
                />
              </v-col>
              <v-col cols="12" v-if="comments.length" class="pt-0 mt-n5">
                <v-list py-0>
                  <v-list-item
                    v-for="(comment, index) in comments"
                    :key="index"
                  >
                    <v-list-item-avatar>
                      <v-avatar>
                        <img
                          :src="
                            users.find(user => comment.userID === user.id)
                              .avatar
                          "
                        />
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-subheader>
                        {{ comment.content }}
                      </v-subheader>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import projects from "@/config/database/projects";
import users from "@/config/database/users";
import mentors from "@/config/database/mentors";
import feed from "@/config/database/feed";

export default {
  data: () => ({
    projects: [],
    user: users[0],
    publication: null,
    users: [...users, ...mentors],
    feed
  }),
  computed: {
    userProjects() {
      return projects.filter(p => p.authors.find(a => a.id === this.user.id));
    },
    suggestedProjects() {
      return projects.filter(project =>
        project.needings.find(needing =>
          this.user.skills.find(
            skill => skill.includes(needing) || needing.includes(skill)
          )
        )
      );
    }
  },
  methods: {
    getUser(userID) {
      return this.users.find(u => u.id === userID);
    },
    getProjectCode(projectCode) {
      if (!projectCode) return;

      return `<code><a href="/projects/${
        projectCode.split(":")[1]
      }">${projectCode}</a></code>`;
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
