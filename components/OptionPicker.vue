<script setup>
const props = defineProps({
    title: String,
    options: Array,
    value: String,
})
const emit = defineEmits(["select"])

function select(option) {
    if (option === props.value) {
        emit("select", null)
    } else {
        emit("select", option)
    }
}
</script>

<template>
    <fieldset>
        <h4>{{ title }}</h4>
        <option-button
            v-for="option of options"
            :key="option"
            :selected="value === option"
            class="button"
            @click="select(option)"
        >
            {{ option }}
        </option-button>
    </fieldset>
</template>

<style scoped>
fieldset button:first-of-type {
  border-radius: 1rem 0 0 1rem;
}
fieldset button:last-of-type {
  border-radius: 0 1rem 1rem 0;
}
fieldset {
    border: none;
}
</style>