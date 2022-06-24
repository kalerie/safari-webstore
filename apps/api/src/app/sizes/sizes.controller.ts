import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateSizeDto, Size, UpdateSizeDto } from "@safari-store/api-interfaces";
import { SizesService } from "./sizes.service";

@Controller('sizes')
export class SizesController {

    constructor(private readonly sizesService: SizesService) {  }

    @Get()
    getAll(): Promise<Size[]> {
        return this.sizesService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<Size> {
        return this.sizesService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createSizeDto: CreateSizeDto): Promise<Size> {
        return this.sizesService.create(createSizeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<Size> {
        return this.sizesService.remove(id);
    }

    @Put()
    update(@Body() updateSizeDto: UpdateSizeDto, @Param('id') id: string): Promise<Size> {
        return this.sizesService.update(id, updateSizeDto);
    }
    
}