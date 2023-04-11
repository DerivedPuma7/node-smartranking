import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async atualizarJogadorPorId(
    id: string,
    atualizarJogadorDto: AtualizarJogadorDto,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({ _id: id })
      .exec();

    if (!jogadorEncontrado)
      throw new NotFoundException(`Jogador com id: ${id} não encontrado`);

    await this.jogadorModel
      .findOneAndUpdate(
        {
          _id: id,
        },
        { $set: atualizarJogadorDto },
      )
      .exec();
  }

  async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({ email: criarJogadorDto.email })
      .exec();

    if (jogadorEncontrado) {
      console.log('entrei');
      throw new BadRequestException('Jogador com email já cadastrado');
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadorPorId(id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel
      .findOne({ _id: id })
      .exec();

    if (!jogadorEncontrado)
      throw new NotFoundException(`Jogador com id ${id} não encontrado`);

    return jogadorEncontrado;
  }

  async deletarJogadorPorId(id: string): Promise<void> {
    await this.jogadorModel.findOneAndRemove({ _id: id }).exec();
  }
}
