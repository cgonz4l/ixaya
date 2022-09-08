import axios from 'axios'
export function formatAsCurrency(price: number) {
    return (Number(price)).toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})
}
export const apiKey = 'kkkcc4o4gsko8w0wg084k4o8s4wggwcosk8okgw4'

export const productList = axios.get('/api/products', {
    params: {
        'X-API-KEY': apiKey
    }
})