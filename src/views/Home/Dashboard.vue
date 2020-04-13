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

      <!-- >
      <v-row
        class="mb-6 mt-9"
        no-gutters
      >
        <v-col
          sm="5"
          md="12"
          max-height="100px"
        >
          <v-card
            class="ma-4 pa-7 radius"
            color="primary"
            outlined
            tile
          >
            <v-row
              class="mb-2 mt-2"
              no-gutters>
                <v-col
                  sm="5"
                  md="6"
                  max-height="100px"
                >

                cc
                </v-col>

                <v-col
                  sm="5"
                  md="6"
                  max-height="100px"
                >

                cc
                </v-col>
            </v-row>

          </v-card>
        </v-col>
      </v-row>
      < -- -->

      <v-row
        class="mb-2 mt-2"
        no-gutters
      >
        <v-col
          sm="5"
          md="8"
          class="mb-2 mt-2"
          max-height="100px"
        >
          <v-card
            class="ma-4 pa-7 radius"
            outlined
            tile
          >
            <v-card-title>
              <h2
                class="d-flex justify-left subtitle-1 grey--text"> Gráfico de faturamento dos últimos 5 meses</h2>
            </v-card-title>

            <v-divider class="my-8"></v-divider>

            <v-card-text>
              <line-chart
              :chart-data="datacollection"
              :options="options" height="200"></line-chart>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col
          sm="5"
          md="4"
          max-height="100px"
        >
          <v-card
            class="ma-4 pa-4 radius"
            outlined
            tile
          >
            <v-card-text>
               <div class="body-1 font-weight-thin">Gráfico de faturamento dos últimos 5 meses</div>
            </v-card-text>
          </v-card>
          <v-card
            class="ma-4 pa-7 radius"
            outlined
            tile
          >
            <v-list>
              <h2
                class="d-flex justify-left subtitle-1 grey--text"> Últimos movimentos </h2>
                <v-divider class="my-4"></v-divider>
              <v-list-item
                v-for="item in items"
                :key="item.title"
              >
                <v-list-item-icon>
                  <v-icon v-if="item.icon" color="primary">mdi-check-circle</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-avatar>
                  <v-img :src="item.avatar"></v-img>
                </v-list-item-avatar>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
// Gráfico utilizado ( https://github.com/apertureless/vue-chartjs ) - https://www.chartjs.org/docs/latest/charts/line.html
import LineChart from '@/core/utils/lineChart.js'

export default {
  data: () => ({
    datacollection: null,
    kpi: [
        {
          color: 'primary',
          icon: 'mdi-domain',
          number: '106',
          title: 'Empresas',
          msg: '-',
        },
        {
          color: 'optionprimary',
          icon: 'mdi-account-multiple',
          number: '7.200',
          title: 'Vidas',
          msg: '-',
        },
        {
          color: 'warning',
          icon: 'mdi-cash-multiple',
          number: '55',
          title: 'Exames realizados',
          msg: '-',
        },
        {
          color: 'error',
          icon: 'mdi-cash-multiple',
          number: '35',
          title: 'Exames atrasados',
          msg: '-',
        },
      ],
      items: [
        { icon: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
        { icon: true, title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        { icon: true, title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        { icon: true, title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
      ],
      options: {
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 10,
            },
            gridLines: {
              display: null,
              offsetGridLines: false
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 10,
              suggestedMin: 50,
              suggestedMax: 50,
            },
            gridLines: {
              display: null,
              offsetGridLines: false
            }
          }]
        }
      }
  }),
  components: {
    LineChart
  },
  mounted() {
    this.fillData()
    this.renderChart(this.options)
  },
  methods: {
    fillData() {
      this.datacollection = {
        labels: [
          'Jan',
          'Fev',
          'Mar',
          'abr',
          'mar'
        ],
        datasets: [
          {
            // 0c0f4d. 3a6af2
            label: 'Admissão',
            borderWidth: 3,
            borderColor: 'rgb(0,107,242,0.9)',
            backgroundColor: 'rgb(0,107,242,0.2)',
            data: [
              20,
              30,
              44,
              34,
              38
            ]
          },
          {
            // 0c0f4d. 3a6af2
            label: 'Demissão',
            borderWidth: 3,
            borderColor: 'rgb(20,142,164,0.9)',
            backgroundColor: 'rgb(20,142,164,0.2)',
            data: [
              20,
              44,
              28,
              40,
              38
            ]
          }
        ]
      }
    },
  }
}
</script>

<style lang="scss">
  .card-stats {
    border-radius: 4px; border: solid 1px #e3e3e3 !important;
  }
  .icon-shap {
    margin:0 1.4em 0 0; padding:1em; background: #F6F7FA; float:left; border-radius: 50%;
  }
  .icon-shap i {
    font-size:2em !important; opacity: 0.9; float:left;
  }
  .radius {
    border-radius: 4px;
  }
</style>
