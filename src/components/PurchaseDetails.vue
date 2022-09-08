<script setup lang="ts">
import axios from 'axios'
import { apiKey } from '@/typescript/utils'
import { ref } from 'vue';
import { formatAsCurrency } from '@/typescript/utils'
const props = defineProps<{id: number}>()
const order = ref<any>({})
axios.post('/api/orders/detail', {
    'X-API-KEY': apiKey,
    order_id: props.id
}).then(response => {
    order.value = response.data.response
    console.log(order.value)
})
</script>

<template>
    <div class="overview">
        <div class="details grid">
            <div>
                <div>Pedido N°: {{ order.order_code }}</div>
                <div>Enviado a: {{ `${order.address} ${order.street_name}. ${order.city}, ${order.state}` }}</div>
            </div>
            <ul>
                <li>Subtotal: {{ formatAsCurrency(order.subtotal) }}</li>
                <li>Descuencto: {{ formatAsCurrency(order.discount) }}</li>
                <li>Total: {{ formatAsCurrency(order.total) }}</li>
            </ul>
        </div>
        <div v-for="item in order.products" class="product">
            <div class="grid list">
                <div class="frame grid">
                    <img :src="item.image_url" :alt="item.title" class="thumbnail">
                </div>
                <div>{{ item.title }}</div>
                <ul>
                    <li>Cantidad: {{ item.qty }}</li>
                    <li> Total: {{ formatAsCurrency((item.price - item.discount) * item.qty ) }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.details {
    padding: 12px;
    color: white;
    background-color: slateblue;
}
.overview {
    background-color: white;
    border-radius: 13px;
    overflow: hidden;
}
.grid {
    display: flex;
    flex-wrap: wrap;
}

.list {
    justify-content: space-between;
}

.frame {
    justify-content: center;
    width: 30%;
}

.thumbnail {
    max-height: 150px;
    max-width: 100%;
    align-self: center;
}

.product {
    padding: 12px;
    border: solid 1px lightgrey;
}
</style>