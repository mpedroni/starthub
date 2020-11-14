<template>
  <v-app>
    <v-app-bar app absolute color="primary" fixed>
      <v-app-bar-nav-icon dark @click="drawer = true" />
      <router-link to="/" class="ml-3 white--text font-weight-bold">
        <v-icon dark v-text="'mdi-star-three-points'" />
        StartHUB
      </router-link>

      <v-combobox
        v-if="!clearSearchInput"
        v-model="search"
        :items="options"
        small-chips
        prepend-inner-icon="mdi-magnify"
        class="ml-10"
        label="Escolha os filtros e digite o que quiser buscar"
        hide-details
        ref="searchInput"
        hide-selected
        no-filter
        deletable-chips
        clearable
        dense
        dark
        rounded
        filled
        multiple
        @update:search-input="onInput($event)"
      >
        <template v-if="searching" v-slot:item="{ on, item: option }">
          <v-row>
            <v-col>
              <v-list-item
                v-if="
                  option.type.includes('projects') ||
                    option.type.includes('tags') ||
                    option.type.includes('needings')
                "
                link
                v-on="on"
                @click="click(option)"
              >
                <v-list-item-content>
                  <v-col class="pa-0">
                    <v-chip x-small class="mr-1 font-weight-medium">
                      Projeto
                    </v-chip>
                  </v-col>

                  <v-list-item-title
                    v-if="option.type.includes('projects')"
                    v-html="
                      option.name.replace(
                        option.query,
                        `<span class='red--text'>${option.query}</span>`
                      )
                    "
                  />

                  <v-list-item-title v-else>
                    {{ option.name }}
                  </v-list-item-title>

                  <v-list-item-subtitle
                    v-if="option.type.includes('projects')"
                    v-html="
                      option.abstract.replace(
                        option.query,
                        `<span class='red--text'>${option.query}</span>`
                      )
                    "
                  />

                  <v-list-item-subtitle v-else>
                    {{ option.abstract }}
                  </v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-if="option.type.includes('projects')"
                    v-html="
                      option.description.replace(
                        option.query,
                        `<span class='red--text'>${option.query}</span>`
                      )
                    "
                  />

                  <v-list-item-subtitle v-else>
                    {{ option.description }}
                  </v-list-item-subtitle>

                  <v-col
                    v-if="option.type.includes('tags')"
                    cols="12"
                    class="pa-0 pt-2"
                  >
                    <span class="caption font-italic">tags: </span>
                    <v-chip
                      v-for="tag in option.tags"
                      :key="tag"
                      x-small
                      class="mr-1 font-weight-medium"
                      :color="tag.includes(option.query) ? 'primary' : null"
                    >
                      {{ tag }}
                    </v-chip>
                  </v-col>

                  <v-col
                    v-if="option.type.includes('needings')"
                    cols="12"
                    class="pa-0 pt-2"
                  >
                    <span class="caption font-italic">necessidades: </span>
                    <v-chip
                      v-for="needing in option.needings"
                      :key="needing"
                      x-small
                      class="mr-1 font-weight-medium"
                      :color="
                        needing.includes(option.query)
                          ? 'orange darken-2'
                          : null
                      "
                    >
                      {{ needing }}
                    </v-chip>
                  </v-col>
                </v-list-item-content>

                v-list-item
              </v-list-item>

              <v-list-item
                v-if="
                  option.type.includes('people') ||
                    option.type.includes('skills')
                "
                link
                v-on="on"
                @click="click(option)"
              >
                <v-list-item-content>
                  <v-col class="pa-0">
                    <v-chip x-small class="mr-1 font-weight-medium">
                      {{ option.usertype === "Membro" ? "Membro" : "Mentor" }}
                    </v-chip>
                  </v-col>

                  <v-row>
                    <v-col cols="auto">
                      <v-avatar>
                        <img :src="option.avatar" :alt="option.name" />
                      </v-avatar>
                    </v-col>

                    <v-col>
                      <v-list-item-title v-if="option.type.includes('people')">
                        <span
                          v-html="
                            option.name.replace(
                              option.query,
                              `<span class='red--text'>${option.query}</span>`
                            )
                          "
                        />
                      </v-list-item-title>

                      <v-list-item-title v-else>
                        {{ option.name }}
                      </v-list-item-title>

                      <v-list-item-subtitle
                        v-if="option.type.includes('people') && option.username"
                        v-html="
                          '@' +
                            option.username.replace(
                              option.query,
                              `<span class='red--text'>${option.query}</span>`
                            )
                        "
                      />

                      <v-list-item-subtitle v-else-if="option.username">
                        {{ option.username }}
                      </v-list-item-subtitle>

                      <v-list-item-subtitle
                        class="text-wrap text-justify"
                        v-if="
                          option.type.includes('people') && !option.username
                        "
                        v-html="
                          option.bio.replace(
                            option.query,
                            `<span class='red--text'>${option.query}</span>`
                          )
                        "
                      />

                      <v-list-item-subtitle v-else-if="!option.username">
                        {{ option.bio }}
                      </v-list-item-subtitle>
                    </v-col>

                    <v-col
                      v-if="option.type.includes('skills')"
                      cols="12"
                      class="pt-0"
                    >
                      <span class="caption font-italic">skills: </span>
                      <v-chip
                        v-for="skill in option.skills"
                        :key="skill"
                        x-small
                        class="mr-1 font-weight-medium"
                        :color="skill.includes(option.query) ? 'primary' : null"
                      >
                        {{ skill }}
                      </v-chip>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>

              <v-divider />
            </v-col>
          </v-row>
        </template>
      </v-combobox>

      <v-spacer></v-spacer>

      <v-btn
        icon
        dark
        @click="
          () => {
            $router.push('/inbox');
          }
        "
      >
        <v-icon v-text="'mdi-message-text-outline'" />
      </v-btn>

      <v-btn
        icon
        dark
        @click="
          () => {
            $router.push('/login');
          }
        "
      >
        <v-icon v-text="'mdi-exit-to-app'" />
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      color="grey lighten-3"
      temporary
      mini-variant
    >
      <v-row justify="center" align="center">
        <template v-for="{ name, icon, path } in menuOptions">
          <v-col :key="name" class="text-center">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  v-on="on"
                  :to="path"
                  :color="$route.path === path ? 'primary' : ''"
                  icon
                >
                  <v-icon v-text="icon" />
                </v-btn>
              </template>
              <span v-text="name" />
            </v-tooltip>
          </v-col>
        </template>
      </v-row>
    </v-navigation-drawer>
    <v-main>
      <v-container class="px-16" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import menuOptions from "@/config/menu";

