<template>
  <button
    class="bg-green-600 bg-opacity-25 hover:bg-opacity-50 text-green-300 shadow hover:shadow-lg rounded-md focus:outline-none flex justify-center items-center transition duration-100"
    aria-label="Add note"
    @click="onAddButtonClick"
  >
    <span class="text-xl uppercase font-bold tracking-wider">Add Note</span>
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
import { defineComponent } from "vue";
import { createNote } from "../utils/api";

function getUserInput(): string {
  const userInput: string = prompt("Enter your new note:");

  return userInput?.trim();
}

export default defineComponent({
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
});
</script>

<style></style>
