export interface Product {
    id: string
    category: string
    title: string
    short_description: string
    description: string
    sale_count: number
    discount: number
    price: number
    enabled: number
    image_url: string
    create_date: string
    last_update: string
}

export interface Order {
    street_name: string
    zip_code: string
    address: string
    phone: string
    state: string
    city: string,
    product_list: []
}