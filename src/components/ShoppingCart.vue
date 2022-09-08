<script setup lang="ts">
import { useShoppingCart } from '@/stores/shoppingCart'
import { RouterLink } from 'vue-router';
const shoppingCart = useShoppingCart()
</script>

<template>
    <div class="cart">
        <RouterLink to="/carrito">
            <div style="padding: 12px" class="cart-button">Carrito: {{ shoppingCart.totalItems }}</div>
        </RouterLink>
        <div class="drop-down">
            <div v-for="(item, index) in shoppingCart.itemList" class="grid item">
                <img :src="item.imageUrl" :alt="item.title" class="thumbnail">
                <div style="margin-left: 12px">
                    <div>{{ item.title }}</div>
                    <input v-model="item.quantity" type="number" min="1" class="quantity">
                </div>
                <div @click="shoppingCart.remove(index)" class="cross">&#10005;</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cart-button {
    color: black;
}

.cross {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    $dimensions: 20px;
    width: $dimensions;
    height: $dimensions;
    background-color: white;
}
.quantity {
    width: 50px;
}

.grid {
    display: flex;
}
.cart {
    &:hover {
        .drop-down {
            display: block;
        }
    }
    a {
        text-decoration: none;
        color: white;
    }
}

.thumbnail {
    max-width: 100px;
    max-height: 80px;
}

.drop-down {
    width: 400px;
    background-color: lightgray;
    color: black;
    display: none;
    z-index: 999;
    position: absolute;
    top: 100%;
    padding: 9px;
}

.item {
    padding: 4px;
}
</style>