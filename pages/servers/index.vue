<template lang="pug">
  div
    h1 {{ $t('servers') }}
    v-row(class="pb-4 mx-2")
      v-spacer
      v-btn(icon :disabled="loading" @click="getServers")
        v-icon mdi-refresh
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        @first="page = 1"
        @last="page = pageMax"
        :loading="loading"
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
      template(v-slot:item.actions="{ item }")
        v-btn(text color="blue" :href="`steam://connect/${item.ip}:${item.port}`") {{ $t('connect') }}
    v-row(class="pt-4 mx-2")
      v-spacer
      v-btn(icon :disabled="loading" @click="getServers")
        v-icon mdi-refresh
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        @first="page = 1"
        @last="page = pageMax"
        :loading="loading"
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
        { text: 'Owner', value: 'owner' },
        { text: '', value: 'actions' }
      ],
      servers: [],
      itemsPerPage: 10,
      page: 1,
      pageMax: 1
    };
  },
  head () {
    return {
      title: this.$t('servers')
    };
  },
  mounted () {
    this.getServers();
  },
  methods: {
    async getServers () {
      try {
        this.loading = true;
        this.servers = await this.$axios.$get(`${API_HOST}/api/v2.0/servers?is_validated=true`);
        this.pageMax = Math.ceil(this.servers.length / this.itemsPerPage);
      } catch {
        this.$toast.error('[API] Unable to fetch servers');
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
