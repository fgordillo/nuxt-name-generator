<script setup>
const props = defineProps({
    selected: Boolean
})
</script>

<template>
    <button
        class="option-button"
        :class="selected ? 'pressed' : 'normal'"
        type="button"
    >
        <slot />
    </button>
</template>

<style lang="css" scoped>
.option-button {
    outline: 0.15rem solid rgb(249, 87, 89);
    border: none;
    padding: 0.75rem;
    width: 10rem;
    cursor: pointer;
    transition: all 300ms;
}
.option-button:focus {
  background: rgba(249, 87, 89, 0.5);
  color: white;
}
.option-button:hover {
  font-weight: 700;
}
.normal {
    background: white;
}
.pressed {
    background: rgba(249, 87, 89);
    color: white;
}
</style>