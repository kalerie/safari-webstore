import { Color } from "./color.interface";
import { Size } from "./size.interface";

export interface Product {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    category: string;
    colors: Color[];
    sizes: Size[];
}