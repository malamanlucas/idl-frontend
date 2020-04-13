<template>
  <v-layout align-center justify-center>
    <v-container>
      <!---->
      <v-row no-gutters class="mb-9">
        <v-col
          v-for="(kpis, n) in kpi"
          :key="n"
          cols="sm"
        >
          <v-card
            max-height="250px"
            outlined
            tile
            class="pa-2 ma-4 card-stats"
          >
            <div style="margin:1em;">
              <div class="d-flex justify-center icon-shap">
                <v-icon
                  large
                  :color="kpis.color"
                  style=""
                  v-text="kpis.icon">
                </v-icon>
              </div>
              <div>
                <h2
                class="d-flex justify-left body-4 grey--text" v-text="kpis.number"></h2>
                <span
                  class="body-2 d-flex justify-left grey--text"
                  style="opacity: 0.5;"
                  v-text="kpis.title"
                ></span>

                <v-divider class="my-5"></v-divider>

                <v-chip
                  class="ma-1"
                  v-if="kpis.color"
                  :color="kpis.color"
                  text-color="white"
                >
                  <v-avatar left>
                    <v-icon>mdi-account-circle</v-icon>
                  </v-avatar>
                  Ranee
                </v-chip>

              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <!---->

      <v-row
        class="mb-6 mt-9"
        no-gutters
      >
        <v-col
          sm="5"
          md="6"
          max-height="100px"
        >
          <v-card
            class="ma-4 pa-7"
            outlined
            tile
          >
            <v-card-text>
              <v-sheet color="success pb-4 pr-7">
                <v-sparkline
                  :value="value"
                  :smooth="radius || false"
                  :labels="labels"
                  type="bars"
                  color="#fff"
                  line-width="14"
                  height="100"
                  padding="24"
                >
                  <template v-slot:label="item">
                    R${{ item.value }}
                  </template>
                </v-sparkline>
                </v-sheet>
              </v-card-text>
            <v-card-text>
              <div class="body-1 font-weight-thin">Gráfico de faturamento dos últimos 5 meses</div>
            </v-card-text>
          </v-card>
          <v-card
            class="ma-4 pa-7"
            outlined
            tile
          >
              <!-- -->
              <v-alert
                    text
                    color="info"
                    outlined
                  >
                    <h3 class="headline">Report Agosto</h3>
                    <div>
                      On-page com dados e KPI's do bussiness
                    </div>

                    <v-divider
                      class="my-4 info"
                      style="opacity: 0.22"
                    ></v-divider>

                    <v-row
                      align="center"
                      no-gutters
                    >
                      <v-col class="grow">Realize o download aqui *Senha para acesso a planilha ( acessolimer )</v-col>
                      <div class="flex-grow-1"></div>
                      <v-col class="shrink">
                        <v-btn class="text-none"
                          color="info"
                          outlined
                          link
                          href="https://www.dropbox.com/s/7uqv3zbvt6fe5mx/Carteira%20de%20Clientes.xlsx?dl=0"
                        >
                          Planilha Dados comerciais
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-alert>
              <!-- -->

          </v-card>
        </v-col>
        <v-col
          sm="5"
          offset-sm="2"
          md="6"
          offset-md="0"
        >
          <v-card
            class="ma-4 pa-7"
            outlined
            tile
          >
            <!-- -->
              <v-card-text class="headline subtitle-2 ">Roadmap</v-card-text>
                <v-alert
                  icon="mdi-shield-lock-outline"
                  prominent
                  text
                  type="info"
                >
                  Roadmap simplificado das etapas já concluidas bem como progamação das próximas entregas.
                </v-alert>
              <!-- -->
              <v-timeline
                align-top
                dense
                >
                  <v-timeline-item
                    v-for="(year, i) in years"
                    :key="i"
                    :color="year.color"
                    small
                  >
                    <v-row class="pt-0">
                      <!--v-col-- cols="1"></!--v-col-->
                      <v-col>
                        <span
                            :class="`subtitle-2 headline font-weight-bold ${year.color}--text mr-1`"
                            v-text="year.year"
                          ></span> <i><span v-text="year.title" style="color:#c7c7c7;"> </span></i>
                          <h2 :class="`headline font-weight-light subtitle-2 mb-4 grey--text`" v-text="year.text"></h2>
                      </v-col>
                    </v-row>
                </v-timeline-item>
              </v-timeline>
            <!-- -->
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          sm="6"
          md="5"
          lg="6"
        >

        </v-col>
        <v-col
          sm="6"
          md="5"
          offset-md="2"
          lg="6"
          offset-lg="0"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            .col-sm-6 .col-md-5 .offset-md-2 .col-lg-6 .offset-lg-0
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      kpi: [
        {
          color: 'primary',
          icon: 'mdi-domain',
          number: '106',
          title: 'Empresas na modalidade recorrente',
          msg: '-',
        },
        {
          color: 'primary',
          icon: 'mdi-account-multiple',
          number: '7.200',
          title: 'Número de vidas',
          msg: '-',
        },
        {
          color: 'success',
          icon: 'mdi-cash-multiple',
          number: 'R$ 7,90',
          title: 'Ticket médio por vida',
          msg: '-',
        },
      ],
      years: [
        {
          color: 'primary',
          year: '08/2016',
          title: 'Operation',
          text: 'Inicio da operação dos Planos - MRR',
        },
        {
          color: 'primary',
          year: '06/2017',
          title: 'Billing',
          text: 'Investimento anjo ( 200 k )',
        },
        {
          color: 'primary',
          year: '09/2017',
          title: 'IT',
          text: 'Início do desenvolvimento do MVP - Aso Plus',
        },
        {
          color: 'primary',
          year: '04/2018',
          title: 'IT',
          text: 'Lançamento MVP',
        },
        {
          color: 'primary',
          year: '06/2019',
          title: 'Billing',
          text: 'Captação GV Angels',
        },
        {
          color: 'orange',
          year: '07/2019',
          title: 'IT',
          text: 'Plataforma Beta 1',
        },
        {
          color: 'orange',
          year: '07/2019',
          title: 'IT',
          text: 'Plataforma Beta 1',
        },
        {
          color: 'orange',
          year: '07/2019',
          title: 'Commercial',
          text: 'Start Sales track',
        },
        {
          color: 'orange',
          year: '07/2019',
          title: '',
          text: 'Plataforma Beta 1',
        },
        {
          color: 'orange',
          year: '07/2019',
          title: '',
          text: 'Plataforma Beta 1',
        }

      ],
       value: [
        49368,
        75000,
        45000,
        57000,
        52000,
      ],
      // labels: [
      //  '1',
      //  '2',
      // ],
    }),
  }
</script>
