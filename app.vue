<script setup lang="ts">
import { reactive, ref } from "vue";
import { Gender, Popularity, Length, Origin, names } from "./data";
import "assets/css/main.css";

interface OptionsState {
  gender: Gender;
  popularity: Popularity;
  length: Length;
  origin: Origin;
}

function enumToArray(en) {
  return Object.values(en);
}

const fields = [
  {
    id: "gender",
    title: "1) What's the gender of the baby?",
    options: enumToArray(Gender),
  },
  {
    id: "popularity",
    title: "2) Would you like a trendy name or rather a unique one?",
    options: enumToArray(Popularity),
  },
  {
    id: "length",
    title: "3) What should be the length of the name?",
    options: enumToArray(Length),
  },
  {
    id: "origin",
    title: "4) What's the origin of the name?",
    options: enumToArray(Origin),
  },
];

const cookedFields = computed(() =>
  fields.filter((field, idx) => {
    const id = fields[idx - 1]?.id;
    return idx === 0 || selection[field.id] || selection[id];
  })
);

const showSubmitButton = computed(() => Object.values(selection).every(Boolean));

const selection = reactive<OptionsState>({
  gender: null,
  popularity: null,
  length: null,
  origin: null,
});

const chosenNames = ref<string[]>([]);
const showNames = ref(false);

async function select(id, value) {
  selection[id] = value;
  showNames.value = false;
  await nextTick();
  const nextField = fields.find(({ id }) => {
    return !selection[id];
  });
  if (!nextField) {
    document.getElementById("submit").focus();
  } else {
    const firstButton = document.querySelector(
      `#${nextField.id} button`
    ) as HTMLElement | null;
    firstButton?.focus();
  }
}

async function submit() {
  chosenNames.value = await $fetch("api/names", {
    method: "POST",
    body: selection,
  });
  showNames.value = true;
  await nextTick();
  const firstButton = document.querySelector(
    "#result button:first-child"
  ) as HTMLElement | null;
  firstButton?.focus();
}

async function removeName(name) {
  let idx = chosenNames.value.findIndex((s) => s === name)
  chosenNames.value = chosenNames.value.filter((s) => s !== name);
  await nextTick();
  if (idx === chosenNames.value.length) {
    idx--
  }
  const nextButton = document.querySelectorAll("#result button")[idx] as HTMLElement | null
  nextButton?.focus();
}
</script>

<template>
  <Title>Baby names generator</Title>
  <Style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');
  </Style>
  <div class="sm:max-w-lg sm:mx-auto mx-5 text-center text-red-800 my-8">
    <div class="flex items-center mb-5 flex-col sm:flex-row">
      <img
        src="assets/baby.png"
        alt="drawing representing a baby"
        class="w-40 mb-5 sm:mb-0"
      />
      <div>
        <h1 class="text-3xl font-bold mb-5">Baby name generator</h1>
        <p>Choose your options and click the "Find names" button below</p>
      </div>
    </div>

    <transition-group tag="form" name="fade" @submit.prevent="submit">
      <option-picker
        v-for="{ id, title, options } of cookedFields"
        :key="title"
        :id="id"
        :title="title"
        :options="options"
        :value="selection[id]"
        class="transition-all"
        @select="(v) => select(id, v)"
      />

      <button
        v-if="showSubmitButton"
        class="bg-red-800 outline-0 hover:bg-red-700 focus:bg-red-500 rounded-lg px-5 py-3 uppercase text-xl text-white font-bold cursor-pointer"
        type="submit"
        key="submit"
        id="submit"
      >
        Find names
      </button>
    </transition-group>
    <div v-show="showNames" class="mt-5">
      <p v-if="chosenNames.length > 1" class="mb-4">
        Click on the names to remove them from the list
      </p>
      <p v-else-if="chosenNames.length === 1" class="mb-4">
        That's the one you were looking for!!
      </p>
      <p v-else class="mb-4">It seems nothing fits your taste :/</p>
      <section id="result">
        <button
          v-for="name of chosenNames"
          :key="name"
          type="button"
          class="bg-red-800 outline-0 rounded-lg text-sm p-3 m-1 text-white cursor-pointer focus:bg-red-500 hover:bg-red-700 focus:line-through hover:line-through"
          :class="chosenNames.length === 1 && 'the-one'"
          @click="removeName(name)"
        >
          {{ name }}
        </button>
      </section>
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

.the-one {
  @apply relative after:absolute after:content-[''] after:inset-0 after:rounded-[inherit] after:ring-4 after:ring-offset-2 after:ring-amber-400 after:animate-ping;
}
</style>
