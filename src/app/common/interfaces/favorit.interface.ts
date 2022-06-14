import { Product } from "./product.interface";

export interface Favorit {
    id?: number;
    userId: number;
    productId: number;
    product?: Product
}