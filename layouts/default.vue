<template>
  <v-app class="ham">
    <HHeader />

    <v-main>
      <Nuxt />
    </v-main>

    <HMenuModal v-if="miModalIsShowState('hMenuModal')"></HMenuModal>
    <HRecipeModal v-if="miModalIsShowState('hRecipeModal')"></HRecipeModal>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Ham-Cook"
    };
  },
  created() {
    this.MiUpdateRecipes();
    this.MiUpdateMenus();
  }
};
</script>

<style lang="sass" scoped></style>
