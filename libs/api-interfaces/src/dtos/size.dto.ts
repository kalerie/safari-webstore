export class SizeDto {
    readonly title: string;
    readonly value: string;
}

export type CreateSizeDto = SizeDto;
export type UpdateSizeDto = Partial<SizeDto>;
