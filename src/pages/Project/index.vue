<template>
  <v-row v-if="project">
    <v-col>
      <v-row align="center">
        <v-col cols="6" class="py-0">
          <code class="ml-3">
            @{{ authors[0].username }}:{{ projectCode }}
          </code>
          <v-subheader class="text-h2 font-weight-normal my-5">
            {{ project.name }}
          </v-subheader>

          <v-subheader class="caption mt-n5">
            {{ project.title }}
          </v-subheader>

          <v-spacer />
        </v-col>
        <v-col cols="6" class="pa-0">
          <v-row justify="end">
            <v-col cols="auto">
              <v-subheader class="caption mt-n5">
                Autores
              </v-subheader>
              <v-list class="pa-0" link>
                <v-list-item
                  :to="`/profile/${author.id}`"
                  v-for="author in authors"
                  :key="author.username"
                >
                  <v-list-item-avatar>
                    <v-avatar>
                      <img :src="author.user.avatar" />
                    </v-avatar>
                  </v-list-item-avatar>
                  <v-list-item-content class="py-0">
                    <v-subheader>
                      {{ author.name }}
                    </v-subheader>
                    <v-subheader class="caption mt-n8">
                      @{{ author.username }}
                    </v-subheader>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-btn depressed color="primary">
            <v-icon left>mdi-plus</v-icon>
            Seguir
          </v-btn>

          <v-btn depressed color="primary" class="ml-2">
            <v-icon left>mdi-arrow-bottom-right-thick</v-icon>
            Candidatar-se
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card outlined>
            <v-card-title>
              <v-subheader class="pa-0 font-weight-medium">
                Descrição
              </v-subheader>
            </v-card-title>
            <v-card-text class="text-justify">
              {{ project.description }}
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
          <v-col cols="12" class="pl-5 py-0">
            <span class="caption font-italic">necessidades: </span>
            <v-chip
              v-for="needing in project.needings"
              :key="needing"
              v-text="needing"
              class="mr-1"
              dark
              color="orange darken-2"
              small
            />
          </v-col>
          <v-col cols="12" class="pl-5">
            <span class="caption font-italic">tags: </span>
            <v-chip
              v-for="tag in project.tags"
              :key="tag"
              v-text="tag"
              class="mr-1"
              color="primary"
              small
            />
          </v-col>
        </v-col>

        <v-col cols="6">
          <v-card outlined>
            <v-card-title>
              <v-subheader class="pa-0 font-weight-medium">
                Atualizações
              </v-subheader>
            </v-card-title>
            <v-card-text>
              <v-timeline v-if="posts.length">
                <v-timeline-item v-for="post in posts" :key="post.content">
                  <template v-slot:icon>
                    <v-avatar>
                      <img :src="post.author.avatar" />
                    </v-avatar>
                  </template>
                  <template v-slot:opposite>
                    <span>{{ post.date }}</span>
                  </template>
                  <v-card outlined>
                    <v-card-title> @{{ post.author.username }} </v-card-title>
                    <v-card-text>{{ post.content }}</v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import users from "@/config/database/users";
import projects from "@/config/database/projects";
import feed from "@/config/database/feed";

export default {
  name: "profile",
  props: {
    projectCode: String
  },
  data: () => ({
    user: users[0],
    users
  }),
  computed: {
    userProjects() {
      return projects.filter(p => p.authors.find(a => a.id === this.user.id));
    },
    project() {
      return projects[projects.findIndex(p => p.code === this.projectCode)];
    },
    authors() {
      const authors = projects.find(p => p.code === this.projectCode).authors;
      return authors.map(author => ({
        ...author,
        user: this.users.find(user => user.id === author.id)
      }));
    },
    posts() {
      const posts = feed.filter(post =>
        post.projectsID.includes(this.project.id)
      );
      return posts
        .map(post => ({
          ...post,
          author: this.users.find(user => user.id === post.authorID)
        }))
        .sort((a, b) => (a.data < b.date ? -1 : 1));
    }
  }
};
</script>
