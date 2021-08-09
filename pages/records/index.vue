<template lang="pug">
  div
    h1 {{ $t('records') }}
    div(class="mx-14 pb-4")
    v-row(class="pb-4 mx-2")
      v-spacer
      v-btn(icon :disabled="loading" @click="getRecords")
        v-icon mdi-refresh
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        @first="page = 1; getRecords()"
        :loading="loading"
        :show-pages="true"
        :show-first="true"
      )
    v-data-table(
      :loading="loading"
      :headers="headers"
      :items="records"
      :page.sync="page"
      hide-default-footer
      class="elevation-5"
    )
    v-row(class="pt-4 mx-2")
      v-spacer
      v-btn(icon :disabled="loading" @click="getRecords")
        v-icon mdi-refresh
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        @first="page = 1; getRecords()"
        :loading="loading"
        :show-pages="true"
        :show-first="true"
      )
</template>

<script>
import Pagination from '~/components/Pagination.vue';
import { API_HOST } from '~/app.config';

export default {
  components: {
    Pagination
  },
  data () {
    return {
      loading: true,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Player', value: 'player_name' },
        { text: 'Map', value: 'map_name' },
        { text: 'Mode', value: 'mode' },
        { text: 'Stage', value: 'stage' },
        { text: 'Time', value: 'time' },
        { text: 'Teleports', value: 'teleports' },
        { text: 'Created', value: 'created_on' }
      ],
      records: [],
      itemsPerPage: 10,
      page: 1
    };
  },
  head () {
    return {
      title: this.$t('records')
    };
  },
  mounted () {
    this.getRecords();
  },
  methods: {
    async getRecords () {
      try {
        this.loading = true;
        const params = new URLSearchParams();
        params.set('offset', (this.page - 1) * this.itemsPerPage);
        params.set('limit', this.itemsPerPage);
        const result = await this.$axios.$get(`${API_HOST}/api/v2.0/records/top`, { params });
        this.records = result;
      } catch {
        this.$toast.error('[API] Unable to fetch records');
      } finally {
        this.loading = false;
      }
    },
    prevPage () {
      this.page--;
      this.getRecords();
    },
    nextPage () {
      this.page++;
      this.getRecords();
    }
  }
};
</script>
