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

    //TODO : for?????? map??? Promise.all??? ?????????
    //productTags => ['#?????????','#?????????'...]
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
      throw new UnprocessableEntityException('?????? ?????? ????????? ???????????????.');
  }

  async delete({ productId }) {
    // 1. ?????? ??????
    const result = await this.productRepository.delete({ id: productId });
    return result.affected ? true : false;
    //2. ????????? ??????(????????????) - 1
    // this.productRepository.update({ id: productId }, { isDeleted: true });
    //3. ????????? ??????(????????????) - 2
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });
    //4. ????????? ??????(typeORM ??????) -1
    // this.productRepository.softRemove({ id: productId }) //id?????? ?????? ??????
    //5. ????????? ??????(typeORM ??????) -2
    // const result = await this.productRepository.softDelete({ id: productId }); //????????? criteria??? ????????????
    // return result.affected ? true : false;
  }
}
