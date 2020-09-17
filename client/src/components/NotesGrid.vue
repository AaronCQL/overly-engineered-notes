<template>
  <div
    class="h-full grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-4"
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
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from "vue";

import NoteCard from "./NoteCard.vue";
import AddNoteButton from "./AddNoteButton.vue";
import { getNotes } from "./../utils/api";
import { Note } from "../utils/models";

export default defineComponent({
  name: "NotesGrid",
  components: {
    NoteCard,
    AddNoteButton,
  },
  async setup() {
    const notes: Ref<Note[]> = ref([]);

    async function refreshNotes() {
      // reverse to get the newest notes first
      notes.value = (await getNotes()).reverse();
    }

    onMounted(async () => {
      await refreshNotes();
    });

    return {
      notes,
      refreshNotes,
    };
  },
});
</script>

<style></style>
