<template lang="pug">
  v-app(dark)
    v-navigation-drawer(
      v-model="drawer"
      :clipped="true"
      fixed
      app
    )
      v-list-item
        v-list-item-content
          v-list-item-title(class="title") {{ $t('dashboard') }}
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

    v-main
      v-container
        v-breadcrumbs(
          class="capitalize"
          divider=">"
          :items="breadcrumbs"
        )
        v-divider
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
      breadcrumbs: []
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
          title: this.$t('home'),
          to: '/'
        },
        {
          icon: 'mdi-map',
          title: this.$t('maps'),
          to: '/maps'
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
      console.log(this.$nuxt.$route.path);
      this.breadcrumbs = this.$nuxt.$route.path
        .split('/')
        .filter(v => v)
        .map((routeName, i, arr) => ({
          text: routeName,
          disabled: arr.length - 1 === i,
          exact: true,
          to: `/${arr.slice(0, i + 1).join('/')}`
        }));
    }
  }
};
</script>

<style lang="scss" scoped>
.capitalize {
  text-transform: capitalize;
}
</style>
