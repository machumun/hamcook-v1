<template>
  <div :style="{ backgroundColor: backgroundColor }" class="h-btn">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    backgroundColor: {
      default: "#fff",
      type: String
    }
  }
};
</script>

<style lang="scss">
.h-btn {
  height: v(30);
  width: v(100);
}
</style>
