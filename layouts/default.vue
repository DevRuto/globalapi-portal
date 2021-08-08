<template lang="pug">
  v-app(dark)
    v-navigation-drawer(
      v-model="drawer"
      :clipped="true"
      fixed
      app
    )
      template(v-slot:prepend)
        v-list-item(two-line link)
          v-list-item-avatar(color="red")
            v-img(v-if="avatar")
            span(v-else) {{ name[0] }}
          v-list-item-content
            v-list-item-title(class="text-h6") {{ name }}
            v-list-item-subtitle Global Admin
      v-divider

      v-divider
      v-list(dense nav)
        template(v-for="(item, i) in navItems")
          v-list-item(
            :key="i",
            :to="item.to"
            router
            exact
          )
            v-list-item-action
              v-icon {{ item.icon }}
            v-list-item-content
              v-list-item-title(v-text="item.title")

    v-app-bar(
      fixed
      app
      :clipped-left="true"
    )
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title(v-text="title")
      v-spacer

    v-main(class="mb-1")
      v-breadcrumbs(
        class="capitalize grey darken-4"
        divider=">"
        :items="breadcrumbs"
      )
      v-container
        nuxt

    v-footer(
      app
      :fixed="false"
    )
      span GlobalAPI &copy; {{ currentYear }}
      v-spacer
      span
        | Powered by&nbsp;
        a(href="https://nuxtjs.org/") Nuxt.JS
        | &nbsp;and&nbsp;
        a(href="https://vuetifyjs.com/") Vuetify
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      title: 'GlobalAPI',
      dark: true,
      breadcrumbs: [],
      name: 'Ruto',
      avatar: false
    };
  },
  computed: {
    currentYear () {
      return new Date().getUTCFullYear();
    },
    navItems () {
      return [
        {
          icon: 'mdi-home',
          title: this.$t('overview'),
          to: '/'
        },
        {
          icon: 'mdi-map',
          title: this.$t('maps'),
          to: '/maps'
        },
        {
          icon: 'mdi-tune',
          title: this.$t('modes'),
          to: '/modes'
        },
        {
          icon: 'mdi-hammer',
          title: this.$t('bans'),
          to: '/bans'
        },
        {
          icon: 'mdi-server',
          title: this.$t('servers'),
          to: '/servers'
        },
        {
          icon: 'mdi-timer',
          title: this.$t('records'),
          to: '/records'
        },
        {
          icon: 'mdi-chart-timeline-variant',
          title: this.$t('jumpstats'),
          to: '/jumpstats'
        }
      ];
    }
  },
  watch: {
    $route (_newVal) {
      this.setBreadcrumbs();
    }
  },
  mounted () {
    this.setBreadcrumbs();
  },
  methods: {
    setBreadcrumbs () {
      this.breadcrumbs = this.$nuxt.$route.path
        .split('/')
        .filter(v => v)
        .map((routeName, i, arr) => ({
          text: routeName,
          disabled: arr.length - 1 === i,
          exact: true,
          to: `/${arr.slice(0, i + 1).join('/')}`
        }));
      if (this.breadcrumbs.length === 0) {
        this.breadcrumbs = [{
          text: 'Overview',
          disabled: true
        }];
      }
      this.breadcrumbs = [
        { text: 'Dashboard', disabled: true },
        ...this.breadcrumbs
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
