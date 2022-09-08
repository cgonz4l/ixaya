<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Keypress } from '@/typescript/Keypress'
const show = ref(false)
const close = () => { 
    document.body.style.overflow = 'auto'
    show.value = false
}
const open = () => {
    document.body.style.overflow = 'hidden'
    show.value = true
}
defineExpose({
    close,
    open
})
onMounted(() => {
    const keypress = new Keypress(document)
    keypress.esc(() => close())
})
</script>

<template>
<div v-if="show"
    @click="close"
    class="modal" >
    <div ref="content">
        <slot></slot>
    </div>
</div>
</template>

<style scoped lang="scss">
.modal {
    background-color: rgba($color: #000000, $alpha: 0.6);
    height: 100vh;
    width: 100%;
    overflow: auto;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}
</style>