import { Color } from "./color.interface";
import { Size } from "./size.interface";

export interface Product {
    id?: number;
    title: string;
    price: number;
    imageUrl: string;
    category: string;
    type: string;

    // size?: Size;
    // color?: Color;
}