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
  const userInput: string = prompt("Enter your note");

  if (!userInput) {
    return;
  }

  return userInput;
}

async function onAddButtonClick() {
  const userInput: string = getUserInput();
  await createNote(userInput);
}

export default {
  name: "AddNoteButton",
  setup() {
    return {
      onAddButtonClick,
    };
  },
};
</script>

<style></style>
