<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue';
import ProductItem from '@/components/ProductItem.vue';
import { productList } from '@/typescript/utils'
const list = ref([])
productList.then(response => {
    console.log(response)
    list.value = response.data.response
})
</script>

<template>
    <div class="wrapper">
        <ProductItem v-for="product in list" :product="product"/>
    </div>
</template>

<style>
.wrapper {
    display: flex;
    flex-wrap: wrap;
}
</style>