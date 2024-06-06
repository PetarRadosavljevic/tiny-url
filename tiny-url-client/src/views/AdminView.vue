<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="3">
        <v-sheet class="mx-auto pa-4" width="100%" border rounded>
          <v-data-table
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="items"
            :loading="loading"
            item-value="name"
          >
            <template v-slot:bottom>
              <v-row align="center" justify="end" class="px-2">
                <v-col cols="12" sm="6" md="4">
                  <v-select
                    :items="itemsPerPageOptions"
                    v-model="itemsPerPage"
                    dense
                    hide-details
                    variant="outlined"
                    class="ml-2"
                    @update:modelValue="loadData"
                  ></v-select>
                </v-col> </v-row
            ></template>
            <template v-slot:top>
              <h2 class="text-h5 mb-2">Domain visits in last 24 hours</h2></template
            >
          </v-data-table>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ApiService from '@/services/ApiService'

export default defineComponent({
  data: () => ({
    headers:[
      {
        title: 'Domain name',
        align: 'start',
        sortable: false,
        key: 'name'
      },
      { title: 'Count', key: 'count', align: 'end', sortable: false }
    ] as const,
    items: [],
    loading: true,
    itemsPerPage: 10,
    itemsPerPageOptions: [5, 10, 15, 20]
  }),
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      this.loading = true
      const { data } = await ApiService.getDomainViewData(this.itemsPerPage)
      this.items = data
      this.loading = false
    }
  }
})
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
