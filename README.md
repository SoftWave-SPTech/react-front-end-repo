# Lauriano & Leão - Sistema de Gestão Jurídica

Este projeto é um sistema web desenvolvido em **React** com **Vite**, focado na gestão de clientes, advogados, processos e documentos para o escritório Lauriano & Leão Sociedade de Advogados.

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [SwiperJS](https://swiperjs.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [ESLint](https://eslint.org/)

## Estrutura do Projeto

```
src/
  components/         # Componentes reutilizáveis (UI, Menus, Formulários, etc)
  layouts/            # Layouts base para páginas
  pages/              # Páginas principais do sistema
  routes/             # Rotas do React Router
  service/            # Serviços de integração com API
  assets/             # Imagens e ícones
  estilos/            # Arquivos CSS customizados
```

## Funcionalidades

- **Login e Autenticação** (clientes e advogados)
- **Cadastro de Usuários** (cliente físico, cliente jurídico, advogado físico, advogado jurídico)
- **Edição de Perfil** (dados pessoais, foto de perfil)
- **Visualização e Upload de Documentos**
- **Gestão de Processos**
- **Podcast e Catálogo de Vídeos**
- **Menu Lateral Dinâmico** (diferente para cliente e advogado)
- **Página Institucional** com áreas de especialidades e contatos

## Como Rodar o Projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/SoftWave-SPTech/react-front-end-repo.git
   cd react-front-end-repo
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```

4. Acesse em [http://localhost:5173](http://localhost:5173)

## Configuração

- O projeto utiliza variáveis de ambiente para integração com a API backend (ajuste URLs conforme necessário).
- Certifique-se de que o backend esteja rodando em `http://localhost:8080` ou ajuste as URLs nas chamadas do Axios.

## Scripts Disponíveis

- `npm run dev` — Inicia o servidor de desenvolvimento
- `npm run build` — Gera a build de produção
- `npm run lint` — Executa o ESLint

## Observações

- O projeto utiliza autenticação via JWT armazenado no `sessionStorage`.
- Para rodar corretamente, é necessário ter o backend configurado e rodando.
- As imagens e ícones estão na pasta `public/` e `src/assets/`.

## Licença

Este projeto é privado e de uso exclusivo do escritório Lauriano & Leão Sociedade de Advogados.

---

Desenvolvido por Softwave.