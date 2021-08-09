<template lang="pug">
  div
    h1 {{ $t('jumpstats') }}
    div(class="mx-14 pb-4")
    v-row(class="pb-4 mx-2")
      v-spacer
      v-btn(icon :disabled="loading" @click="getJumpstats")
        v-icon mdi-refresh
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        @first="page = 1; getJumpstats()"
        :loading="loading"
        :show-pages="true"
        :show-first="true"
      )
    v-data-table(
      :loading="loading"
      :headers="headers"
      :items="jumpstats"
      :page.sync="page"
      hide-default-footer
      class="elevation-5"
    )
    v-row(class="pt-4 mx-2")
      v-spacer
      v-btn(icon :disabled="loading" @click="getJumpstats")
        v-icon mdi-refresh
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        @first="page = 1; getJumpstats()"
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
        { text: 'Type', value: 'jump_type' },
        { text: 'Strafes', value: 'strafe_count' },
        { text: 'Distance', value: 'distance' },
        { text: 'Crouch Bind', value: 'is_crouch_bind' },
        { text: 'Forward Bind', value: 'is_forward_bind' },
        { text: 'Crouch Boost', value: 'is_crouch_boost' },
        { text: 'Created', value: 'created_on' }
      ],
      jumpstats: [],
      itemsPerPage: 10,
      page: 1
    };
  },
  head () {
    return {
      title: this.$t('jumpstats')
    };
  },
  mounted () {
    this.getJumpstats();
  },
  methods: {
    async getJumpstats () {
      try {
        this.loading = true;
        const params = new URLSearchParams();
        params.set('offset', (this.page - 1) * this.itemsPerPage);
        params.set('limit', this.itemsPerPage);
        const result = await this.$axios.$get(`${API_HOST}/api/v2.0/jumpstats`, { params });
        this.jumpstats = result;
      } catch {
        this.$toast.error('[API] Unable to fetch jumpstats');
      } finally {
        this.loading = false;
      }
    },
    prevPage () {
      this.page--;
      this.getJumpstats();
    },
    nextPage () {
      this.page++;
      this.getJumpstats();
    }
  }
};
</script>
