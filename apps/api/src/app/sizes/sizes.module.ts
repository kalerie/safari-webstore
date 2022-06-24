import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Size, SizeSchema } from "@safari-store/api-interfaces";
import { SizesController } from "./sizes.controller";
import { SizesService } from "./sizes.service";

@Module({
    providers: [
        SizesService
    ],
    controllers: [
        SizesController
    ],
    imports: [
        MongooseModule.forFeature([
            {name: Size.name, schema: SizeSchema}
        ])
    ]
})

export class SizesModule {

}