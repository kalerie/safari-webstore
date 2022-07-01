import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { ProductModel, ProductSchema } from './product.schemas';


@Module({
    providers: [ProductsService],
    controllers: [ProductsController],
    imports: [
        MongooseModule.forFeature([
            {name: ProductModel.name, schema: ProductSchema}
        ])
    ]
})

export class ProductsModule {

}
