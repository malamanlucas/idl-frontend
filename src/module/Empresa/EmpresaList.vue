<template>
  <v-data-iterator
    disable-pagination
    hide-default-footer
    :items="empresasFiltered">

    <template #no-results>
      <v-card>
        <v-card-title>no results</v-card-title>
        <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, enim.</v-card-text>
      </v-card>
    </template>

    <template #no-data>
      <v-card class="pa-10" v-if="!hasEmpresas">
        <v-row no-gutters>
          <v-col cols="auto">
            <v-avatar size="80" color="primarysoft2">
              <v-icon large color="primary">mdi-google-circles-extended</v-icon>
            </v-avatar>
          </v-col>
          <v-col offset="1">
            <v-row no-gutters>
              <v-col cols="12" class="font-weight-black primary--text title">
                Não há nenhuma empresa cadastrada
              </v-col>
              <v-col cols="12" class="mb-6 subtitle-2 bluegreylight--text">
                Aqui você pode organizar o cadastro das suas empresas
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" rounded large @click="$emit('on-click-add')">
                  Adicionar minha empresa
                  <v-icon class="ml-8" right large>mdi-plus-circle</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-else class="pa-10">
        <v-card-title>no results</v-card-title>
        <v-card-text>Este filtro não truxe nenhum resultado.</v-card-text>
      </v-card>
    </template>

    <template #default="{ items }">
      <v-card
        class="mb-8 py-10 px-10 rounded-card"
        v-for="empresa in items"
        :key="empresa.id"
        outlined>
        <v-row cols="12" no-gutters align="center">
          <v-col cols="auto" class="ml-4 mr-10">
            <v-avatar
              size="80"
              color="primarysoft2">
              <v-icon large color="primary">mdi-store</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <v-row no-gutters>
              <v-col cols="12">
                <div class='d-block'>
                  <div class="primary--text text-truncate title">
                    {{ empresa.razaoSocial }}
                  </div>
                </div>
              </v-col>
              <v-col cols="12">
                <span class="bluegreylight--text subtitle-1">
                  CNPJ: {{ empresa.cnpj | cnpj }}
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col align="end">
            <EmpresaActions :empresa="empresa"
              @on-click-edit="$emit('on-click-edit', arguments[0])"
              @on-click-funcao="$emit('on-click-funcao', arguments[0])"
              @on-click-setor="$emit('on-click-setor', arguments[0])"
              @on-click-view="$emit('on-click-view', arguments[0])">
              <template #activator="{ on }">
                <v-btn class="text-none" v-on="on" outlined fab color="primary" small>
                  <v-icon>mdi-format-list-bulleted-square</v-icon>
                </v-btn>
              </template>
            </EmpresaActions>
          </v-col>
        </v-row>
      </v-card>
    </template>

  </v-data-iterator>
</template>

<script>
  import { mapGetters } from 'vuex'
  import EmpresaActions from '@/module/Empresa/EmpresaActions'

  export default {
    components: {
      EmpresaActions
    },
    computed: {
      ...mapGetters('empresa', ['empresasFiltered', 'hasEmpresas']),
    }
  }
</script>
