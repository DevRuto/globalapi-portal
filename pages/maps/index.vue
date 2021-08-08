<template lang="pug">
  div
    h1 Maps
    div(class="mx-14 pb-4")
    v-row(class="pb-4 mx-2")
      v-spacer
      v-btn(icon :disabled="loading" @click="getMaps")
        v-icon mdi-refresh
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        @first="page = 1"
        @last="page = pageMax"
        :max-page="pageMax"
        :show-pages="true"
        :show-max="true"
        :show-first="true"
        :show-last="true"
      )
    v-data-table(
      :loading="loading"
      :headers="headers"
      :items="maps"
      :page.sync="page"
      hide-default-footer
      class="elevation-5"
    )
    v-row(class="pt-4 mx-2")
      v-spacer
      v-btn(icon :disabled="loading" @click="getMaps")
        v-icon mdi-refresh
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        @first="page = 1"
        @last="page = pageMax"
        :max-page="pageMax"
        :show-pages="true"
        :show-max="true"
        :show-first="true"
        :show-last="true"
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
        { text: 'Name', value: 'name' },
        { text: 'Filesize', value: 'filesize' },
        { text: 'Difficulty', value: 'difficulty' },
        { text: 'Validated', value: 'validated' }
      ],
      maps: [],
      itemsPerPage: 10,
      page: 1,
      pageMax: 1
    };
  },
  head () {
    return {
      title: 'Maps'
    };
  },
  mounted () {
    this.getMaps();
  },
  methods: {
    async getMaps () {
      try {
        this.loading = true;
        const params = new URLSearchParams();
        params.set('limit', 9999);
        const result = await this.$axios.$get(`${API_HOST}/api/v2.0/maps`, { params });
        this.maps = result;
        this.pageMax = Math.ceil(this.maps.length / this.itemsPerPage);
      } catch {
        this.$toast.error('[API] Unable to fetch maps');
      } finally {
        this.loading = false;
      }
    },
    prevPage () {
      this.page--;
    },
    nextPage () {
      this.page++;
    }
  }
};
</script>
