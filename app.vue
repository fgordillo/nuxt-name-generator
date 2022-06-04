<script setup lang="ts">
import { reactive, ref } from "vue"
import { Gender, Popularity, Length, names as names } from "@/data"

interface OptionsState {
  gender: Gender;
  popularity: Popularity;
  length: Length;
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
  }
]

const selection = reactive<OptionsState>({
  gender: Gender.BOY,
  popularity: Popularity.TRENDY,
  length: Length.ALL
})

let chosenNames = ref<string[]>([])

function submit() {
  chosenNames.value = names.filter(({ gender, popularity, length }) => {
    return gender === selection.gender &&
           popularity === selection.popularity &&
           (selection.length === Length.ALL || length === selection.length)
  }).map(({ name }) => name)
}
</script>

<template>
  <div class="container">
    <h1>Baby name generator</h1>
    <p>Choose your options and click the "Find names" button below</p>
    <form
      class="options-container"
      @submit.prevent="submit"
    >
      <option-picker
        v-for="({ id, title, options}) of fields"
        :key="title"
        :title="title"
        :options="options"
        :value="selection[id]"
        @select="v => selection[id] = v"
      />

      <button type="submit">Find names</button>
    </form>
    <div>
      <button
        v-for="name of chosenNames"
        :key="name"
        type="button"
      >
        {{ name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family:Arial, Helvetica, sans-serif;
  color: rgb(92, 22, 5);
  max-width: 1024px;
  margin: 0 auto;
  text-align: center;
}
.options-container {
  background-color: rgb(249, 150, 145);
  border-radius: 2rem;
  padding: 1rem;
  margin: 0 1rem 1rem;
  position: relative;
}
.option-container {
  margin-bottom: 2rem;
}
</style>