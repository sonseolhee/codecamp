import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create({ name }) {
    //카테고리 데이터 베이스에 저장 => insert into [,,] values [,,]
    return await this.productCategoryRepository.save({ name });
  }

  async delete({ productCategoryId }) {
    const result = await this.productCategoryRepository.delete({
      id: productCategoryId,
    });

    console.log(result);

    return result;
  }
}
 