<script setup>
const props = defineProps({
    selected: Boolean
})
</script>

<template>
    <button
        class="outline outline-2 outline-red-500 p-3 sm:w-40 w-full cursor-pointer transition-color focus:outline-red-200 transition-colors duration-700"
        :class="selected ? 'bg-red-500 text-white' : 'bg-white'"
        type="button"
    >
        <slot />
    </button>
</template>