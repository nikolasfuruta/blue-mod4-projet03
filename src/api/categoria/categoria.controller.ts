/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBody, ApiCreatedResponse, ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'CRIAÇÃO DE CATEGORIAS' })
  @ApiBody({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        nome: { example: "HUMOR" }
      }
    },
  })
  @ApiCreatedResponse({description: 'EXECUTADO COM SUCESSO'})
  @ApiBadRequestResponse({ description: 'NÃO ADICIONADO' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'LISTA TODOS AS CATEGORIAS' })
  @ApiOkResponse({
    description: 'EXECUTADO COM SUCESSO',
    schema: {
      properties: {
        id: { example: 2 },
        nome: { example:"sabrina" },
        senha: { example: "$2b$12$c.J79Hj9pBJScpgt8ffvMOqo5BMRHh0ukrATlSwWimLU3a7Nflzqe" },
        imagem: { example: "sabrina.jpeg" },
        bio: { example: "designer" },
        nascimento: { example: "1996-04-17T03:00:00.000Z" },
        criado_em: { example: "2021-12-20T04:10:37.244Z" },
        modificado_em: { example: "2021-12-20T04:10:37.244Z" },
        seguidores: { example:[] },
        seguindo: { example:[] },
        tweet: { example:[] },
      }
    }
  })
  @ApiNotFoundResponse({ description: 'NÃO EXECUTADO' })
  findAll() {
    return this.categoriaService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}
