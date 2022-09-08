<script setup lang="ts">
import { formatAsCurrency, productList } from '@/typescript/utils'
import type { Product } from '@/typescript/interfaces'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useShoppingCart } from '@/stores/shoppingCart'
const route = useRoute()
const id = route.params.id
const current = ref<Product>()
const price = ref(0)
const actualPrice = ref(0)
productList.then(response => {
    response.data.response.forEach((item: any) => {
        if(item.id === id) {
            current.value = item
            price.value = item.price - item.discount
            actualPrice.value = item.price
        }
    });
})
const description = computed(() => current.value?.description.split("\n"))
const title = computed(() => current.value?.title)
const imageUrl = computed(() => current.value?.image_url)
const quantity = ref(1)
const shoppingCart = useShoppingCart()
const itemDetails = {
    title: title,
    id: route.params.id,
    imageUrl: imageUrl,
    quantity: 0,
    price: price,
    actualPrice: actualPrice
}
function addToCart() {
    if(shoppingCart.itemList.length == 0) {
        itemDetails.quantity = quantity.value
        shoppingCart.addToCart(itemDetails)
    } else {
        const itemIndex = shoppingCart.itemList.findIndex((item: any) => item.id === route.params.id)
        if(itemIndex >= 0) {
            shoppingCart.itemList[itemIndex].quantity += quantity.value
        } else {
            itemDetails.quantity = quantity.value
            shoppingCart.addToCart(itemDetails)
        }
        alert('Añadido al carrito')
    }

}
</script>

<template>
    <div class="grid">
        <div class="column picture">
            <img :src="current?.image_url" :alt="current?.title" class="thumbnail">
        </div>
        <div class="column info">
            <h2>{{ current?.title }}</h2>
            <div v-if="actualPrice" class="actual-price">
                {{ formatAsCurrency(actualPrice) }}
            </div>
            <div class="price"><b>{{ formatAsCurrency(price) }}</b></div>
            <h3>{{ description?.slice(0, 1)[0] }}</h3>
            <p v-for="item in description?.slice(1)">{{item}}</p>
            <div class="frame">
                <button @click="addToCart" class="button">Añadir al carrito</button>
                <input v-model="quantity" type="number" min="1" class="quantity">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.grid {
    display: flex;
    flex-wrap: wrap;
}

.thumbnail {
    max-width: 100%;
    align-self: center;
}

.picture {
    display: flex;
    position: sticky;
    top: 0;
}

@media (min-width: 1124px) {
    .column {
        width: 50%;
    }
    .picture {
        height: 100vh;
    }
}

.actual-price {
    text-decoration: line-through;
    color: dimgrey;
}

.price {
    font-size: 32px;
    margin-right: 6px;
}

.info {
    padding: 24px;
}

.quantity {
    width: 70px;
    margin: 12px;
    padding: 12px;
    font-size: 18px;
}

.frame {
    margin: 48px;
}
</style>