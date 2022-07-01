import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SizesController } from "./sizes.controller";
import { SizesService } from "./sizes.service";
import { SizeModel, SizeSchema } from './size.schemas';

@Module({
    providers: [
        SizesService
    ],
    controllers: [
        SizesController
    ],
    imports: [
        MongooseModule.forFeature([
            {name: SizeModel.name, schema: SizeSchema}
        ])
    ]
})

export class SizesModule {

}
