<script setup>
const props = defineProps({
    selected: Boolean
})
</script>

<template>
    <button
        class="outline outline-2 outline-red-500 p-3 sm:w-40 w-full cursor-pointer transition-color relative after:content-[''] after:absolute after:w-full after:h-full after:inset-0 after:rounded-[inherit] focus:after:bg-black/10 transition-colors duration-700"
        :class="selected && 'bg-red-500 text-white'"
        type="button"
    >
        <slot />
    </button>
</template>