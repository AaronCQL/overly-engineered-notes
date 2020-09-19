<template>
  <transition name="fade">
    <div
      v-show="isLoading"
      class="fixed top-0 left-0 right-0 bottom-0 z-10 w-screen h-screen flex flex-col items-center justify-center bg-black bg-opacity-75"
    >
      <span
        class="mb-2 text-teal-300 text-xl uppercase font-bold opacity-75 tracking-widest"
      >
        Loading
      </span>
      <LoadingOverlaySpinner />
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";

import LoadingOverlaySpinner from "./LoadingOverlaySpinner.vue";

export default defineComponent({
  name: "LoadingOverlay",
  components: {
    LoadingOverlaySpinner,
  },
  props: {
    isLoading: {
      type: Boolean,
    },
  },
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
