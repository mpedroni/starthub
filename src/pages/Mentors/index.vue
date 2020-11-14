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
                  avatar,
                  institute,
                  price
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
                      <span v-if="institute" class="caption">
                        - {{ institute }}</span
                      >
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ bio }}
                    </v-list-item-subtitle>
                    <v-row>
                      <v-col cols="auto" class="pb-0">
                        <span class="caption font-italic">valor hora: </span>
                        <v-chip
                          v-text="price ? 'R$' + price.toFixed(2) : 'grátis'"
                          dark
                          color="green darken-1"
                          class="mr-1 mt-1"
                          small
                        />
                      </v-col>
                      <v-col cols="auto" class="pb-0">
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
                      <v-col cols="auto" v-if="projects.length">
                        <span class="caption font-italic"
                          >projetos mentorados:
                        </span>
                        <v-chip
                          v-for="(project, index) in projects"
                          :key="`${project}_${index}`"
                          v-text="projectList[project].name"
                          color="primary"
                          class="mr-1 mt-1"
                          small
                        />
                      </v-col>
                      <v-col v-else cols="auto" class="mt-1">
                        <span class="caption font-italic"
                          >Nenhum projeto mentorado</span
                        >
                      </v-col>
                      <v-col cols="12" class="text-end">
                        <v-btn color="primary" depressed class="mx-2">
                          <v-icon left>
                            mdi-plus
                          </v-icon>
                          seguir
                        </v-btn>
                        <v-btn color="primary" depressed>
                          <v-icon left>
                            mdi-clock-outline
                          </v-icon>
                          Agendar Mentoria
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
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
