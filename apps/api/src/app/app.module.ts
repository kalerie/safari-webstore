import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColorsModule } from './colors/colors.module';
import { ProductsModule } from './products/products.module';
import { SizesModule } from './sizes/sizes.module';

@Module({
  imports: [
    ProductsModule,
    ColorsModule,
    SizesModule,
    MongooseModule.forRoot(`mongodb+srv://dbAdmin:pQ66IrhHFukb2qIz@cluster0.eroqx.mongodb.net/?retryWrites=true&w=majority`)
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService],
})
export class AppModule {}
