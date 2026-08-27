># CRM Simples

Um sistema CRM (Customer Relationship Management) simples e funcional com interface moderna, desenvolvido com Node.js, Express e SQLite.

## 🎯 Funcionalidades

### Gerenciamento de Clientes
- ✅ Criar novo cliente
- ✅ Listar todos os clientes
- ✅ Editar informações de cliente
- ✅ Deletar cliente
- ✅ Buscar cliente por nome, email, etc.
- ✅ Definir status (ativo/inativo)

### Gerenciamento de Oportunidades
- ✅ Criar nova oportunidade de venda
- ✅ Associar oportunidade a cliente
- ✅ Definir valor e status da oportunidade
- ✅ Editar oportunidade
- ✅ Deletar oportunidade
- ✅ Rastrear data de fechamento

### Gerenciamento de Atividades
- ✅ Registrar atividades (email, telefone, reunião, etc.)
- ✅ Associar atividade a cliente
- ✅ Histórico de atividades por cliente
- ✅ Deletar atividade

## 🛠️ Stack Tecnológico

- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite3
- **Frontend**: HTML5 + CSS3 + JavaScript Vanilla
- **Middleware**: Body-parser, CORS

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/davidheiligbiz-ux/crmteste2.git
   cd crmteste2
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor**
   ```bash
   npm start
   ```

4. **Acesse a aplicação**
   Abra seu navegador e acesse: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
crmteste2/
├── server.js              # Arquivo principal do servidor Express
├── database.js            # Configuração e operações do banco de dados
├── package.json           # Dependências do projeto
├── public/
│   ├── index.html         # Interface principal
│   ├── style.css          # Estilos da aplicação
│   ├── app.js             # Lógica da aplicação (frontend)
│   └── api.js             # Cliente HTTP para APIs
├── crm.db                 # Banco de dados SQLite (criado automaticamente)
└── README.md              # Este arquivo
```

## 🔌 API REST

### Clientes

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/clientes` | Listar todos os clientes |
| GET | `/api/clientes/:id` | Obter cliente específico |
| POST | `/api/clientes` | Criar novo cliente |
| PUT | `/api/clientes/:id` | Atualizar cliente |
| DELETE | `/api/clientes/:id` | Deletar cliente |

### Oportunidades

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/oportunidades` | Listar todas as oportunidades |
| POST | `/api/oportunidades` | Criar nova oportunidade |
| PUT | `/api/oportunidades/:id` | Atualizar oportunidade |
| DELETE | `/api/oportunidades/:id` | Deletar oportunidade |

### Atividades

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/atividades` | Listar todas as atividades |
| POST | `/api/atividades` | Criar nova atividade |
| DELETE | `/api/atividades/:id` | Deletar atividade |

## 📝 Exemplos de Uso

### Criar Cliente
```bash
curl -X POST http://localhost:3000/api/clientes \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "(11) 99999-9999",
    "empresa": "Tech Company",
    "status": "ativo"
  }'
```

### Criar Oportunidade
```bash
curl -X POST http://localhost:3000/api/oportunidades \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_id": 1,
    "titulo": "Venda de Solução Completa",
    "valor": 15000.00,
    "status": "aberta",
    "data_fechamento": "2024-12-31"
  }'
```

### Criar Atividade
```bash
curl -X POST http://localhost:3000/api/atividades \
  -H "Content-Type: application/json" \
  -d '{
    "cliente_id": 1,
    "tipo": "Reunião",
    "descricao": "Reunião de apresentação da solução",
    "data_atividade": "2024-09-15T14:30:00"
  }'
```

## 🎨 Design & UI

- Interface responsiva e moderna
- Paleta de cores profissional (azul e roxo)
- Menu lateral de navegação
- Modal para criar/editar registros
- Tabelas com busca integrada
- Status badges com cores distintas

## 🔒 Segurança (Considerar para produção)

- ⚠️ Validação de entrada no backend
- ⚠️ Adicionar autenticação e autorização
- ⚠️ Implementar rate limiting
- ⚠️ Usar HTTPS
- ⚠️ Adicionar proteção contra SQL injection
- ⚠️ Validação de CORS

## 📚 Desenvolvimentos Futuros

- [ ] Autenticação de usuários
- [ ] Dashboard com estatísticas
- [ ] Relatórios em PDF
- [ ] Exportação de dados (Excel, CSV)
- [ ] Notificações e lembretes
- [ ] Sistema de permissões
- [ ] Integração com email
- [ ] Backup automático
- [ ] Filtros avançados
- [ ] Sistema de tags

## 📞 Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.

## 📄 Licença

ISC

---

**Desenvolvido com ❤️ - CRM Simples v1.0.0**
