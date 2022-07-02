import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateColorDto, UpdateColorDto } from "@safari-store/api-interfaces";
import { ColorsService } from "./colors.service";
import { ColorModel } from './color.schemas';

@Controller('colors')
export class ColorsController {

    constructor(private readonly colorsService: ColorsService) {  }

    @Get()
    getAll(): Promise<ColorModel[]> {
        return this.colorsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<ColorModel> {
        return this.colorsService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createColorDto: CreateColorDto): Promise<ColorModel> {
        return this.colorsService.create(createColorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<ColorModel> {
        return this.colorsService.remove(id);
    }

    @Put(':id')
    update(@Body() updateColorDto: UpdateColorDto, @Param('id') id: string): Promise<ColorModel> {
        return this.colorsService.update(id, updateColorDto);
    }

}
