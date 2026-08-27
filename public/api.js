const API_URL = window.location.origin + '/api';

// ===== CLIENTES =====

async function fetchClientes() {
  try {
    const response = await fetch(`${API_URL}/clientes`);
    if (!response.ok) throw new Error('Erro ao buscar clientes');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function createCliente(data) {
  try {
    const response = await fetch(`${API_URL}/clientes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erro ao criar cliente');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCliente(id, data) {
  try {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erro ao atualizar cliente');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteCliente(id) {
  try {
    const response = await fetch(`${API_URL}/clientes/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar cliente');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ===== OPORTUNIDADES =====

async function fetchOportunidades() {
  try {
    const response = await fetch(`${API_URL}/oportunidades`);
    if (!response.ok) throw new Error('Erro ao buscar oportunidades');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function createOportunidade(data) {
  try {
    const response = await fetch(`${API_URL}/oportunidades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erro ao criar oportunidade');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateOportunidade(id, data) {
  try {
    const response = await fetch(`${API_URL}/oportunidades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erro ao atualizar oportunidade');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteOportunidade(id) {
  try {
    const response = await fetch(`${API_URL}/oportunidades/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar oportunidade');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ===== ATIVIDADES =====

async function fetchAtividades() {
  try {
    const response = await fetch(`${API_URL}/atividades`);
    if (!response.ok) throw new Error('Erro ao buscar atividades');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function createAtividade(data) {
  try {
    const response = await fetch(`${API_URL}/atividades`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erro ao criar atividade');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function deleteAtividade(id) {
  try {
    const response = await fetch(`${API_URL}/atividades/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro ao deletar atividade');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
