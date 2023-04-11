import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { v4 as uuidv4 } from 'uuid';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`criando/atualizando jogador ${criarJogadorDto}`);

    const { email } = criarJogadorDto;
    const jogadorEncontrado = this.jogadores.find((jogador) => {
      return jogador.email === email;
    });

    if (jogadorEncontrado) {
      this.atualizar(jogadorEncontrado, criarJogadorDto);
    } else {
      this.criar(criarJogadorDto);
    }
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, email, telefoneCelular } = criarJogadorDto;
    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      email,
      telefoneCelular,
      ranking: 'A',
      posicaoRanking: 1,
      urlFotoJogador: 'https://google.com.br/foto123.png',
    };
    this.jogadores.push(jogador);
  }

  async consultarJogadores(): Promise<Jogador[]> {
    return this.jogadores;
  }

  async consultarJogadorPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadores.find((jogador) => {
      return jogador.email === email;
    });

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogadorPorEmail(email: string): Promise<void> {
    const jogadorEncontrado = this.jogadores.find((jogador) => {
      return jogador.email === email;
    });
    if (!jogadorEncontrado)
      throw new NotFoundException(`Jogador com email ${email} não encontrado`);
    this.jogadores = this.jogadores.filter((jogador) => {
      return jogador.email !== jogadorEncontrado.email;
    });
  }
}
