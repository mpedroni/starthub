<template>
  <v-row>
    <v-col cols="12">
      <v-col cols="12">
        <v-subheader class="text-h2 font-weight-normal">
          {{ name || "Novo Projeto" }}
        </v-subheader>
      </v-col>
      <v-form>
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-text-field v-model="name" label="Nome" outlined />
          </v-col>
          <v-col cols="12" class="py-0">
            <v-textarea v-model="abstract" label="Resumo" rows="3" outlined />
          </v-col>
          <v-col cols="12" class="py-0">
            <v-textarea
              v-model="description"
              label="Descrição Detalhada"
              outlined
            />
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="city" label="Cidade" outlined />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="state" label="Estado" outlined />
          </v-col>

          <v-col cols="12">
            <v-combobox
              v-model="tags"
              hide-selected
              label="Tags"
              multiple
              outlined
              persistent-hint
              small-chips
            />
          </v-col>

          <v-col cols="12">
            <v-combobox
              v-model="needings"
              hide-selected
              label="Skills Necessárias"
              multiple
              outlined
              persistent-hint
              small-chips
            />
          </v-col>

          <v-col cols="12">
            <v-combobox
              v-model="authors"
              hide-selected
              label="Autores do projeto"
              multiple
              outlined
              persistent-hint
              small-chips
            />
          </v-col>

          <v-col cols="12" class="text-end">
            <v-btn depressed color="primary">
              <v-icon left>
                mdi-content-save
              </v-icon>
              Salvar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "new-project",
  data: () => ({
    name: null,
    abstract: null,
    description: null,
    city: null,
    state: null,
    needings: [],
    tags: [],
    authors: []
  })
};
</script>
