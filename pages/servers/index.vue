<template lang="pug">
  div
    h1 Servers
    v-row(class="pb-4 mx-2")
      v-spacer
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
      :items="servers"
      :page.sync="page"
      hide-default-footer
      class="elevation-5"
    )
      template(v-slot:item.endpoint="{ item }")
        span {{ item.ip }}:{{ item.port }}
      template(v-slot:item.owner="{ item }")
        v-btn(text target="_blank" color="green" :href="`http://steamcommunity.com/profiles/${item.owner_steamid64}`")
          v-icon(left) mdi-steam
          | {{ item.owner_steamid64 }}
          v-icon(right) mdi-open-in-new
    v-row(class="pt-4 mx-2")
      v-spacer
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
      loading: false,
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Address', value: 'endpoint' },
        { text: 'Name', value: 'name' },
        { text: 'Owner', value: 'owner' }
      ],
      servers: [],
      itemsPerPage: 10,
      page: 1,
      pageMax: 1
    };
  },
  mounted () {
    this.getServers();
  },
  methods: {
    async getServers () {
      this.loading = true;
      this.servers = await this.$axios.$get(`${API_HOST}/api/v2.0/servers?is_validated=true`);
      this.pageMax = Math.ceil(this.servers.length / this.itemsPerPage);
      this.loading = false;
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
