<template>
  <div
    class="bg-gray-800 text-gray-100 p-3 shadow-md hover:shadow-lg rounded-md flex flex-col justify-between"
  >
    <div class="mb-4">
      <div class="font-semibold mb-2">{{ note.updatedAt }}</div>
      <div>
        {{ note.text }}
      </div>
    </div>

    <div class="flex justify-between items-center">
      <span
        class="bg-blue-400 text-blue-200 bg-opacity-25 px-1 font-mono rounded"
      >
        {{ note._id }}
      </span>

      <button
        class="bg-red-400 text-red-200 bg-opacity-25 px-1 font-mono rounded focus:shadow-outline focus:outline-none"
      >
        delete
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Note } from "../utils/models";

export default {
  name: "NoteCard",
  props: {
    note: {
      type: Object as () => Note,
      required: true,
    },
  },
};
</script>

<style></style>
