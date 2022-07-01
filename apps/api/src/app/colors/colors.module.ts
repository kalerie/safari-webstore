import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ColorsController } from "./colors.controller";
import { ColorsService } from "./colors.service";
import { ColorModel, ColorSchema } from './color.schemas';

@Module({
    providers: [ColorsService],
    controllers: [ColorsController],
    imports: [
        MongooseModule.forFeature([
            {name: ColorModel.name, schema: ColorSchema}
        ])
    ]
})

export class ColorsModule {

}
