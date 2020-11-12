<template>
  <v-row>
    <v-col>
      <v-row align="center">
        <v-col cols="auto" class="py-0">
          <v-subheader class="text-h2 font-weight-normal mb-2">
            {{ user.name }}
          </v-subheader>

          <v-col class="pl-5 py-0">
            <span class="caption font-italic">skills: </span>
            <v-chip
              v-for="skill in user.skills"
              :key="skill"
              v-text="skill"
              class="mr-1"
              color="primary"
              small
            />
          </v-col>
          <v-spacer />
        </v-col>
        <v-col class="text-end py-0">
          <v-avatar size="110">
            <img :src="user.avatar" :alt="user.name" />
          </v-avatar>
        </v-col>

        <v-col cols="12">
          <v-btn depressed color="primary">
            <v-icon left>mdi-plus</v-icon>
            Seguir
          </v-btn>

          <v-btn depressed color="primary" class="ml-2">
            <v-icon left>mdi-message-outline</v-icon>
            Enviar Mensagem
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card outlined>
            <v-card-title>
              <v-subheader class="pa-0 font-weight-medium">
                Biografia
              </v-subheader>
            </v-card-title>
            <v-card-text class="text-justify">
              {{ user.bio }}
            </v-card-text>
          </v-card>

          <v-col class="px-0">
            <v-card outlined>
              <v-card-title>
                <v-subheader class="pa-0 font-weight-medium">
                  Posts
                </v-subheader>
              </v-card-title>
              <v-list three-line>
                <template
                  v-for="({ id, title, description }, index) in userProjects"
                >
                  <v-list-item :key="id" link>
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium">
                        {{ title }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ description }}
                      </v-list-item-subtitle>
                      <v-row justify="end">
                        <v-col cols="auto">
                          <v-btn icon>
                            <v-icon>mdi-heart</v-icon>
                          </v-btn>
                        </v-col>
                        <v-col cols="auto">
                          <v-btn icon>
                            <v-icon>mdi-share</v-icon>
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider
                    v-if="index < userProjects.length - 1"
                    :key="`${id}_divider`"
                  />
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-col>

        <v-col cols="6">
          <v-card outlined>
            <v-card-title>
              <v-subheader class="pa-0 font-weight-medium">
                Projetos
              </v-subheader>
            </v-card-title>
            <v-list three-line>
              <template
                v-for="({ id, title, description, tags, locality },
                index) in userProjects"
              >
                <v-list-item :key="id" link>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">
                      {{ title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      description
                    }}</v-list-item-subtitle>
                    <v-row>
                      <v-col cols="12" class="caption pb-0">
                        {{ `${locality.city} | ${locality.state}` }}
                      </v-col>
                      <v-col cols="12">
                        <span class="caption font-italic">tags: </span>
                        <v-chip
                          v-for="(tag, index) in tags"
                          :key="`${tag}_${index}`"
                          v-text="tag"
                          color="primary"
                          class="mr-1 mt-1"
                          small
                        />
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
                <v-divider
                  v-if="index < userProjects.length - 1"
                  :key="`${id}_divider`"
                />
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import users from "@/config/database/users";
import projects from "@/config/database/projects";

export default {
  name: "profile",
  data: () => ({
    user: users[0]
  }),
  computed: {
    userProjects() {
      return projects.filter(p => p.authors.find(a => a.id === this.user.id));
    }
  }
};
</script>
