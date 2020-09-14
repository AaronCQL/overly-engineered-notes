<template>
  <div
    class="h-full grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-3 gap-4"
  >
    <NoteCard v-for="note in notes" :key="note._id" :note="note" />
  </div>
  <AddNoteButton class="fixed right-0 bottom-0 m-6" />
</template>

<script lang="ts">
import { reactive, computed } from "vue";

import NoteCard from "./NoteCard.vue";
import AddNoteButton from "./AddNoteButton.vue";
import { getNotes } from "./../utils/api";
import { Note } from "../utils/models";

export default {
  name: "NotesGrid",
  components: {
    NoteCard,
    AddNoteButton,
  },
  async setup() {
    const notes: Note[] = await getNotes();

    return {
      notes,
    };
  },
};
</script>

<style></style>
