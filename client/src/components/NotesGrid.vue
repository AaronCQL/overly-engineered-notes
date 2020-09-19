<template>
  <div class="bg-gray-900">
    <div
      v-if="isLoading"
      class="h-screen flex flex-col items-center justify-center"
    >
      <span
        class="mb-2 text-teal-300 text-xl uppercase font-bold opacity-75 tracking-widest"
      >
        Loading
      </span>
      <LoadingSpinner />
    </div>
    <div
      v-else
      class="min-h-screen p-4 grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4 gap-4"
    >
      <AddNoteButton @note-created="refreshNotes" />
      <NoteCard
        v-for="note in notes"
        :key="note._id"
        :note="note"
        @note-deleted="refreshNotes"
        @note-edited="refreshNotes"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import NoteCard from "./NoteCard.vue";
import AddNoteButton from "./AddNoteButton.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { getNotes } from "./../utils/api";
import { Note } from "../utils/models";

export default defineComponent({
  name: "NotesGrid",
  components: {
    NoteCard,
    AddNoteButton,
    LoadingSpinner,
  },
  setup() {
    const notes = ref<Note[]>([]);
    const isLoading = ref<boolean>(true);

    async function refreshNotes() {
      isLoading.value = true;
      // reverse to get the newest notes first
      notes.value = (await getNotes()).reverse();
      isLoading.value = false;
    }

    onMounted(async () => {
      await refreshNotes();
    });

    return {
      notes,
      refreshNotes,
      isLoading,
    };
  },
});
</script>

<style></style>
