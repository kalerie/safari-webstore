import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Color, CreateColorDto, UpdateColorDto } from "@safari-store/api-interfaces";
import { ColorsService } from "./colors.service";

@Controller('colors')
export class ColorsController {

    constructor(private readonly colorsService: ColorsService) {  }

    @Get()
    getAll(): Promise<Color[]> {
        return this.colorsService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Color> {
        return this.colorsService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createColorDto: CreateColorDto): Promise<Color> {
        return this.colorsService.create(createColorDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Color> {
        return this.colorsService.remove(id);
    }

    @Put()
    update(@Body() updateColorDto: UpdateColorDto, @Param('id') id: string): Promise<Color> {
        return this.colorsService.update(id, updateColorDto);
    }
    
}