import projects from "@/config/database/projects";
import users from "@/config/database/users";
import mentors from "@/config/database/mentors";

const DEFAULT_OPTIONS = [
  "projetos",
  "tags",
  "necessidades",
  "skills",
  "pessoas"
];

export default {
  name: "App",
  data: () => ({
    menuOptions,
    searching: false,
    drawer: false,
    search: null,
    options: DEFAULT_OPTIONS,
    clearSearchInput: false
  }),
  computed: {
    people() {
      return [...users, ...mentors];
    }
  },
  methods: {
    onInput(query) {
      if (!query) {
        this.options = DEFAULT_OPTIONS;
        this.searching = false;
        return;
      }

      this.searching = true;
      const findAny = !this.search?.length;
      this.options = [];

      if (findAny || this.search.includes("projetos")) {
        for (const project of projects) {
          for (const attr in project) {
            if (
              typeof project[attr] === "string" &&
              project[attr].toLowerCase().includes(query.toLowerCase())
            ) {
              this.options.push({
                id: project.id,
                name: project.name,
                description: project.description,
                abstract: project.title,
                type: `projects${
                  findAny || this.search?.includes("tags") ? ", tags" : ""
                }${
                  findAny || this.search?.includes("necessidades")
                    ? ", needings"
                    : ""
                }`,
                tags: project.tags,
                needings: project.needings,
                path: `/projects/${project.code}`,
                query
              });

              break;
            }
          }
        }
      }

      if (findAny || this.search.includes("tags")) {
        for (const project of projects) {
          if (
            project.tags.find(tag => tag.includes(query)) &&
            !this.options.find(o => o.id === project.id)
          ) {
            this.options.push({
              id: project.id,
              name: project.name,
              description: project.description,
              abstract: project.title,
              type: `tags${
                findAny || this.search.includes("necessidades")
                  ? ", needings"
                  : ""
              }`,
              path: `/projects/${project.code}`,
              tags: project.tags,
              needings: project.needings,
              query
            });
          }
        }
      }

      if (findAny || this.search.includes("necessidades")) {
        for (const project of projects) {
          if (
            project.needings.find(n => n.includes(query)) &&
            !this.options.find(o => o.id === project.id)
          ) {
            this.options.push({
              id: project.id,
              name: project.name,
              description: project.description,
              abstract: project.title,
              type: "needings",
              path: `/projects/${project.code}`,
              tags: project.tags,
              needings: project.needings,
              query
            });
          }
        }
      }

      if (findAny || this.search.includes("pessoas")) {
        for (const person of this.people) {
          for (const attr in person) {
            if (
              typeof person[attr] === "string" &&
              !["avatar", "usertype"].includes(attr) &&
              person[attr].includes(query)
            ) {
              this.options.push({
                id: person.id,
                name: person.name,
                username: person.username,
                bio: person.bio,
                avatar: person.avatar,
                usertype: person.usertype,
                skills: person.skills,
                type: `people${
                  findAny || this.search.includes("skills") ? ", skills" : ""
                }`,
                path: `/${person.username}`,
                query
              });

              break;
            }
          }
        }
      }

      if (findAny || this.search.includes("skills")) {
        for (const person of this.people) {
          if (
            person.skills.find(skill => skill.includes(query)) &&
            !this.options.find(
              o => o.id === person.id && o.type.includes("people")
            )
          ) {
            this.options.push({
              id: person.id,
              name: person.name,
              username: person.username,
              bio: person.bio,
              avatar: person.avatar,
              usertype: person.usertype,
              skills: person.skills,
              type: "skills",
              path: `/${person.username}`,
              query
            });

            break;
          }
        }
      }

      console.log(this.options);
    },
    click({ path }) {
      this.clearSearchInput = true;

      setTimeout(() => {
        this.options = DEFAULT_OPTIONS;
        this.search = [];
        this.searching = false;
        this.clearSearchInput = false;
      }, 10);

      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
