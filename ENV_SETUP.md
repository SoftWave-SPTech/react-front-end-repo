# 📋 Configuração de Variáveis de Ambiente

Este projeto usa variáveis de ambiente para configurar as URLs das APIs, permitindo diferentes configurações para desenvolvimento e produção.

## 📁 Arquivos de Ambiente

### `.env` (Desenvolvimento Local)
- **Não versionado** (já está no `.gitignore`)
- Usado durante `npm run dev`
- Contém URLs para serviços rodando em `localhost`

### `.env.production` (Produção)
- **Pode ser versionado** (valores de exemplo)
- Usado durante `npm run build`
- Deve ser atualizado com o IP Elastic do NGINX antes do build de produção

### `.env.example` (Template)
- **Versionado** - Template para outros desenvolvedores
- Copie para `.env` e ajuste os valores conforme necessário

## 🔧 Variáveis Disponíveis

| Variável | Descrição | Exemplo (Dev) | Exemplo (Prod) |
|----------|-----------|---------------|-----------------|
| `VITE_API_BASE_URL` | URL base da API principal | `http://localhost:8080` | `http://54.123.45.67` |
| `VITE_API_GEMINI_URL` | URL do microserviço Gemini | `http://localhost:8082` | `http://54.123.45.67/api/gemini` |
| `VITE_API_CONSULTAS_URL` | URL do microserviço Consultas | `http://localhost:8084` | `http://54.123.45.67/api/consultas` |
| `VITE_API_AUTH_URL` | URL do microserviço Auth | `http://localhost:8083` | `http://54.123.45.67/api/auth` |
| `VITE_FILE_BASE_URL` | URL base para documentos/arquivos | `http://localhost:8080` | `http://54.123.45.67` |

## 🚀 Como Usar

### Desenvolvimento

1. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```

2. O arquivo `.env` já está configurado para desenvolvimento local.

3. Execute o projeto:
   ```bash
   npm run dev
   ```

### Produção

1. Antes do build, atualize o `.env.production` com o IP Elastic do NGINX:
   ```env
   VITE_API_BASE_URL=http://SEU_IP_ELASTIC_AQUI
   VITE_API_GEMINI_URL=http://SEU_IP_ELASTIC_AQUI/api/gemini
   VITE_API_CONSULTAS_URL=http://SEU_IP_ELASTIC_AQUI/api/consultas
   VITE_API_AUTH_URL=http://SEU_IP_ELASTIC_AQUI/api/auth
   VITE_FILE_BASE_URL=http://SEU_IP_ELASTIC_AQUI
   ```

2. Execute o build:
   ```bash
   npm run build
   ```

3. Os valores são **embutidos** no código durante o build. Após o build, as variáveis não podem ser alteradas sem rebuild.

## ⚠️ Importante

- No Vite, variáveis de ambiente devem começar com `VITE_` para serem expostas ao código cliente
- Variáveis são substituídas em **tempo de build**, não em runtime
- Para mudar URLs após o build, é necessário fazer um novo build com novos valores
- Nunca commite arquivos `.env` com valores reais de produção no Git

## 🔍 Verificar Variáveis

Você pode verificar quais variáveis estão sendo usadas adicionando:

```javascript
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
```

## 📝 Exemplo de Uso no Código

```javascript
// ✅ Correto - Usando variável de ambiente
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
axios.get(`${API_URL}/api/endpoint`);

// ❌ Errado - URL hardcoded
axios.get('http://localhost:8080/api/endpoint');
```

