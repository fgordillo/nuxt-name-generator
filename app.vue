<script setup lang="ts">
import { reactive, ref } from "vue"
import { Gender, Popularity, Length, Origin, names } from "./data"
import "assets/css/main.css"

interface OptionsState {
  gender: Gender;
  popularity: Popularity;
  length: Length;
  origin: Origin;
}

function enumToArray(en) {
  return Object.values(en)
}

const fields = [
  {
    id: "gender",
    title: "1) Choose a gender",
    options: enumToArray(Gender),
  },
  {
    id: "popularity",
    title: "2) Choose a name's popularity",
    options: enumToArray(Popularity),
  },
  {
    id: "length",
    title: "3) Choose the name's length",
    options: enumToArray(Length),
  },
  {
    id: "origin",
    title: "4) Choose the name's origin",
    options: enumToArray(Origin),
  },
]

const cookedFields = computed(() => fields.filter((field, idx) => {
  const id = fields[idx - 1]?.id
  return idx === 0 || selection[field.id] || selection[id]
}))

const showSubmitButton = computed(() => Object.values(selection).every(Boolean))

const selection = reactive<OptionsState>({
  gender: null,
  popularity: null,
  length: null,
  origin: null,
})

let chosenNames = ref<string[]>([])

async function submit() {
  chosenNames.value = await $fetch("api/names", {
    method: "POST",
    body: selection
  })
}

function removeName(name) {
  chosenNames.value = chosenNames.value.filter(s => s !== name)
}
</script>

<template>
  <div class="sm:max-w-lg sm:mx-auto mx-5 text-center text-red-800 my-8">
    <h1 class="text-3xl text-bold mb-5">Baby name generator</h1>
    <p class="mb-5">Choose your options and click the "Find names" button below</p>
    <transition-group
      tag="form"
      name="fade"
      @submit.prevent="submit"
    >
      <option-picker
        v-for="({ id, title, options}) of cookedFields"
        :key="title"
        :title="title"
        :options="options"
        :value="selection[id]"
        class="transition-all"
        @select="v => selection[id] = v"
      />

      <button
        v-if="showSubmitButton"
        class="bg-red-500 rounded-lg p-3 text-white cursor-pointer"
        type="submit"
        key="submit"
      >
        Find names
      </button>
    </transition-group>
    <div class="mt-5">
      <p
        v-if="chosenNames.length"
        class="mb-4"
      >
          Click on the names to remove them from the list
      </p>
      <button
        v-for="name of chosenNames"
        :key="name"
        type="button"
        class="bg-red-800 rounded-lg text-sm p-3 m-1 text-white cursor-pointer"
        @click="removeName(name)"
      >
        {{ name }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>