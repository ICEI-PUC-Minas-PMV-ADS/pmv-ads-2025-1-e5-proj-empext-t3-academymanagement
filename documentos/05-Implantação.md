## Implantação do Software

### 1. Planejamento da Implantação

**Ambientes**

- **Desenvolvimento**:

  - Branches GitHub: `main` (produção), `develop` (pré-produção), feature branches.
  - Pipeline de CI/CD no GitHub Actions executando lint, testes unitários/integrados e build.

- **Homologação**:

  - Deploy automático da branch `develop` na Vercel Preview Environment (Front-end) e em ambiente de staging no Render (Back-end + PostgreSQL).
  - Testes de API (via Postman/Newman) e smoke tests automatizados.

- **Produção**:

  - Deploy automático da branch `main`:

    - **Front-end**: Next.js na Vercel, configurado com Environment Variables para apontar à API de produção.
    - **Back-end**: Node.js na Render, em contêiner Docker, escalonamento automático de réplicas conforme carga.
    - **Banco de Dados**: PostgreSQL gerenciado pela Render, com backups diários automáticos e políticas de retenção (7 dias).

**Processo de Implantação**

1. **Merge & Build**

   - Pull request aprovado → merge em `main` → GitHub Actions dispara workflow.

2. **Testes & Lint**

   - Linting (ESLint/Prettier), testes unitários (Jest, Testing Library), testes de integração (Supertest).

3. **Deploy**

   - Se CI verde, Vercel e Render recebem webhook e realizam o deploy automatizado.

4. **Verificação pós-deploy**

   - Health check da API (endpoint `/health`), testes end-to-end básicos (Cypress) em produção.

5. **Monitoramento**

   - Logs centralizados no Logflare (Front-end) e Papertrail (Back-end).
   - Métricas de performance via Sentry + Grafana (latência, erros 5xx, uso de CPU/memória).

### 2. Link da Aplicação em Ambiente de Produção

- **Front-end (Next.js / Vercel)**: [https://faculdade-front-end.vercel.app/](https://faculdade-front-end.vercel.app/)
- **Back-end (Node.js / Render)**: `https://api.academymanagement.app` (exemplo)

### 3. Planejamento de Evolução da Aplicação

**Curto Prazo (próximos 3 meses)**

- **Autenticação avançada**: integrações OAuth (Google, Facebook) e MFA.
- **Notificações em tempo real**: WebSocket/Socket.io para atualização instantânea de presença e alertas de pagamento.
- **Testes de carga**: simulações com k6 para dimensionar escalabilidade do back-end.

**Médio Prazo (3–6 meses)**

- **Dashboard gerencial**: relatórios customizáveis (Power BI embedding ou Recharts) para acompanhamento financeiro e tendência de frequência.
- **Aplicativo Mobile**: lançamento de PWA ou React Native para que alunos registrem presença e visualizem planos de treino.
- **CI/CD avançado**: canary releases e deploys blue-green para zero downtime.

**Longo Prazo (6–12 meses)**

- **Arquitetura modular**: migração de partes críticas para microsserviços (ex.: serviço de pagamentos, serviço de relatórios).
- **Machine Learning**: análise preditiva de inadimplência e churn rate, recomendando ações de retenção.
- **Multi-tenant**: suporte a várias academias em um único deploy, com isolamento de dados por tenant.
