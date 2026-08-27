const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'crm.db');
const db = new sqlite3.Database(dbPath);

// Inicializar banco de dados e criar tabelas
function init() {
  db.serialize(() => {
    // Tabela de Clientes
    db.run(`
      CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        telefone TEXT,
        empresa TEXT,
        status TEXT DEFAULT 'ativo',
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabela de Oportunidades
    db.run(`
      CREATE TABLE IF NOT EXISTS oportunidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        titulo TEXT NOT NULL,
        valor REAL NOT NULL,
        status TEXT DEFAULT 'aberta',
        data_fechamento DATE,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
      )
    `);

    // Tabela de Atividades
    db.run(`
      CREATE TABLE IF NOT EXISTS atividades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER NOT NULL,
        tipo TEXT NOT NULL,
        descricao TEXT NOT NULL,
        data_atividade DATETIME DEFAULT CURRENT_TIMESTAMP,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
      )
    `);

    console.log('✅ Banco de dados inicializado');
  });
}

// ===== CLIENTES =====

function getAllClientes(callback) {
  db.all('SELECT * FROM clientes ORDER BY data_criacao DESC', callback);
}

function getClienteById(id, callback) {
  db.get('SELECT * FROM clientes WHERE id = ?', [id], callback);
}

function createCliente(data, callback) {
  const { nome, email, telefone, empresa, status } = data;
  db.run(
    'INSERT INTO clientes (nome, email, telefone, empresa, status) VALUES (?, ?, ?, ?, ?)',
    [nome, email, telefone || null, empresa || null, status || 'ativo'],
    function(err) {
      callback(err, this.lastID);
    }
  );
}

function updateCliente(id, data, callback) {
  const { nome, email, telefone, empresa, status } = data;
  db.run(
    'UPDATE clientes SET nome = ?, email = ?, telefone = ?, empresa = ?, status = ?, data_atualizacao = CURRENT_TIMESTAMP WHERE id = ?',
    [nome, email, telefone || null, empresa || null, status, id],
    callback
  );
}

function deleteCliente(id, callback) {
  db.run('DELETE FROM clientes WHERE id = ?', [id], callback);
}

// ===== OPORTUNIDADES =====

function getAllOportunidades(callback) {
  db.all(
    `SELECT o.*, c.nome as cliente_nome FROM oportunidades o
     LEFT JOIN clientes c ON o.cliente_id = c.id
     ORDER BY o.data_criacao DESC`,
    callback
  );
}

function createOportunidade(data, callback) {
  const { cliente_id, titulo, valor, status, data_fechamento } = data;
  db.run(
    'INSERT INTO oportunidades (cliente_id, titulo, valor, status, data_fechamento) VALUES (?, ?, ?, ?, ?)',
    [cliente_id, titulo, valor, status || 'aberta', data_fechamento || null],
    function(err) {
      callback(err, this.lastID);
    }
  );
}

function updateOportunidade(id, data, callback) {
  const { titulo, valor, status, data_fechamento } = data;
  db.run(
    'UPDATE oportunidades SET titulo = ?, valor = ?, status = ?, data_fechamento = ?, data_atualizacao = CURRENT_TIMESTAMP WHERE id = ?',
    [titulo, valor, status, data_fechamento || null, id],
    callback
  );
}

function deleteOportunidade(id, callback) {
  db.run('DELETE FROM oportunidades WHERE id = ?', [id], callback);
}

// ===== ATIVIDADES =====

function getAllAtividades(callback) {
  db.all(
    `SELECT a.*, c.nome as cliente_nome FROM atividades a
     LEFT JOIN clientes c ON a.cliente_id = c.id
     ORDER BY a.data_atividade DESC`,
    callback
  );
}

function createAtividade(data, callback) {
  const { cliente_id, tipo, descricao, data_atividade } = data;
  db.run(
    'INSERT INTO atividades (cliente_id, tipo, descricao, data_atividade) VALUES (?, ?, ?, ?)',
    [cliente_id, tipo, descricao, data_atividade || new Date().toISOString()],
    function(err) {
      callback(err, this.lastID);
    }
  );
}

function deleteAtividade(id, callback) {
  db.run('DELETE FROM atividades WHERE id = ?', [id], callback);
}

module.exports = {
  init,
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
  getAllOportunidades,
  createOportunidade,
  updateOportunidade,
  deleteOportunidade,
  getAllAtividades,
  createAtividade,
  deleteAtividade
};
