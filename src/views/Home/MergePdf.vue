<template>
  <v-row no-gutters>
    <v-col cols="12" class="mb-3">
      <v-btn ripple color="error" link :to="{ name: 'welcome' }">
        <v-icon left large>mdi-arrow-left-bold</v-icon>
        <div>
          Voltar
        </div>
      </v-btn>
    </v-col>
    <v-col>
      <v-file-input
        small-chips show-size
        multiple
        @change="selectFiles"
        label="File input w/ small chips"
      ></v-file-input>
      <v-text-field v-model="destinationName" label="Nome do download do arquivo"></v-text-field>
      <v-btn @click="merge" :disabled="!hasFiles">Upload</v-btn>
    </v-col>
  </v-row>
</template>

<script>
  import mergePdf from '@/services/mergePdf'

  export default {
    data: () => ({
      files: [],
      destinationName: null
    }),
    computed: {
      hasFiles() {
        return this.files.length > 0
      }
    },
    methods: {
      selectFiles(files) {
        this.files = files
      },
      clearFiles() {
        this.files.splice(0)
        this.destinationName = null
      },
      async merge() {
        try {
          this.showLoading()
          const response = await mergePdf.process(this.files, this.destinationName)
          this.forceFileDownload(response)
          this.clearFiles()
        } catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      },
      forceFileDownload(response) {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'file.pdf')
        document.body.appendChild(link)
        link.click()
      }
    }
  }
</script>
