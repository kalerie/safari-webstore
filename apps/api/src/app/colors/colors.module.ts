import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Color, ColorSchema } from "../../../../../libs/api-interfaces/src/models/color.schemas";
import { ColorsController } from "./colors.controller";
import { ColorsService } from "./colors.service";

@Module({
    providers: [ColorsService],
    controllers: [ColorsController],
    imports: [
        MongooseModule.forFeature([
            {name: Color.name, schema: ColorSchema}
        ])
    ]
})

export class ColorsModule {

}