const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Inicializar banco de dados
db.init();

// ===== ROTAS DE CLIENTES =====

// GET todos os clientes
app.get('/api/clientes', (req, res) => {
  db.getAllClientes((err, clientes) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar clientes' });
    }
    res.json(clientes);
  });
});

// GET cliente por ID
app.get('/api/clientes/:id', (req, res) => {
  db.getClienteById(req.params.id, (err, cliente) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar cliente' });
    }
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    res.json(cliente);
  });
});

// POST criar novo cliente
app.post('/api/clientes', (req, res) => {
  const { nome, email, telefone, empresa, status } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ error: 'Nome e email são obrigatórios' });
  }

  db.createCliente({ nome, email, telefone, empresa, status }, (err, clienteId) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar cliente' });
    }
    res.status(201).json({ id: clienteId, nome, email, telefone, empresa, status });
  });
});

// PUT atualizar cliente
app.put('/api/clientes/:id', (req, res) => {
  const { nome, email, telefone, empresa, status } = req.body;

  db.updateCliente(req.params.id, { nome, email, telefone, empresa, status }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar cliente' });
    }
    res.json({ id: req.params.id, nome, email, telefone, empresa, status });
  });
});

// DELETE cliente
app.delete('/api/clientes/:id', (req, res) => {
  db.deleteCliente(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
    res.json({ message: 'Cliente deletado com sucesso' });
  });
});

// ===== ROTAS DE OPORTUNIDADES =====

// GET todas as oportunidades
app.get('/api/oportunidades', (req, res) => {
  db.getAllOportunidades((err, oportunidades) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar oportunidades' });
    }
    res.json(oportunidades);
  });
});

// POST criar nova oportunidade
app.post('/api/oportunidades', (req, res) => {
  const { cliente_id, titulo, valor, status, data_fechamento } = req.body;

  if (!cliente_id || !titulo || !valor) {
    return res.status(400).json({ error: 'Cliente, título e valor são obrigatórios' });
  }

  db.createOportunidade({ cliente_id, titulo, valor, status, data_fechamento }, (err, oportunidadeId) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar oportunidade' });
    }
    res.status(201).json({ id: oportunidadeId, cliente_id, titulo, valor, status, data_fechamento });
  });
});

// PUT atualizar oportunidade
app.put('/api/oportunidades/:id', (req, res) => {
  const { titulo, valor, status, data_fechamento } = req.body;

  db.updateOportunidade(req.params.id, { titulo, valor, status, data_fechamento }, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar oportunidade' });
    }
    res.json({ id: req.params.id, titulo, valor, status, data_fechamento });
  });
});

// DELETE oportunidade
app.delete('/api/oportunidades/:id', (req, res) => {
  db.deleteOportunidade(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar oportunidade' });
    }
    res.json({ message: 'Oportunidade deletada com sucesso' });
  });
});

// ===== ROTAS DE ATIVIDADES =====

// GET todas as atividades
app.get('/api/atividades', (req, res) => {
  db.getAllAtividades((err, atividades) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar atividades' });
    }
    res.json(atividades);
  });
});

// POST criar nova atividade
app.post('/api/atividades', (req, res) => {
  const { cliente_id, tipo, descricao, data_atividade } = req.body;

  if (!cliente_id || !tipo || !descricao) {
    return res.status(400).json({ error: 'Cliente, tipo e descrição são obrigatórios' });
  }

  db.createAtividade({ cliente_id, tipo, descricao, data_atividade }, (err, atividadeId) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao criar atividade' });
    }
    res.status(201).json({ id: atividadeId, cliente_id, tipo, descricao, data_atividade });
  });
});

// DELETE atividade
app.delete('/api/atividades/:id', (req, res) => {
  db.deleteAtividade(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar atividade' });
    }
    res.json({ message: 'Atividade deletada com sucesso' });
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor CRM rodando em http://localhost:${PORT}`);
});
