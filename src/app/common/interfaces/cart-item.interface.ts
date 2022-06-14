export interface CartItem {
    id?: number;
    productId: number;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
    subTotal: number
}