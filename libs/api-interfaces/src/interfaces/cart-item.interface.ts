export interface CartItem {
    id?: number;
    productId: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
    subTotal: number
}