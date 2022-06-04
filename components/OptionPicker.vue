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
    <fieldset class="border-0">
        <h4 class="text-2xl text-red mb-4">{{ title }}</h4>
        <div class="mb-5">
            <option-button
                v-for="option of options"
                :key="option"
                :selected="value === option"
                class="sm:first:rounded-l-full sm:last:rounded-r-full"
                @click="select(option)"
            >
                {{ option }}
            </option-button>
        </div>
    </fieldset>
</template>
