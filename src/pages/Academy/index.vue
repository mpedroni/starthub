<template>
  <v-row>
    <v-col cols="12">
      <v-subheader class="text-h2 font-weight-normal">Academy</v-subheader>
    </v-col>
    <v-col
      cols="6"
      v-for="{
        title,
        description,
        institute,
        price,
        date,
        sponsored
      } in academy"
      :key="title"
    >
      <v-card outlined>
        <v-alert
          v-if="sponsored"
          color="amber lighten-5 caption grey--text text--darken-2 font-weight-medium"
          dense
          class="py-1 mb-0"
        >
          CONTEÚDO PATROCINADO
        </v-alert>
        <div class="px-4">
          <v-row justify="center">
            <v-col cols="12" class="pb-0">
              <v-subheader class="text-h5 font-weight-normal pl-0">
                {{ title }}
              </v-subheader>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-subheader class="font-weight-medium mt-n5 pl-0">
                Oferecimento: {{ institute }}
              </v-subheader>
            </v-col>
            <v-col cols="auto" class="text-justify">
              {{ description }}
            </v-col>
            <v-col v-if="date" class="body-2">
              {{ `${date.start} até ${date.end}` }}
            </v-col>
          </v-row>
          <v-row justify="end">
            <v-col>
              <v-chip dark color="orange darken-2">
                {{ price === "0" ? "Grátis" : `R$ ${price}` }}
              </v-chip>
            </v-col>
            <v-col cols="auto">
              <v-btn text color="primary">
                Saiba Mais
              </v-btn>
              <v-btn text color="primary">
                Inscrever-se
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import accelerators from "@/config/database/accelerators";
import academy from "@/config/database/academy";

export default {
  name: "home",
  data: () => ({
    accelerators,
    academy
  })
};
</script>
