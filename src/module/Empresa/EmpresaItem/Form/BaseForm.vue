<template>
  <v-dialog retain-focus  :value="value" @input="$emit('input', arguments[0])" max-width="900"
    @keydown.esc="cancelEdit"
    persistent no-click-animation internal-activator
    >

    <v-card v-if="isDialogOpen">
      <v-container pa-0 pb-10>

        <v-layout column mb-10 pa-5>
          <v-flex max-height="200">
            <close-icon class="float-right" @on-click="cancelEdit" />
            <v-layout column ma-0 pa-0>
              <div class="headline">
                <slot name="title">
                  Adicionar
                </slot>
                <span class="font-weight-bold"> {{ title }} </span>
              </div>
              <div class="subtitle-1">Empresa: {{ getActualRazaoSocial }}</div>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout column px-5>
          <v-flex>
            <v-text-field @keydown.enter="saveWrapper" autofocus
              :error="$v.model.name.$dirty && $v.model.name.$invalid" @blur="$v.model.name.$touch()"
              v-model="model.name" :label="`Adicionar ${title}`" outlined></v-text-field>
          </v-flex>
          <v-flex v-if="isFormActive"> <!-- force create these components every time when modal opened -->
            <v-layout row pa-0 ma-0>
              <v-flex xs6 pr-1>
                <riscos-adder :model="model" />
              </v-flex>
              <v-flex xs6 pl-1>
                <exames-adder :model="model" />
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex>
            <v-layout row align-center justify-center mt-5>
              <v-flex shrink mr-5>
                <v-btn class="text-none"  color="warning" @click="cancelEdit">Cancelar</v-btn>
              </v-flex>
              <v-flex shrink>
                <v-btn class="text-none"  color="primary" @click="saveWrapper">
                  <slot name="labelButtonSuccess">
                    Cadastrar
                  </slot>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators/'
  import ExamesAdder from '@/module/Empresa/EmpresaItem/Form/ExamesAdder'
  import RiscosAdder from '@/module/Empresa/EmpresaItem/Form/RiscosAdder'
  import empresaItemMixin from '@/module/Empresa/EmpresaItem/empresa-item-mixin'
  import mixinModalCommon from '@/module/mixin-modal-common'

  export default {
    props: ['value', 'model'],
    mixins: [validationMixin, empresaItemMixin, mixinModalCommon],
    components: {
      RiscosAdder,
      ExamesAdder
    },
    validations: {
      model: {
        name: {
          required
        }
      }
    },
    computed: {
      ...mapGetters('empresa', ['empresa', 'getActualRazaoSocial', 'getActualId']),
      isFormActive() {
        return this.value
      }
    },
    methods: {
      active() {
        this.$emit('input', true)
      },
      deactive() {
        this.$emit('input', false)
        this.$emit('on-cancel')
      },
      cancelEdit() {
        this.deactive()
      },
      async saveWrapper() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.showErrorOnSnackbar('Há erros no formulário')
          return;
        }
        let success = true
        try {
          this.showLoading()
          await this.$store.dispatch(`${this.module}/save`, { idEmpresa: this.getActualId, model: this.model })
        } catch (e) {
          success = false
          this.showErrorOnSnackbar(e)
        } finally {
          this.hideLoading()
          success && this.$emit('on-save')
        }
      }
    },
    mounted() {
      this.$v.$touch()
    }
  }
</script>
