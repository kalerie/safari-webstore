export class ProductDto {
    readonly title: string;
    readonly price: number;
    readonly imageUrl: string;
    readonly type: string;
    readonly category: string;
    readonly colors: string[];
    readonly sizes: string[];
}

export type CreateProductDto = ProductDto;
export type UpdateProductDto = Partial<ProductDto>;
