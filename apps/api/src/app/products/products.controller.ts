import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, Request } from "@nestjs/common";
import { CreateProductDto, UpdateProductDto } from "@safari-store/api-interfaces";
import { ProductsService } from "./products.service";
import { ProductModel } from './product.schemas';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {

    }

    @Get()
    async getAll(@Request() req?): Promise<ProductModel[]> {
      if(req.query) {
        let options = {};
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', '_order'];
        excludedFields.forEach(el => delete queryObj[el]);   // prepare query without sort and order
        let queryString = JSON.stringify(queryObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        let sorting = {};
        if(req.query.sort) {
          const [sortBy, order] = req.query.sort.split('-');
          sorting[sortBy] = order;
        }
        let query = await this.productsService.find(JSON.parse(queryString), sorting);

        // for future filters
        // if (req.query) {
        //   options = {
        //     $and: [
        //       {type: new RegExp(req.query.type)},
        //       {category: new RegExp(req.query.category)}
        //     ]
        // sort:{
        //   createdAt : -1 //descending order
        // }
        // $or: [
        //   {title: new RegExp(req.query.s.toString(), 'i')},
        //   // {description: new RegExp(req.query.s.toString(), 'i')},
        // ]
        //   }
        // }
        // console.log(options);

        // const data = await this.productsService.find(options);
        return query;
      } else {
        return this.productsService.getAll();
      }

    }


    @Get(':id')
    getOne(@Param('id') id: string): Promise<ProductModel> {
        return this.productsService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createProductDto: CreateProductDto): Promise<ProductModel> {
        return this.productsService.create(createProductDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<ProductModel> {
        return this.productsService.remove(id);
    }

    @Put(':id')
    update(@Body() updateProductDto: UpdateProductDto, @Param('id') id: string): Promise<ProductModel> {
        return this.productsService.update(id, updateProductDto);
    }

}
