<template lang="pug">
  div
    h1 Maps
    div(class="mx-14 pb-4")
    v-row(class="pb-4 mx-2")
      v-spacer
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        :max-page="pageMax"
        :show-pages="true"
        :show-max="true"
      )
    v-data-table(
      :options.sync="options"
      :loading="loading"
      :headers="headers"
      :items="maps"
      :page.sync="page"
      hide-default-footer
      class="elevation-4"
    )
    v-row(class="pt-4 mx-2")
      v-spacer
      pagination(
        v-model="page"
        @prev="prevPage"
        @next="nextPage"
        :max-page="pageMax"
        :show-pages="true"
        :show-max="true"
      )
</template>

<script>
import Pagination from '~/components/Pagination.vue';
export default {
  components: {
    Pagination
  },
  data () {
    return {
      loading: true,
      options: {},
      headers: [
        {
          text: 'ID',
          value: 'id'
        },
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
      this.loading = true;
      const params = new URLSearchParams();
      params.set('limit', 9999);
      const result = await this.$axios.$get('https://kztimerglobal.com/api/v2.0/maps', { params });
      this.maps = result;
      this.pageMax = Math.ceil(this.maps.length / this.itemsPerPage);
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
