
export interface Order {
    id: number,
    name: string,
    address: string,
    zip: number,
    city: string,
    country: string,
    status: string,
    status_id: number,
    api_key: string,
    order_items: Array<OrderItem>,
}


export interface OrderItem {
    product_id: number,
    amount: number,
    article_number: string,
    name: string,
    description: string,
    specifiers: Array<Specifiers>,
    stock: number,
    location: string,
    price: number,
}


export interface Specifiers {
    length: string
    width: string
    diameter: string
}
