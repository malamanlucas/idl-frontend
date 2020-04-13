<template>
  <v-data-iterator
    :single-expand="false"
    show-expand
    :expanded.sync="expanded"
    disable-pagination
    hide-default-footer
    :items="corporacoesFiltered">

    <template #no-data>
      <v-card class="pa-10" v-if="!hasCorporacoes">
        <v-row no-gutters>
          <v-col cols="auto">
            <v-avatar size="80" color="primarysoft2">
              <v-icon large color="primary">mdi-google-circles-extended</v-icon>
            </v-avatar>
          </v-col>
          <v-col offset="1">
            <v-row no-gutters>
              <v-col cols="12" class="font-weight-black primary--text title">
                Você pode organizar suas empresas por grupos
              </v-col>
              <v-col cols="12" class="mb-6 subtitle-2 bluegreylight--text">
                Aqui você pode organizar suas empresas por grupos, atribuir
              </v-col>
              <v-col cols="12">
                <v-btn color="primary" rounded large @click="$emit('on-click-create-group')">
                  Adicionar meu primeiro grupo
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

    <template #default="{ items, isExpanded, expand }">

      <v-card
        class="mb-8 py-10 px-10 rounded-card"
        v-for="corporacao in items"
        :key="corporacao.id"
        outlined>
        <v-row cols="12" no-gutters align="center">
          <v-col cols="auto" class="ml-4 mr-10">
            <v-avatar size="80" color="primarysoft2" @click="doExpand(expand, corporacao)">
              <v-icon large color="primary">mdi-google-circles-extended</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="auto">
            <v-row no-gutters>
              <v-col cols="auto">
                <v-row no-gutters >
                  <v-col>
                    <div class='d-block'>
                      <div class="primary--text text-truncate title">
                        {{ corporacao.nome }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>{{ corporacao.qtdEmpresas }} empresa(s) neste grupo</v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="auto" class="ml-2">
            <v-btn text class="text-none" @click="$emit('on-click-edit', corporacao)">
              <v-icon>mdi-pencil</v-icon>
              Editar
            </v-btn>
          </v-col>
          <v-col align="end">
            <v-btn class="text-none"  outlined fab color="primary" small @click="doExpand(expand, corporacao)">
              <v-icon v-show="isExpanded(corporacao)">mdi-chevron-up-circle</v-icon>
              <v-icon v-show="!isExpanded(corporacao)">mdi-chevron-down-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-lazy v-if="isExpanded(corporacao)" :min-height="200" transition="fade-transition" :options="{ threshold: .5 }">
          <EmpresaInnerList
            @on-click-edit="$emit('on-click-edit-empresa', arguments[0])"
            @on-click-funcao="$emit('on-click-edit-funcao', arguments[0])"
            @on-click-setor="$emit('on-click-edit-setor', arguments[0])"
            :empresas="corporacao.empresas" @on-click-add-in-group="createInGroup(corporacao.id)" />
        </v-lazy>
      </v-card>
    </template>

  </v-data-iterator>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { isNil } from 'lodash'
  import EmpresaInnerList from '@/module/Corporacao/EmpresaInnerList'
  import { SET_CORPORACAO_ID_IN_EMPRESA } from '@/store/modules/empresa'


  export default {
    data: () => ({
      expanded: []
    }),
    components: {
      EmpresaInnerList
    },
    computed: {
      ...mapGetters('empresa', ['corporacoesFiltered', 'hasCorporacoes'])
    },
    methods: {
      ...mapMutations('empresa', {
        setCorporacaoIdInEmpresaToCreate: SET_CORPORACAO_ID_IN_EMPRESA
      }),
      doExpand(expandFunction, corporacao) {
        if (isNil(corporacao.isExpanded)) {
          corporacao.isExpanded = false
        }
        corporacao.isExpanded = !corporacao.isExpanded
        expandFunction(corporacao, corporacao.isExpanded)
      },
      createInGroup(corporacaoId) {
        this.setCorporacaoIdInEmpresaToCreate(corporacaoId)
        this.$emit('on-call-add-in-group')
      }
    }
  }
</script>
