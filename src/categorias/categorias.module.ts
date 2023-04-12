import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CategoriaSchema } from './interface/categoria.schema';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService],
})
export class CategoriasModule {}
