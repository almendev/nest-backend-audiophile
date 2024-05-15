import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    try {
      const doesExist = await this.categoryRepository.findOneBy({ name });

      if (doesExist) {
        throw new BadRequestException(
          `Category ${createCategoryDto.name} already exists`,
        );
      }

      const newCategory = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) {
        throw new BadRequestException(`No category found with id ${id}`);
      }

      return category;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) {
        throw new BadRequestException(`No category found with id ${id}`);
      }

      this.categoryRepository.merge(category, updateCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      if (Number(error.code) === 23505) {
        throw new BadRequestException(
          `Category ${updateCategoryDto.name} already exists`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findOneBy({ id });

      if (!category) {
        throw new BadRequestException(`No category found with id ${id}`);
      }

      return await this.categoryRepository.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }
}
