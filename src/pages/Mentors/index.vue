<template>
  <v-row>
    <v-col cols="12">
      <v-subheader class="text-h2 font-weight-normal">Mentores</v-subheader>
    </v-col>
    <v-col>
      <v-card outlined>
        <v-row>
          <v-col cols="12">
            <v-list three-line>
              <template
                v-for="({
                  name,
                  bio,
                  skills,
                  projects,
                  avatar
                },
                index) in mentors"
              >
                <v-list-item :key="name" link>
                  <v-list-item-avatar>
            <v-img :src="avatar"></v-img>
          </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">
                      {{ name }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ bio }}
                    </v-list-item-subtitle>
                    <v-row>
                      
                      <v-col class="pb-0">
                        <span class="caption font-italic">skills: </span>
                        <v-chip
                          v-for="(skill, index) in skills"
                          :key="`${skill}_${index}`"
                          v-text="skill"
                          dark
                          color="orange darken-2"
                          class="mr-1 mt-1"
                          small
                        />
                      </v-col>
                      <v-col cols="12">
                        <span class="caption font-italic">projetos: </span>
                        <v-chip
                          v-for="(project, index) in projects"
                          :key="`${project}_${index}`"
                          v-text="projectList[project].name"
                          color="primary"
                          class="mr-1 mt-1"
                          small
                        />
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                  
                  <v-list-item-action class="my-auto">
                    <v-row class="fill-height" justify="center" align="center">
                      <v-col cols="auto" class="text-center">
                        <v-btn icon @click.prevent="() => {}">
                          <v-icon>
                            mdi-star-outline
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="index < mentors.length - 1"
                  :key="`${name}_divider`"
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
import mentors from "@/config/database/mentors";
import projectList from "@/config/database/projects";

export default {
  name: "mentors",
  data: () => ({
    mentors,
    projectList
  })
};
</script>
