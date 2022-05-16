<template>
  <v-card tile class="h-header">
    <div class="h-header-title"></div>
    <v-tabs fixed-tabs :color="$hColor.subPink" icons-and-text>
      <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.to">
        {{ tab.name }}
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tabs: [
      {
        name: "献立管理",
        icon: "mdi-chef-hat",
        to: "/"
      },
      {
        name: "レシピ管理",
        icon: "mdi-silverware",
        to: "/recipes"
      },
      {
        name: "設定",
        icon: "mdi-cog-outline",
        to: "/settings"
      }
    ]
  })
};
</script>

<style scoped lang="scss">
.h-header {
  // position: fixed;
  // padding:0;
  width: 100%;
  z-index: 2;
  &-title {
    height: v(20);
    background: $main-pink;
    color: white;
    font-size: v(24);
    // padding-left: v(30);
    font-weight: bold;
    line-height: v(80);
  }
}
</style>
