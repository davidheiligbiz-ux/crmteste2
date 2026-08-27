// Estado da aplicação
let currentPage = 'clientes';
let clientes = [];
let oportunidades = [];
let atividades = [];
let editingId = null;

// Elementos do DOM
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('close-modal');
const btnNovo = document.getElementById('btn-novo');
const pageTitle = document.getElementById('page-title');
const navLinks = document.querySelectorAll('.nav-link');

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadClientes();
  switchPage('clientes');
});

// ===== EVENT LISTENERS =====

function setupEventListeners() {
  // Navegação
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      switchPage(page);
    });
  });

  // Botão Novo
  btnNovo.addEventListener('click', openNewModal);

  // Fechar Modal
  closeModalBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Busca
  document.getElementById('search-clientes').addEventListener('input', (e) => {
    filterTable('clientes', e.target.value);
  });
  document.getElementById('search-oportunidades').addEventListener('input', (e) => {
    filterTable('oportunidades', e.target.value);
  });
  document.getElementById('search-atividades').addEventListener('input', (e) => {
    filterTable('atividades', e.target.value);
  });
}

// ===== NAVEGAÇÃO =====

function switchPage(page) {
  currentPage = page;
  
  // Atualizar navegação
  navLinks.forEach(link => link.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`).classList.add('active');

  // Atualizar página
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');

  // Atualizar título
  const titles = {
    clientes: 'Gerenciar Clientes',
    oportunidades: 'Gerenciar Oportunidades',
    atividades: 'Atividades'
  };
  pageTitle.textContent = titles[page];

  // Carregar dados
  if (page === 'clientes') loadClientes();
  else if (page === 'oportunidades') loadOportunidades();
  else if (page === 'atividades') loadAtividades();
}

// ===== CLIENTES =====

async function loadClientes() {
  clientes = await fetchClientes();
  renderClientesTable();
}

function renderClientesTable() {
  const tbody = document.getElementById('clientes-tbody');
  
  if (clientes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Nenhum cliente encontrado</td></tr>';
    return;
  }

  tbody.innerHTML = clientes.map(cliente => `
    <tr>
      <td>${cliente.nome}</td>
      <td>${cliente.email}</td>
      <td>${cliente.telefone || '-'}</td>
      <td>${cliente.empresa || '-'}</td>
      <td><span class="status-badge status-${cliente.status}">${cliente.status}</span></td>
      <td>
        <button class="btn btn-sm btn-edit" onclick="openEditClienteModal(${cliente.id})">Editar</button>
        <button class="btn btn-sm btn-delete" onclick="deleteClienteHandler(${cliente.id})">Deletar</button>
      </td>
    </tr>
  `).join('');
}

function openNewModal() {
  editingId = null;
  if (currentPage === 'clientes') openClienteModal();
  else if (currentPage === 'oportunidades') openOportunidadeModal();
  else if (currentPage === 'atividades') openAtividadeModal();
}

function openClienteModal(id = null) {
  editingId = id;
  const cliente = id ? clientes.find(c => c.id === id) : null;

  document.getElementById('modal-title').textContent = id ? 'Editar Cliente' : 'Novo Cliente';

  const formHTML = `
    <form id="form-cliente" onsubmit="saveCliente(event)">
      <div class="form-group">
        <label>Nome *</label>
        <input type="text" id="nome" value="${cliente?.nome || ''}" required>
      </div>
      <div class="form-group">
        <label>Email *</label>
        <input type="email" id="email" value="${cliente?.email || ''}" required>
      </div>
      <div class="form-group">
        <label>Telefone</label>
        <input type="tel" id="telefone" value="${cliente?.telefone || ''}">
      </div>
      <div class="form-group">
        <label>Empresa</label>
        <input type="text" id="empresa" value="${cliente?.empresa || ''}">
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="status">
          <option value="ativo" ${cliente?.status === 'ativo' ? 'selected' : ''}>Ativo</option>
          <option value="inativo" ${cliente?.status === 'inativo' ? 'selected' : ''}>Inativo</option>
        </select>
      </div>
      <div class="form-buttons">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Salvar</button>
      </div>
    </form>
  `;

  document.getElementById('form-container').innerHTML = formHTML;
  modal.classList.add('show');
}

async function saveCliente(event) {
  event.preventDefault();

  const data = {
    nome: document.getElementById('nome').value,
    email: document.getElementById('email').value,
    telefone: document.getElementById('telefone').value,
    empresa: document.getElementById('empresa').value,
    status: document.getElementById('status').value
  };

  try {
    if (editingId) {
      await updateCliente(editingId, data);
      alert('Cliente atualizado com sucesso!');
    } else {
      await createCliente(data);
      alert('Cliente criado com sucesso!');
    }
    closeModal();
    loadClientes();
  } catch (error) {
    alert('Erro ao salvar cliente: ' + error.message);
  }
}

function openEditClienteModal(id) {
  openClienteModal(id);
}

async function deleteClienteHandler(id) {
  if (confirm('Tem certeza que deseja deletar este cliente?')) {
    try {
      await deleteCliente(id);
      alert('Cliente deletado com sucesso!');
      loadClientes();
    } catch (error) {
      alert('Erro ao deletar cliente: ' + error.message);
    }
  }
}

// ===== OPORTUNIDADES =====

async function loadOportunidades() {
  oportunidades = await fetchOportunidades();
  renderOportunidadesTable();
}

function renderOportunidadesTable() {
  const tbody = document.getElementById('oportunidades-tbody');
  
  if (oportunidades.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">Nenhuma oportunidade encontrada</td></tr>';
    return;
  }

  tbody.innerHTML = oportunidades.map(oportunidade => `
    <tr>
      <td>${oportunidade.titulo}</td>
      <td>${oportunidade.cliente_nome}</td>
      <td>R$ ${parseFloat(oportunidade.valor).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
      <td><span class="status-badge status-${oportunidade.status}">${oportunidade.status}</span></td>
      <td>${oportunidade.data_fechamento ? new Date(oportunidade.data_fechamento).toLocaleDateString('pt-BR') : '-'}</td>
      <td>
        <button class="btn btn-sm btn-edit" onclick="openEditOportunidadeModal(${oportunidade.id})">Editar</button>
        <button class="btn btn-sm btn-delete" onclick="deleteOportunidadeHandler(${oportunidade.id})">Deletar</button>
      </td>
    </tr>
  `).join('');
}

function openOportunidadeModal(id = null) {
  editingId = id;
  const oportunidade = id ? oportunidades.find(o => o.id === id) : null;

  document.getElementById('modal-title').textContent = id ? 'Editar Oportunidade' : 'Nova Oportunidade';

  const clienteOptions = clientes.map(c => 
    `<option value="${c.id}" ${oportunidade?.cliente_id === c.id ? 'selected' : ''}>${c.nome}</option>`
  ).join('');

  const formHTML = `
    <form id="form-oportunidade" onsubmit="saveOportunidade(event)">
      <div class="form-group">
        <label>Cliente *</label>
        <select id="cliente_id" required>
          <option value="">Selecione um cliente</option>
          ${clienteOptions}
        </select>
      </div>
      <div class="form-group">
        <label>Título *</label>
        <input type="text" id="titulo" value="${oportunidade?.titulo || ''}" required>
      </div>
      <div class="form-group">
        <label>Valor *</label>
        <input type="number" id="valor" step="0.01" value="${oportunidade?.valor || ''}" required>
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="status">
          <option value="aberta" ${oportunidade?.status === 'aberta' ? 'selected' : ''}>Aberta</option>
          <option value="fechada" ${oportunidade?.status === 'fechada' ? 'selected' : ''}>Fechada</option>
          <option value="perdida" ${oportunidade?.status === 'perdida' ? 'selected' : ''}>Perdida</option>
        </select>
      </div>
      <div class="form-group">
        <label>Data Fechamento</label>
        <input type="date" id="data_fechamento" value="${oportunidade?.data_fechamento ? oportunidade.data_fechamento.split('T')[0] : ''}">
      </div>
      <div class="form-buttons">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Salvar</button>
      </div>
    </form>
  `;

  document.getElementById('form-container').innerHTML = formHTML;
  modal.classList.add('show');
}

async function saveOportunidade(event) {
  event.preventDefault();

  const data = {
    cliente_id: document.getElementById('cliente_id').value,
    titulo: document.getElementById('titulo').value,
    valor: document.getElementById('valor').value,
    status: document.getElementById('status').value,
    data_fechamento: document.getElementById('data_fechamento').value
  };

  try {
    if (editingId) {
      await updateOportunidade(editingId, data);
      alert('Oportunidade atualizada com sucesso!');
    } else {
      await createOportunidade(data);
      alert('Oportunidade criada com sucesso!');
    }
    closeModal();
    loadOportunidades();
  } catch (error) {
    alert('Erro ao salvar oportunidade: ' + error.message);
  }
}

function openEditOportunidadeModal(id) {
  openOportunidadeModal(id);
}

async function deleteOportunidadeHandler(id) {
  if (confirm('Tem certeza que deseja deletar esta oportunidade?')) {
    try {
      await deleteOportunidade(id);
      alert('Oportunidade deletada com sucesso!');
      loadOportunidades();
    } catch (error) {
      alert('Erro ao deletar oportunidade: ' + error.message);
    }
  }
}

// ===== ATIVIDADES =====

async function loadAtividades() {
  atividades = await fetchAtividades();
  renderAtividadesTable();
}

function renderAtividadesTable() {
  const tbody = document.getElementById('atividades-tbody');
  
  if (atividades.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center">Nenhuma atividade encontrada</td></tr>';
    return;
  }

  tbody.innerHTML = atividades.map(atividade => `
    <tr>
      <td>${atividade.cliente_nome}</td>
      <td>${atividade.tipo}</td>
      <td>${atividade.descricao}</td>
      <td>${new Date(atividade.data_atividade).toLocaleDateString('pt-BR')}</td>
      <td>
        <button class="btn btn-sm btn-delete" onclick="deleteAtividadeHandler(${atividade.id})">Deletar</button>
      </td>
    </tr>
  `).join('');
}

function openAtividadeModal(id = null) {
  editingId = id;

  document.getElementById('modal-title').textContent = 'Nova Atividade';

  const clienteOptions = clientes.map(c => 
    `<option value="${c.id}">${c.nome}</option>`
  ).join('');

  const formHTML = `
    <form id="form-atividade" onsubmit="saveAtividade(event)">
      <div class="form-group">
        <label>Cliente *</label>
        <select id="cliente_id" required>
          <option value="">Selecione um cliente</option>
          ${clienteOptions}
        </select>
      </div>
      <div class="form-group">
        <label>Tipo *</label>
        <select id="tipo" required>
          <option value="">Selecione um tipo</option>
          <option value="Email">Email</option>
          <option value="Telefone">Telefone</option>
          <option value="Reunião">Reunião</option>
          <option value="Proposta">Proposta</option>
          <option value="Outro">Outro</option>
        </select>
      </div>
      <div class="form-group">
        <label>Descrição *</label>
        <textarea id="descricao" required></textarea>
      </div>
      <div class="form-group">
        <label>Data</label>
        <input type="datetime-local" id="data_atividade">
      </div>
      <div class="form-buttons">
        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button type="submit" class="btn btn-primary">Salvar</button>
      </div>
    </form>
  `;

  document.getElementById('form-container').innerHTML = formHTML;
  modal.classList.add('show');
}

async function saveAtividade(event) {
  event.preventDefault();

  const data = {
    cliente_id: document.getElementById('cliente_id').value,
    tipo: document.getElementById('tipo').value,
    descricao: document.getElementById('descricao').value,
    data_atividade: document.getElementById('data_atividade').value
  };

  try {
    await createAtividade(data);
    alert('Atividade criada com sucesso!');
    closeModal();
    loadAtividades();
  } catch (error) {
    alert('Erro ao salvar atividade: ' + error.message);
  }
}

async function deleteAtividadeHandler(id) {
  if (confirm('Tem certeza que deseja deletar esta atividade?')) {
    try {
      await deleteAtividade(id);
      alert('Atividade deletada com sucesso!');
      loadAtividades();
    } catch (error) {
      alert('Erro ao deletar atividade: ' + error.message);
    }
  }
}

// ===== UTILITÁRIOS =====

function closeModal() {
  modal.classList.remove('show');
}

function filterTable(page, searchTerm) {
  const tbody = document.getElementById(`${page}-tbody`);
  const rows = tbody.querySelectorAll('tr');

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm.toLowerCase()) ? '' : 'none';
  });
}
