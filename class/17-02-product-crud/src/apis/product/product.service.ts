import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne({ productId }: { productId: string }) {
    return await this.productRepository.findOne({ id: productId });
  }

  async create({ createProductInput }: ICreate) {
    try {
      await this.productRepository.save({
        ...createProductInput, //spread operator
      });
      console.log('Hi');
      console.log('Hi');
      console.log('Hi');
    } catch (error) {
      throw error;
    }
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
    // throw new HttpException(
    //   '이미 판매 완료된 상품입니다.',
    //   HttpStatus.UNPROCESSABLE_ENTITY,
    // );
  }
}
