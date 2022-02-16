import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  findAll(): Board[] {
    return [
      {
        number: 1,
        writer: 'writer',
        title: 'title',
        contents: 'contents',
      },
      {
        number: 2,
        writer: 'writer2',
        title: 'title2',
        contents: 'contents2',
      },
    ];
  }

  create(args): string {
    console.log(args);
    return '성공';
  }
}
