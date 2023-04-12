import { Categoria } from './interface/categoria.interface';
import { CriarCategoriaDto } from './dto/criar-categoria.dto';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  async criarCategoria(
    criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;
    const categoriaEncontrada = await this.categoriaModel
      .findOne({ categoria })
      .exec();

    if (categoriaEncontrada)
      throw new BadRequestException(
        `A categoria ${categoria} já foi cadastrada`,
      );

    return new this.categoriaModel(criarCategoriaDto).save();
  }
}
