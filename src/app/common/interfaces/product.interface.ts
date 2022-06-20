import { Color } from "./color.interface";
import { ProductsColors } from "./products-colors.interface";
import { Size } from "./size.interface";

export interface Product {
    id?: number;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    category: string;
    

    productColors?: ProductsColors[]
    // size?: Size;
    // colors?: Color;
}