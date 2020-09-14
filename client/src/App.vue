<template>
  <div class="min-h-screen bg-gray-900 p-4">
    <Suspense>
      <template #default>
        <NotesGrid />
      </template>
      <template #fallback>
        <div>LOADING</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import NotesGrid from "./components/NotesGrid.vue";

export default {
  name: "App",
  components: {
    NotesGrid,
  },
};
</script>
