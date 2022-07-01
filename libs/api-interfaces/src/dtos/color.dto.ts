export class ColorDto {
    readonly title: string;
    readonly value: string;
    // readonly products: string[];
}

export type CreateColorDto = ColorDto;
export type UpdateColorDto = Partial<ColorDto>;
