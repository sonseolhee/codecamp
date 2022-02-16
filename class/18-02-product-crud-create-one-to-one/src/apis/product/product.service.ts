import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productSaleslocation/entities/productSaleslocation.entity';
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
    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRespository: Repository<ProductSaleslocation>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation'],
    });
  }

  async findOne({ productId }: { productId: string }) {
    return await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation'],
    });
  }

  async create({ createProductInput }: ICreate) {
    //1. 상품만 등록하는 경우 (앞전 파일 참고)
    //2. 상품과 상품거래위치 테이블 연결 등록
    console.log(createProductInput);

    /* 하나하나 분해하기
    const product = {
      name: createProductInput.name,
      description: createProductInput.description,
      price: createProductInput.price,
    };
    const productSaleslocation = createProductInput.productSaleslocation;
    */

    // rest 파라미터 분해
    const { productSaleslocation, ...product } = createProductInput;
    const result = await this.productSaleslocationRespository.save({
      ...productSaleslocation,
    });
    return await this.productRepository.save({
      ...product,
      // productSaleslocation: {id: result.id}
      productSaleslocation: result,
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
    //1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //2. 소프트 삭제(직접구현) - 1
    // this.productRepository.update({ id: productId }, { isDeleted: true });
    //3. 소프트 삭제(직접구현) - 2
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });
    //4. 소프트 삭제(typeORM 제공) -1
    // this.productRepository.softRemove({ id: productId }) //id로만 삭제 가능
    //5. 소프트 삭제(typeORM 제공) -2
    const result = await this.productRepository.softDelete({ id: productId }); //다양한 criteria로 삭제가능
    return result.affected ? true : false;
  }
}
