import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeeService {
  findAll(): Coffee[] {
    return [
      {
        name: '아이스 아메리카노1',
        price: 4500,
        kcal: 75,
        fat: 10,
        protein: 1,
        salt: 2,
        sugar: 3,
        caffeine: 4,
      },
      {
        name: '아이스 아메리카노22',
        price: 4500,
        kcal: 75,
        fat: 10,
        protein: 1,
        salt: 2,
        sugar: 3,
        caffeine: 4,
      },
      {
        name: '아이스 아메리카노333',
        price: 4500,
        kcal: 75,
        fat: 10,
        protein: 1,
        salt: 2,
        sugar: 3,
        caffeine: 4,
      },
      {
        name: '아이스 아메리카노4444',
        price: 4500,
        kcal: 75,
        fat: 10,
        protein: 1,
        salt: 2,
        sugar: 3,
        caffeine: 4,
      },
      {
        name: '아이스 아메리카노5555',
        price: 4500,
        kcal: 75,
        fat: 10,
        protein: 1,
        salt: 2,
        sugar: 3,
        caffeine: 4,
      },
    ];
  }

  create(args): string {
    console.log(args);
    return '성공 ';
  }
}
