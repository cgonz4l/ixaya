<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useShoppingCart } from './stores/shoppingCart'
import ShoppingCart from './components/ShoppingCart.vue'

const shoppingCart = useShoppingCart()
</script>

<template>
<nav class="navigation">
<h1 style="width: 100px;">Ixaya</h1>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/mis-compras">Mis compras</RouterLink>
    <ShoppingCart />
</nav>
    <RouterView />
</template>

<style scoped>
.navigation {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 999;
    background-color: white;
}

nav a.router-link-exact-active {
    text-decoration: underline;
    color: crimson;
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
    text-decoration: none;
    color: black;
    padding: 12px;
}

nav a:first-of-type {
    border: 0;
}
</style>
