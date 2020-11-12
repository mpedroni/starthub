<template>
  <v-row>
    <v-col cols="12">
      <v-subheader class="text-h2 font-weight-normal">Aceleradoras</v-subheader>
    </v-col>
    <v-col
      cols="6"
      v-for="{ name, logo, description } in accelerators"
      :key="name"
    >
      <v-card outlined class="px-4">
        <v-row justify="center">
          <v-col cols="auto" class="text-center">
            <v-img width="200" :src="logo" />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto" class="text-center text-justify">
            {{ description }}
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn text color="primary">
              Saiba Mais
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import accelerators from "@/config/database/accelerators";

export default {
  name: "home",
  data: () => ({
    accelerators
  })
};
</script>
