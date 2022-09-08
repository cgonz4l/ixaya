<script setup lang="ts">
import axios from 'axios'
import { apiKey } from '@/typescript/utils'
import { ref } from 'vue';
import Modal from '@/components/Modal.vue'
import PurchaseDetails from '@/components/PurchaseDetails.vue'
const orders = ref<any>([])
axios.get('/api/orders', {
    params: {
        'X-API-KEY': apiKey
    }
}).then(response => {
    orders.value = response.data.response
})
const modal = ref<InstanceType<typeof Modal> | null>(null)
const order_id = ref(0)
function openModal(id: number) {
    modal.value?.open()
    order_id.value = Number(id)
}
</script>

<template>
    <div v-for="item in orders" class="order">
        <div class="summary grid">
            <div class="order-details">
                <div>Pedido N°: {{ item.order_code}}</div>
            </div>
            <button @click="openModal(item.id)">Ver compra</button>
        </div>
        <div class="products">
            <div v-for="product in item.products" class="product">
                <div class="grid list">
                    <div class="frame grid">
                        <img :src="product.image_url" :alt="product.title" class="thumbnail">
                    </div>
                    <div>{{ product.title }}</div>
                    <div>Cantidad: {{ product.qty }}</div>
                </div>
            </div>
        </div>
    </div>
    <Modal ref="modal">
        <div data-asdas="" ref="content">
            <PurchaseDetails :id="order_id"></PurchaseDetails>
        </div>
    </Modal>
</template>

<style scoped lang="scss">
.order {
    margin: 24px;
    overflow: hidden;
    border: solid 1px lightgrey;
}

.grid {
    display: flex;
    flex-wrap: wrap;
}

.list, .summary {
    justify-content: space-between;
}

.summary {
    background-color: dimgray;
    color: white;
    padding: 24px;
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
    $params: solid 1px lightgrey;
    padding: 12px;
    border: {
        bottom: $params;
    }
}
</style>