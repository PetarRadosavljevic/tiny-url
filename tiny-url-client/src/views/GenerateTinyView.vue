<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" md="6" lg="3">
        <v-sheet class="mx-auto pa-4" width="100%" border rounded>
          <h2 class="text-h4 font-weight-black mb-2">TinyURL</h2>
          <h4 class="mb-4">Shorten your long urls!</h4>
          <v-form @submit.prevent>
            <v-text-field
              v-model="url"
              :rules="rules"
              :error-messages="errorMessage"
              variant="outlined"
              label="Enter long link here"
            ></v-text-field>
            <v-text-field
              v-model="tinyUrl"
              v-if="tinyUrl"
              readonly
              append-inner-icon="mdi-content-copy"
              variant="outlined"
              label="TinyUrl"
              @click:append-inner="copyUrl"
            ></v-text-field>
            <v-btn
              class="mt-2"
              type="submit"
              variant="flat"
              color="blue"
              :loading="loading"
              @click="createTinyUrl"
              block
              >Shorten URL</v-btn
            >
          </v-form>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ApiService from '@/services/ApiService'

export default {
  data: () => ({
    url: '',
    tinyUrl: '',
    loading: false,
    errorMessage: '',
    rules: [
      (value: string) => {
        try {
          new URL(value)
          return true
        } catch (_) {
          return 'You must enter a valid url.'
        }
      }
    ]
  }),
  methods: {
    async createTinyUrl() {
      this.tinyUrl = ''
      this.errorMessage = ''
      this.loading = !this.loading
      const { tinyUrl, errorMessage } = await ApiService.createTinyUrl(this.url)
      this.loading = false
      if (tinyUrl) {
        this.tinyUrl = tinyUrl
      }
      if (errorMessage) {
        this.errorMessage = errorMessage
      }
    },
    copyUrl() {
      navigator.clipboard.writeText(this.tinyUrl)
    }
  }
}
</script>
