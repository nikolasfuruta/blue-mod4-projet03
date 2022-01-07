import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto
  implements Prisma.CategoriaUncheckedCreateInput
{
    id?: number;

    @IsString()
    @IsNotEmpty()
    nome: string;
}