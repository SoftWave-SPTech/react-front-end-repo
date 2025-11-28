# Frontend SoftWave - Sistema de Gestão Jurídica

Sistema web desenvolvido em React com Vite para gestão jurídica completa, incluindo clientes, advogados, processos e documentos.

## Tecnologias Utilizadas

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### Dependências Principais

- **React 19.0.0** - Framework JavaScript para interfaces
- **Vite 6.2.0** - Build tool e dev server
- **React Router DOM 7.5.1** - Roteamento SPA
- **Axios 1.9.0** - Cliente HTTP para API
- **TailwindCSS 3.4.17** - Framework CSS utilitário
- **React Bootstrap 2.10.9** - Componentes UI
- **React Hook Form 7.56.1** - Gerenciamento de formulários
- **Chart.js & Recharts** - Gráficos e visualizações
- **JWT Decode 4.0.0** - Manipulação de tokens JWT

## Requisitos do Sistema

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 ou **yarn** >= 1.22.0

## Instalação e Configuração

### 1. Clone o Repositório

```bash
git clone https://github.com/SoftWave-SPTech/react-front-end-repo.git
cd react-front-end-repo
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_AUTH_API_URL=http://localhost:8083
VITE_S3_API_URL=http://localhost:8091
VITE_GEMINI_API_URL=http://localhost:8092
VITE_CONSULTAS_API_URL=http://localhost:8084
```

### 4. Executar em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: http://localhost:5173

### 5. Build para Produção

```bash
npm run build
npm run preview
```

## Estrutura do Projeto

```
src/
├── components/         # Componentes reutilizáveis
│   ├── UI/            # Componentes de interface
│   ├── Forms/         # Formulários
│   └── Layout/        # Componentes de layout
├── pages/             # Páginas da aplicação
│   ├── Auth/          # Login, cadastro
│   ├── Dashboard/     # Painéis administrativos
│   ├── Cliente/       # Área do cliente
│   └── Advogado/      # Área do advogado
├── layouts/           # Layouts base
├── routes/            # Configuração de rotas
├── service/           # Serviços de API
├── provider/          # Context providers
├── Utils/             # Utilitários
├── assets/            # Recursos estáticos
└── Estilos/          # Estilos CSS customizados
```

## Funcionalidades

### Área Pública
- Página institucional
- Contato e informações
- Áreas de especialidade

### Sistema de Autenticação
- Login diferenciado (cliente/advogado)
- Cadastro de usuários (pessoa física/jurídica)
- Recuperação de senha
- Autenticação JWT

### Área do Cliente
- Dashboard personalizado
- Visualização de processos
- Upload e gerenciamento de documentos
- Comunicação com advogados

### Área do Advogado
- Dashboard administrativo
- Gestão completa de clientes
- Gerenciamento de processos
- Sistema de documentos
- Relatórios e métricas

### Recursos Avançados
- Integração com IA (Gemini)
- Sistema de consultas jurídicas
- Gráficos e dashboards
- Upload de arquivos
- Acessibilidade (VLibras)

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

## Configuração do Backend

Certifique-se de que os seguintes serviços estejam rodando:

- **Backend Principal**: http://localhost:8080
- **Auth Service**: http://localhost:8083
- **S3 Service**: http://localhost:8091
- **Gemini Service**: http://localhost:8092
- **Consultas Service**: http://localhost:8084

## Troubleshooting

### Problemas Comuns

1. **Erro de CORS**: Verifique se o backend está configurado para aceitar requisições do frontend
2. **Falha na autenticação**: Confirme se o Auth Service está rodando
3. **Erro de dependências**: Execute `npm install` novamente
4. **Porta ocupada**: Altere a porta no `vite.config.js`

### Logs de Desenvolvimento

Para debug detalhado, ative os logs no console do navegador e verifique a aba Network para requisições HTTP.

## Contribuição

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto é propriedade da SoftWave SPTech e destina-se ao uso exclusivo do escritório Lauriano & Leão Sociedade de Advogados.

---

**Desenvolvido por:** SoftWave SPTech  
**Versão:** 0.0.0  
**Data:** 2025