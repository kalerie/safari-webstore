import { Color } from "./color.interface";

export interface ProductsColors {
    id?: number;
    productId: number;
    colorId: number;
    color?: Color[]
}