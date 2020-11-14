<template>
  <v-row>
    <v-col cols="12">
      <v-subheader class="text-h2 font-weight-normal">Projetos</v-subheader>
    </v-col>
    <v-col>
      <v-card outlined>
        <v-row>
          <v-col cols="12">
            <v-list three-line>
              <template
                v-for="({
                  id,
                  title,
                  description,
                  authors,
                  tags,
                  needings,
                  locality,
                  code
                },
                index) in filteredProjects"
              >
                <v-list-item :key="id" link :to="`/projects/${code}`">
                  <v-row>
                    <v-col cols="9">
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
                          <v-col class="pb-0">
                            <span class="caption font-italic"
                              >necessidades:
                            </span>
                            <v-chip
                              v-for="(needing, index) in needings"
                              :key="`${needing}_${index}`"
                              v-text="needing"
                              dark
                              color="orange darken-2"
                              class="mr-1 mt-1"
                              small
                            />
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
                    </v-col>
                    <v-col cols="3">
                      <v-list link>
                        <v-subheader class="mt-n5 font-weight-bold">
                          Autores
                        </v-subheader>
                        <v-list-item
                          :to="`/profile/${author.username}`"
                          v-for="author in authors"
                          :key="author.id"
                        >
                          <v-list-item-avatar class="my-auto py-0">
                            <img :src="author.avatar" />
                          </v-list-item-avatar>
                          <v-list-item-content class="py-0">
                            <v-row align="center">
                              <v-col cols="12" class="py-0">
                                <span>
                                  {{ author.name }}
                                </span>
                              </v-col>
                              <v-col cols="12" class="py-0">
                                <span class="caption">
                                  @{{ author.username }}
                                </span>
                              </v-col>
                            </v-row>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-divider
                  v-if="index < projects.length - 1"
                  :key="`${id}_divider`"
                />
              </template>
            </v-list>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import projects from "@/config/database/projects";
import users from "@/config/database/users";

export default {
  name: "home",
  data: () => ({
    projects,
    users
  }),
  computed: {
    filteredProjects() {
      return projects.map(project => ({
        ...project,
        authors: users.filter(user =>
          project.authors.find(author => author.id === user.id)
        )
      }));
    }
  }
};
</script>
