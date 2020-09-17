<template>
  <button
    class="bg-green-600 hover:bg-green-500 text-white p-2 rounded-full shadow-lg focus:outline-none"
    @click="onAddButtonClick"
  >
    <svg
      class="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
  </button>
</template>

<script lang="ts">
import { createNote } from "../utils/api";

function getUserInput(): string {
  const userInput: string = prompt("Enter your new note:");

  return userInput?.trim();
}

export default {
  name: "AddNoteButton",
  emits: ["note-created"],
  setup(_, { emit }) {
    async function onAddButtonClick() {
      const userInput: string = getUserInput();

      if (!userInput) {
        return;
      }

      await createNote(userInput);
      emit("note-created");
    }

    return {
      onAddButtonClick,
    };
  },
};
</script>

<style></style>
