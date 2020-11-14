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
                index) in projects"
              >
                <v-list-item :key="id" link :to="`/projects/${code}`">
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
                        <span class="caption font-italic">necessidades: </span>
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
                  <v-list-item-content>
                    <v-row class="fill-height" justify="end" align="start">
                      <v-col
                        cols="12"
                        class="text-end py-0 font-weight-medium "
                        v-text="'Autores'"
                      />
                      <v-col
                        cols="12"
                        class="text-end py-0"
                        v-for="author in authors"
                        :key="author.id"
                      >
                        <v-list-item-title class="my-0">
                          {{ author.name }}
                        </v-list-item-title>
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

export default {
  name: "home",
  data: () => ({
    projects
  })
};
</script>
