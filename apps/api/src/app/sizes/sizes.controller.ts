import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateSizeDto, UpdateSizeDto } from "@safari-store/api-interfaces";
import { SizesService } from "./sizes.service";
import { SizeModel } from './size.schemas';

@Controller('sizes')
export class SizesController {

    constructor(private readonly sizesService: SizesService) {  }

    @Get()
    getAll(): Promise<SizeModel[]> {
        return this.sizesService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<SizeModel> {
        return this.sizesService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createSizeDto: CreateSizeDto): Promise<SizeModel> {
        return this.sizesService.create(createSizeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<SizeModel> {
        return this.sizesService.remove(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto, ): Promise<SizeModel> {
        return this.sizesService.update(id, updateSizeDto);
    }

}
