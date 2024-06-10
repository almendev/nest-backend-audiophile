import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { name, slug } = createProductDto;
    try {
      const productWithName = await this.productRepository.findOneBy({ name });

      if (productWithName) {
        throw new BadRequestException(`Product ${name} already exists`);
      }

      const productWithSlug = await this.productRepository.findOneBy({ slug });

      if (productWithSlug) {
        throw new BadRequestException(`Slug ${slug} already exists`);
      }

      const category = await this.categoryRepository.findOneBy({
        name: createProductDto.category,
      });

      if (!category) {
        throw new BadRequestException(
          `Category ${createProductDto.category} does not exist`,
        );
      }

      const newProduct = this.productRepository.create({
        ...createProductDto,
        category,
      });
      return this.productRepository.save(newProduct);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.productRepository.find();
  }

  async findByCategory(category: string) {
    try {
      const categoryInRepo = await this.categoryRepository.findOneBy({
        name: category,
      });
      if (!categoryInRepo) {
        throw new BadRequestException(`Category ${category} not found`);
      }

      const products = await this.productRepository.findBy({
        category: categoryInRepo,
      });

      if (!products) {
        throw new BadRequestException(
          `No products found with category ${category}`,
        );
      }

      return products;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new BadRequestException(`No product found with id ${id}`);
      }

      return product;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async findOneBySlug(slug: string) {
    try {
      const product = await this.productRepository.findOneBy({ slug });

      if (!product) {
        throw new BadRequestException(`No product found with slug ${slug}`);
      }

      return product;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new BadRequestException(`No product found with id ${id}`);
      }

      const category = await this.categoryRepository.findOneBy({
        name: updateProductDto.category,
      });

      if (!category) {
        throw new BadRequestException(
          `Category ${updateProductDto.category} does not exist`,
        );
      }

      this.productRepository.merge(product, { ...updateProductDto, category });
      return await this.productRepository.save(product);
    } catch (error) {
      if (Number(error.code) === 23505) {
        throw new BadRequestException('Name or slug already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (product) {
        throw new BadRequestException(`No product found with id ${id}`);
      }

      return await this.productRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
