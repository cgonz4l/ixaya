<script setup lang="ts">
import { useShoppingCart } from '@/stores/shoppingCart'
import { apiKey } from '@/typescript/utils'
import axios from 'axios'
import { ref } from 'vue'
import type { Order } from '@/typescript/interfaces'
import { formatAsCurrency } from '@/typescript/utils'
const shoppingCart = useShoppingCart()

function getProductList() {
    return shoppingCart.itemList.map((item: any) => {
        return {
            product_id: item.id,
            qty: item.quantity
        }
    })
}

const order = ref<Order>({
    street_name: 'Ocampo',
    address: '342',
    zip_code: '39080',
    phone: '4445557788',
    state: 'Guanajuato',
    city: 'Moroleón',
    product_list: getProductList()
})

async function sendData() {
    axios.post('/api/orders/create', {
        'X-API-KEY': apiKey,
        street_name: order.value.street_name,
        address: order.value.address,
        zip_code: order.value.zip_code,
        phone: order.value.phone,
        state: order.value.state,
        city: order.value.city,
        product_list: getProductList()

    }).then(response => {
        if(response.data) {
            alert('Compra realizada con éxito')
        }
    }).catch(() => {
        alert('Ha ocurrido un error')
    })
}
</script>

<template>
    <div class="grid" style="position: relative">
        <div class="order-details column">
        <h2>Detalles de la compra</h2>
            <div style="padding: 12px">
                <label>
                    Ciudad:
                    <input v-model="order.city" type="text">
                </label>
                <br>
                <label>
                    Estado:
                    <input v-model="order.state" type="text">
                </label>
                <br>
                <label>
                    Calle:
                    <input v-model="order.street_name" type="text">
                </label>
                <br>
                <label>
                    Dirección:
                    <input v-model="order.address" type="text">
                </label>
                <br>
                <label>
                    Teléfono:
                    <input v-model="order.phone" type="text">
                </label>
                <br>
                <label>
                    Código postal:
                    <input v-model="order.zip_code" type="text">
                </label>

                </div>
                <br>
            <div>
                Total a pagar: {{formatAsCurrency(shoppingCart.totalPrice) }}
                <br>
                <button @click="sendData" class="button">Pagar</button>
            </div>
        </div>
        <div class="items-list column">
            <h3 class="heading">Artículos</h3>
            <div v-for="(item, index) in shoppingCart.itemList" class="item grid">
                <img :src="item.imageUrl" :alt="item.title" class="thumbnail">
                <div>
                    <div>
                        <label>
                            Cantidad:
                            <input v-model="item.quantity" type="number" min="1" class="quantity">
                        </label>
                    </div>
                    <button @click="shoppingCart.remove(index)">Quitar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.heading {
    padding: 12px;
    font-size: 24px;
    background-color: slateblue;
    color: white;
}
.column {
    width: 50%;
}

.thumbnail {
    max-width: 200px;
    max-height: 100px
}

.grid {
    display: flex;
    flex-wrap: wrap;
}

.item {
    padding: 12px;
    margin: 12px 0;
    justify-content: space-between;
}

.order-details {
    position: sticky;
    top: 0;
    height: 80vh;
}

.quantity {
    width: 50px;
}
.items-list {
    background-color: gainsboro;
}
</style>