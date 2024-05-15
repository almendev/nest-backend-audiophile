import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryModule } from 'src/categories/category.module';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { Product } from './entities/product.entity';
import { CategoryService } from 'src/categories/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, CategoryService],
})
export class ProductModule {}
