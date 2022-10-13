
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
    id: number,
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

export interface Delivery {
    product_id: number,
    product_name: string,
    amount: number,
    delivery_date: string,
    comment: string,
}

export default interface Auth {
    email: string,
    password: string,
}


export default interface Invoice {
    order_id: number,
    total_price: number,
    creation_date: string,
    due_date: string,

}
