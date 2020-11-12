<template>
  <v-card outlined class="mx-auto py-2 px-3" color="grey lighten-5">
    <v-row>
      <v-col cols="12">
        <v-list three-line>
          <v-list-item v-for="{ id, title, description, author, tags } in projects" :key="id" link>
            <v-list-item-content>
              <v-list-item-title class="font-weight-medium">{{ title }}</v-list-item-title>
              <v-list-item-subtitle>{{ description }}</v-list-item-subtitle>
              <v-row>
                <v-col>
                  <span class="caption">tags: </span>
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
              <v-row justify="end" fill-height align="start">
                <v-col cols="auto" class="py-0">
                  <v-list-item-title class="font-weight-medium">{{ author.name }}</v-list-item-title>
                </v-col>
                <v-col cols="12" class="py-0 text-end">
                  <v-chip 
                    v-for="(skill, index) in author.skills" 
                    :key="`${skill}_${index}`" 
                    v-text="skill"
                    color="secondary"
                    class="mr-1 mt-1"
                    small
                  />
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-list-item-action class="my-auto">
              <v-row justify="center" fill-height align="center" >
                <v-col cols="auto" class="pa-0 text-center">
                  <v-btn icon @click.prevent="() => {}">
                    <v-icon>
                      mdi-star-outline
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import projects from "@/config/database/projects"

export default {
  name: "home",
  data: () => ({
    projects
  })
}
</script>