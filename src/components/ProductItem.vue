<script setup lang="ts">
import type { Product } from '@/typescript/interfaces'
interface Props {
    product: Product
}
const props = defineProps<Props>()
function formatAsCurrency(price: number) {
    return (Number(price)).toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})
}
const currentPrice = () => {
    let price = props.product.price
    if(props.product.discount) {
        price = price - props.product.discount
    }
    return formatAsCurrency(price)
}
const slug = (str: string) => {
    return str.normalize('NFD').replace(/[^\w\s]/g, '').toLocaleLowerCase()
        .replace(/\W/g, '-')
}
</script>

<template>
    <RouterLink :to="{name: 'products', params: { title: slug(product.title), id: product.id}}" 
        class="panel">
        <img class="thumbnail" :src="product.image_url" :alt="product.title">
        <h3 class="title">{{ product.title }}</h3>
        <div class="info">
            <span class="price">{{ currentPrice() }}</span>
            <span v-if="product.discount" class="actual-price">{{ formatAsCurrency(product.price) }}</span>
            <div class="description">
                {{ product.short_description }}
                <div class="price">{{ currentPrice() }}</div>
            </div>
        </div>
    </RouterLink>
</template>

<style scoped lang="scss">
.thumbnail {
    max-width: 100%;
    max-height: 200px;
    align-self: center;
}

.actual-price {
    text-decoration: line-through;
    color: dimgrey;
}

.info {
    width: 100%;
    position: relative;
}

.description {
    background-color: black;
    color: white;
    opacity: 0;
    z-index: 999;
    position: absolute;
    bottom: 0;
    padding: 12px;
    transition: all .3s ease-in-out;
}

.panel {
    width: 42%;
    margin: 2%;
    display: flex;
    flex-wrap: wrap;
    padding: 12px;
    justify-content: center;
    text-decoration: none;
    color: black;
    &:hover {
        .description {
            opacity: 1;
        }
    }
}

.title {
    width: 100%;
}

.price {
    font-size: 28px;
    margin-right: 6px;
}


</style>