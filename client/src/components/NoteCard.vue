<template>
  <div
    class="bg-gray-800 text-gray-100 p-2 shadow-md hover:shadow-lg rounded-md flex flex-col justify-between"
  >
    <div class="mb-4">
      <div class="font-light mb-2 text-gray-400">
        {{ formattedCreatedAt }}
      </div>
      <div class="text-lg">
        {{ note.text }}
      </div>
    </div>

    <div class="flex justify-between items-end -mb-2 -mx-2">
      <span
        class="text-gray-600 text-sm bg-opacity-25 px-1 font-mono rounded-bl"
      >
        {{ note._id }}
      </span>

      <div>
        <button
          class="focus:outline-none text-blue-500 hover:text-blue-300 p-2"
          @click="onEditButtonClick"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </button>

        <button
          class="focus:outline-none text-red-500 hover:text-red-300 p-2"
          @click="onDeleteButtonClick"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.25"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";

import { Note } from "../utils/models";
import { deleteNote, editNote } from "../utils/api";

function getUserInput(currentText: string): string {
  const userInput: string = prompt("Enter your new note:", currentText);

  return userInput?.trim();
}

export default {
  name: "NoteCard",
  props: {
    note: {
      type: Object as () => Note,
      required: true,
    },
  },
  emits: ["note-deleted", "note-edited"],
  setup(props, { emit }) {
    const formattedCreatedAt = computed(() =>
      new Date(props.note.createdAt).toLocaleString()
    );

    async function onDeleteButtonClick() {
      const shouldProceed: boolean = confirm(
        "Are you sure you want delete this note? This cannot be undone."
      );

      if (!shouldProceed) {
        return;
      }

      await deleteNote(props.note._id);
      emit("note-deleted");
    }

    async function onEditButtonClick() {
      const userInput: string = getUserInput(props.note.text);

      if (!userInput) {
        return;
      }

      await editNote(props.note._id, userInput);
      emit("note-edited");
    }

    return {
      formattedCreatedAt,
      onEditButtonClick,
      onDeleteButtonClick,
    };
  },
};
</script>

<style></style>
