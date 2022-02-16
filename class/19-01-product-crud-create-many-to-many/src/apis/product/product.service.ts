import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../productCategory/entities/productCategory.entity';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productTag/entities/productTag.entity';
import { CreateProductInput } from './dto/creatProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';

interface ICreate {
  createProductInput: CreateProductInput;
}

interface IUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRespository: Repository<ProductSaleslocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async findOne({ productId }: { productId: string }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }: ICreate) {
    console.log(createProductInput);

    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    const result1 = await this.productSaleslocationRespository.save({
      ...productSaleslocation,
    });

    const result2 = await this.productCategoryRepository.findOne({
      id: productCategoryId,
    });

    //TODO : for문을 map과 Promise.all로 최적화
    //productTags => ['#영등포','#컴퓨터'...]
    const result3 = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      const prevTag = await this.productTagRepository.findOne({
        name: tagname,
      });

      if (prevTag) {
        result3.push(prevTag);
      } else {
        const newTag = await this.productTagRepository.save({ name: tagname });
        result3.push(newTag);
      }
    }

    return await this.productRepository.save({
      ...product,
      productSaleslocation: result1,
      productCategory: result2,
      productTags: result3,
    });
  }

  async update({ productId, updateProductInput }: IUpdate) {
    const product = await this.productRepository.findOne({ id: productId });
    const newProduct = {
      ...product,
      ...updateProductInput,
    };
    return await this.productRepository.save(newProduct);
    // this.productRepository.update({ id: productId}, {...updateProductInput})
  }

  async checkSoldOut({ productId }: { productId: string }) {
    const product = await this.productRepository.findOne({ id: productId });
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
  }

  async delete({ productId }) {
    // 1. 진짜 삭제
    const result = await this.productRepository.delete({ id: productId });
    return result.affected ? true : false;
    //2. 소프트 삭제(직접구현) - 1
    // this.productRepository.update({ id: productId }, { isDeleted: true });
    //3. 소프트 삭제(직접구현) - 2
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });
    //4. 소프트 삭제(typeORM 제공) -1
    // this.productRepository.softRemove({ id: productId }) //id로만 삭제 가능
    //5. 소프트 삭제(typeORM 제공) -2
    // const result = await this.productRepository.softDelete({ id: productId }); //다양한 criteria로 삭제가능
    // return result.affected ? true : false;
  }
}
