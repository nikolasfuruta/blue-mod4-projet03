# Blue Projeto 03 Módulo - 4

#### API de controle de Tweets

### Este projeto é uma API para controle de uma rede social, foi desenvolvida utilizando NestJS com integração com um banco de dados PostgreSQL através do Prisma e autenticação via JWT.

## INICIANDO

### Para iniciar o projeto, primeiro foi instalado o NestJS.

```
npm i -g @nestjs/cli
```

### Em seguida iniciado um novo projeto.

```
nest new [nome do projeto]
```

### Após a criação do diretório principal, que consideraremos como o ROOT, foi instalado as seguintes dependências.

```
npm i prisma -D / npm i @prisma/client
```

### Agora iniciamos a biblioteca do prisma para configurá-la
```
npx prisma init
```

### Com isso, é gerado o diretório 'prisma' com o arquivo 'schema.prisma' e o arquivo '.env' no root do projeto.

### No arquivo '.env', configuramos a string de conexão com o banco de dados e no 'schema.prisma' definimos os Models que serão sincronizados com o banco de dados.

### Ao terminar toda a configuração da estrutura do banco de dados, enviamos os dados para sincronizar com o banco de dados com os seguintes comandos.

```
npx prisma db push
```

## Criando o diretório Prisma dentro do diretório src

### Antes de criar as rotas, precisamos criar um diretório prisma contendo um arquivo 'module' e 'service' para podemos interagir com o banco de dados.

```
nest g mo prisma
nest g s prisma
```

### No arquivo 'module', adicionamos às configurações já existentes

```
exports: [PrismaService],
```

### No arquivo 'service', definimos um script padrão obtida através do próprio site do NestJS

```
https://docs.nestjs.com/recipes/prisma
```

## Criando as Rotas BASE

### Para criar as rotas, dividimos cada uma em um diretório. Cada diretório será composto por um arquivo 'module', 'controller' e 'service'.

### Assim, primeiro criamos o diretório com o comando

```
nest g res [nome do diretório]
```

### Com isso, o NestJS automaticamente criará os arquivos que necessários.

### No arquivo 'module', adicionamos às configurações existentes o 'imports: [PrismaModule]' para que consigamos integrar o banco com a rota.

### No arquivo 'service', instanciamos o PrismaService dentro da classe

```
contructor(private readonly prisma:PrismaService) {}
```

### Agora basta 'chamar' o this.prisma para manipular o banco

## Definindo o DTO

### Antes de iniciar o CRUD, devemos configurar a classe DTO.

### Primeiro devemos instalar as dependências de validações do NestJS

```
npm i npm i --save class-validator class-transformer
```

### Agora basta adicionar no arquivo main, após definir app, o seguinte script

```
app.useGlobalPipes(new ValidationPipe())
```

### Voltando na classe CreateDto utilizaremos o próprio 'tipo' gerado pelo Prisma atráves do Model, assim definiremos a classe como uma implementação desse tipo.

```
class CreateDto implements Prisma.[Tipo Prisma] {}
```

### Com isso podemos utilizar as várias validações que o NestJS nos fornece bastando acrescentar um Decorator nas propriedades da classe.

```
class CreateDto implements Prisma.[Tipo Prisma] {
	@IsString()
	nome: string
}
```

## CRUD

### É importante notar que todas as rotas CRUD só podem ser realizadas se o usuário estiver autorizado, com exceção da criação do usuário.
### O passo a passo de como fazer a autenticação será descrito mais adiante. 

# USUARIOS(/usuarios)
Dentro desta rota é possível:
- Criação de um novo usuário utilizando o verbo [POST] e enviando os dados do usuário seguindo esse padrão em formato JSON:
```
  {
    "nome": string,
    "senha": string,
    "imagem": string,
    "bio": string,
    "nascimento": string | Date,
  }
```
- Listar todos os usuários utilizando o verbo [GET].
- Listar um usuário utilizando o verbo [GET] e o [id] do usuário na rota (usuarios/id).
- Atualizar um usuário utilizando o verbo [PATCH], o [id] do usuário na rota (usuarios/id) e enviando os dados atualizados do usuário seguindo esse padrão em formato JSON:
```
  {
    "nome": string,
    "senha": string,
    "imagem": string,
    "bio": string,
    "nascimento": string | Date,
  }
```
- Apagar um usuário utilizando o verbo [DELETE] e o [id] do usuário na rota (usuarios/id).

# SEGUIDORES(/seguidores)
Dentro desta rota é possível:
- Criação de um novo seguidor utilizando o verbo [POST] e enviando os dados do seguidor seguindo esse padrão em formato JSON:
```
  {
    "idSeguidor": number  
  }
```
- Listar todos os seguidores utilizando o verbo [GET].
- Listar um seguidor utilizando o verbo [GET] e o [id] do seguidor na rota (seguidores/id).
- Atualizar um seguidor utilizando o verbo [PATCH], o [id] do seguidor na rota (seguidores/id) e enviando os dados atualizados do seguidor seguindo esse padrão em formato JSON:
```
  {
    "idSeguidor": number  
  }
```
- Apagar um seguidor utilizando o verbo [DELETE] e o [id] do seguidor na rota (seguidores/id).

