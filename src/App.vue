<template>
  <v-app>
    <v-app-bar app absolute color="primary" fixed>
      <v-app-bar-nav-icon dark @click="drawer = true" />
      <router-link to="/" class="ml-3 white--text font-weight-bold">
        <v-icon dark v-text="'mdi-star-three-points'" />
        InovaChallenge
      </router-link>

      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        class="ml-10"
        hide-details
        clearable
        dense
        dark
        rounded
        filled
        placeholder="Pesquise projetos, usuários ou as skills desejadas"
      />

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

export default {
  name: "App",
  data: () => ({
    menuOptions,
    drawer: false,
    search: null
  })
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
