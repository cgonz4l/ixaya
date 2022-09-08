import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useShoppingCart = defineStore('shoppingCart', () => {
    const itemList = ref<any>([])
    const totalItems = computed(() => {
        let total = 0
        itemList.value.forEach((item: any) => {
            total += item.quantity
        })
        return total
    })
    const totalPrice = computed(() => {
        let price = 0
        itemList.value.forEach((item: any) => {
            price += item.price * item.quantity
        })
        return price
    })
    function addToCart(item: any) {
        itemList.value.push(item)
    }
    function remove(index: number) {
        console.log(itemList.value.splice(index, 1))
    }
    return { itemList, totalItems, addToCart, remove, totalPrice }
})