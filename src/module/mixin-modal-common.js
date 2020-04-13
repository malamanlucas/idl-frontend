export default {
  data: () => ({
    isDialogOpen: false
  }),
  watch: {
    async value(value) {
      if (value === true) {
        await this.$nextTick()
        this.isDialogOpen = true
      } else {
        this.isDialogOpen = false
      }
    }
  }
}
