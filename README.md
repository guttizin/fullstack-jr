# E-commerce Fullstack

Sistema de e-commerce completo desenvolvido com NestJS (backend) e React (frontend), utilizando PostgreSQL como banco de dados e Docker para containerização.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Docker e Docker Compose instalados
- Node.js 22+ (para desenvolvimento local)
- Git

### Execução com Docker (Recomendado)

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd fullstack-jr
   ```

2. **Execute com Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Acesse as aplicações**
   - **Frontend**: http://localhost:8080
   - **Backend API**: http://localhost:3000
   - **PostgreSQL**: localhost:5432

### Execução Local (Desenvolvimento)

#### Backend

1. **Instale as dependências**
   ```bash
   cd backend
   npm install
   ```

2. **Configure as variáveis de ambiente**
   ```bash
   # Crie um arquivo .env na pasta backend
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=ecommerce
   ```
### **É necessário uma instância local do postgres, com schema ecommerce criado. Tabelas serão criadas automaticamente.**

4. **Execute o backend**
   ```bash
   npm run start:dev
   ```

#### Frontend

1. **Instale as dependências**
   ```bash
   cd frontend
   npm install
   ```

2. **Execute o frontend**
   ```bash
   npm run dev
   ```

3. **Acesse**: http://localhost:5173

## 🏗️ Arquitetura e Decisões Técnicas

### Backend (NestJS)

**Tecnologias escolhidas:**
- **NestJS**: Framework robusto com arquitetura modular, decorators e injeção de dependência
- **TypeORM**: ORM com suporte nativo a TypeScript e PostgreSQL
- **PostgreSQL**: Banco relacional robusto e confiável para e-commerce
- **Class-validator**: Validação de DTOs com decorators
- **Axios**: Cliente HTTP para integrações externas

**Estrutura modular:**
```
src/
├── customers/     # Gestão de clientes
├── orders/        # Gestão de pedidos
├── products/      # Gestão de produtos
└── config/        # Configurações
```

**Decisões arquiteturais:**
- **Synchronize: true** em desenvolvimento para facilitar prototipagem
- **CORS habilitado** para comunicação frontend-backend
- **ValidationPipe global** para validação automática de DTOs
- **Configuração via environment variables** para flexibilidade

### Frontend (React)

**Tecnologias escolhidas:**
- **React 19**: Versão mais recente com melhor performance
- **TypeScript**: Tipagem estática para maior confiabilidade
- **Vite**: Build tool rápido e moderno
- **Tailwind CSS**: Framework CSS utilitário para desenvolvimento ágil
- **React Router DOM**: Roteamento client-side
- **Axios**: Cliente HTTP para APIs
- **React Icons**: Biblioteca de ícones

**Estrutura organizacional:**
```
src/
├── components/    # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── context/       # Context API para estado global
├── types/         # Definições TypeScript
└── config.ts      # Configurações da aplicação
```

**Decisões arquiteturais:**
- **Context API** para gerenciamento de estado (Auth, Cart, UI)
- **Protected Routes** para páginas que requerem autenticação
- **Modal system** para login e interações modais
- **Responsive design** com Tailwind CSS

### Infraestrutura

**Docker Compose:**
- **PostgreSQL 16**: Versão estável e performática
- **Networks isoladas**: Comunicação segura entre containers
- **Volumes persistentes**: Dados do banco preservados
- **Port mapping**: Acesso direto aos serviços

**Decisões de deploy:**
- **Nginx** no frontend para servir arquivos estáticos
- **Multi-stage builds** para otimização de imagens
- **Environment variables** para configuração flexível

## 📋 Funcionalidades

### Backend
- ✅ CRUD de produtos
- ✅ Gestão de clientes
- ✅ Sistema de pedidos
- ✅ Validação de dados
- ✅ Padronização de produtos

### Frontend
- ✅ Catálogo de produtos
- ✅ Carrinho de compras
- ✅ Sistema de login
- ✅ Checkout
- ✅ Histórico de pedidos
- ✅ Interface responsiva

## 🔧 Scripts Úteis

### Backend
```bash
npm run start:dev      # Desenvolvimento com hot reload
npm run build          # Build para produção
npm run test           # Executar testes
npm run migration:run  # Executar migrações
```

### Frontend
```bash
npm run dev            # Desenvolvimento
npm run build          # Build para produção
npm run preview        # Preview do build
npm run lint           # Linting
```

## 🐳 Docker

### Comandos úteis
```bash
# Build e start de todos os serviços
docker-compose up --build

# Executar em background
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Ver logs
docker-compose logs -f [service-name]

# Rebuild de um serviço específico
docker-compose up --build [service-name]
```

## 📝 Variáveis de Ambiente

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ecommerce
PORT=3000
```

### Docker Compose
As variáveis podem ser definidas no arquivo `.env` na raiz do projeto:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ecommerce
```

## 🚀 Próximos Passos

- [ ] Implementar Flutter

## 📄 Licença

MIT License 