# SEGUINDO(/seguindo)
Dentro desta rota é possível:
- Criação de uma nova pessoa seguida utilizando o verbo [POST] e enviando os dados do pessoa seguindo esse padrão em formato JSON:
```
  {
    "idSeguindo": number
  }
```
- Listar todos as pessoas que são seguidas utilizando o verbo [GET].
- Listar uma pessoa seguida utilizando o verbo [GET] e o [id] da pessoa na rota (seguindo/id).
- Atualizar uma pessoa seguida utilizando o verbo [PATCH], o [id] da pessoa na rota (seguindo/id) e enviando os dados atualizados da pessoa seguida seguindo esse padrão em formato JSON:
```
  {
    "idSeguindo": number
  }
```
- Apagar uma pessoa seguida utilizando o verbo [DELETE] e o [id] da pessoa seguida na rota (seguindo/id).

# TWEETS(/tweets)
Dentro desta rota é possível:
- Criação de um novo tweet utilizando o verbo [POST] e enviando o tweet seguindo esse padrão em formato JSON:
```
  {
    "texto": string,
    "emoji": string,
    "curtidas": number,
    "usuarioId": number
  }
```
- Listar todos os tweets utilizando o verbo [GET].
- Listar um tweet utilizando o verbo [GET] e o [id] do tweet na rota (tweets/id).
- Atualizar um tweet utilizando o verbo [PATCH], o [id] do tweet na rota (tweets/id) e enviando o tweet atualizado seguindo esse padrão em formato JSON:
```
  {
    "texto": string,
    "emoji": string,
    "curtidas": number,
    "usuarioId": number
  }
```
- Apagar um tweet utilizando o verbo [DELETE] e o [id] do tweet na rota (tweets/id).

# CATEGORIA(/categoria)
Dentro desta rota é possível:
- Criação de uma nova categoria utilizando o verbo [POST] e enviando a categoria seguindo esse padrão em formato JSON:
```
  {
    "nome": string
  }
```
- Listar todos as categorias utilizando o verbo [GET].
- Listar uma categoria utilizando o verbo [GET] e o [id] da categoria na rota (categoria/id).
- Atualizar uma categoria utilizando o verbo [PATCH], o [id] da categoria na rota (categoria/id) e enviando a categoria atualizada seguindo esse padrão em formato JSON:
```
  {
    "nome": string
  }
```
- Apagar uma categoria utilizando o verbo [DELETE] e o [id] da categoria na rota (categoria/id).

# AUTH(/auth)
Dentro dessa rota é possível:
- Requisitar um token utilizando o verbo [POST] e enviando os dados do usuário seguindo esse padrão em formato JSON:
```
  {
    "nome":  string,
    "senha": string
  }
```
- Realizar a autenticação do token recebido utilizando o verbo [GET] e enviando o token no campo de autorização.


### Com isso conclui-se todo o processo do CRUD

## Autenticação

### Primeiro, para o processo de autenticação, instalamos as dependências necessárias
```
npm i passport @nestjs/passport passport-local @nestjs/jwt passport-jwt
```
```
npm install --save-dev @types/passport-local @types/passport-jwt
```
### Agora criamos um diretório auth com:
```
nest g res auth
```
### Com isso é gerado os arquivos 'module', 'controller' e 'service' do auth
### No 'module', configuramos da seguinte maneira:
```
@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    PassportModule.register(
      {
        defaultStrategy: "jwt",
        property:"usuario",
        session: false,
      }
    ),
    JwtModule.register(
      {
        secret: process.env.SECRETKEY,
        signOptions: { 
          expiresIn: process.env.EXPIRESIN
        },
      }
    ),
  ],
  controllers: [AuthController],
  providers: [UsuarioService, AuthService, JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
```
### Para o 'controller', criamos uma rota para efetuar o login
```
@Post()
async login(@Body() info: LoginDto) {
    return this.authService.login(info);
  }
```
### Antes de proseguirmos para o 'service', configuraremos os arquivos LoginDto e o Jwt.Strategy.ts.
### Assim, dentro do diretório auth, criamos um sub-diretório 'dto' com o arquivo LoginDto
```
export class LoginDto{
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    senha: string;
}
```
Para a configuração do jwt.strategy
```
export interface JwtPayLoad {
    nome: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRETKEY,
        })
    }

    validate(payLoad: JwtPayLoad) {
        return payLoad;
    }
}
```
### Agora configuramos o 'service'
```
@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) {}

    async login(info: LoginDto) {
        const usuario = await this.usuarioService.findByNome(info.nome);
        if(!usuario) {
            throw new HttpException("USUARIO NÃO ENCONTRADO", HttpStatus.NOT_FOUND);
        }

        const senhaValida = await bcrypt.compare(info.senha, usuario.senha);
        if(!senhaValida) {
            throw new HttpException("SENHA INVÁLIDA", HttpStatus.UNAUTHORIZED);
        }

        const token = this._createToken(usuario);
        return { nome: usuario.nome, ...token }
    }

    private _createToken({ nome }: LoginDto) {
        const payLoad: JwtPayLoad = { nome }
        const accessToken = this.jwtService.sign(payLoad);
        return {
            expiresIn: process.env.EXPIRESIN,
            accessToken
        }
    }
}
```
### Feito isso, ao logar, o usuário receberá um token de validação que continuará válido por 5 minutos.
