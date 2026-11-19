<template>
  <div class="lista-container">
    <div class="cabecalho">
      <h2>Profissionais</h2>
      <button class="botao-novo" @click="$emit('novo')">+ Novo Profissional</button>
    </div>

    <div class="filtros">
      <input
        type="text"
        v-model="busca"
        placeholder="Buscar por nome ou especialidade..."
        class="campo-busca"
      />

      <select v-model="filtroStatus" class="campo-filtro">
        <option value="">Todos os status</option>
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
        <option value="ferias">Em férias</option>
      </select>
    </div>

    <div v-if="carregando" class="estado">Carregando profissionais...</div>

    <div v-else-if="erro" class="estado erro">{{ erro }}</div>

    <div v-else-if="profissionaisFiltrados.length === 0" class="estado">
      Nenhum profissional encontrado.
    </div>

    <table v-else class="tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Especialidade</th>
          <th>Registro</th>
          <th>Telefone</th>
          <th>Dias de atendimento</th>
          <th>Status</th>
          <th class="coluna-acoes">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="profissional in profissionaisPaginados" :key="profissional.id">
          <td>{{ profissional.nome }}</td>
          <td>{{ profissional.especialidade }}</td>
          <td>{{ profissional.registro }}</td>
          <td>{{ profissional.telefone }}</td>
          <td>{{ formatarDias(profissional.diasAtendimento) }}</td>
          <td>
            <span :class="['badge', 'badge-' + profissional.status]">
              {{ formatarStatus(profissional.status) }}
            </span>
          </td>
          <td class="coluna-acoes">
            <button class="botao-icone" title="Editar" @click="$emit('editar', profissional)">
              ✏️
            </button>
            <button
              class="botao-icone excluir"
              title="Excluir"
              @click="confirmarExclusao(profissional)"
            >
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="totalPaginas > 1" class="paginacao">
      <button :disabled="paginaAtual === 1" @click="paginaAtual--">
        Anterior
      </button>
      <span>Página {{ paginaAtual }} de {{ totalPaginas }}</span>
      <button :disabled="paginaAtual === totalPaginas" @click="paginaAtual++">
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

// Ajuste a URL base conforme o endereço da sua API
const API_URL = "http://localhost/profissional";

const emit = defineEmits(["novo", "editar", "excluido"]);

const profissionais = ref([]);
const carregando = ref(true);
const erro = ref("");

const busca = ref("");
const filtroStatus = ref("");

const paginaAtual = ref(1);
const itensPorPagina = 10;

const statusMap = {
  ativo: "Ativo",
  inativo: "Inativo",
  ferias: "Em férias",
};

const diasMap = {
  segunda: "Seg",
  terca: "Ter",
  quarta: "Qua",
  quinta: "Qui",
  sexta: "Sex",
  sabado: "Sáb",
  domingo: "Dom",
};

function formatarStatus(status) {
  return statusMap[status] || status;
}

function formatarDias(dias) {
  if (!dias || dias.length === 0) return "—";
  return dias.map((dia) => diasMap[dia] || dia).join(", ");
}

const profissionaisFiltrados = computed(() => {
  return profissionais.value.filter((profissional) => {
    const termo = busca.value.toLowerCase();
    const correspondeBusca =
      !termo ||
      profissional.nome?.toLowerCase().includes(termo) ||
      profissional.especialidade?.toLowerCase().includes(termo);

    const correspondeStatus =
      !filtroStatus.value || profissional.status === filtroStatus.value;

    return correspondeBusca && correspondeStatus;
  });
});

const totalPaginas = computed(() =>
  Math.ceil(profissionaisFiltrados.value.length / itensPorPagina) || 1
);

const profissionaisPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina;
  return profissionaisFiltrados.value.slice(inicio, inicio + itensPorPagina);
});

async function carregarProfissionais() {
  carregando.value = true;
  erro.value = "";

  try {
    const resposta = await axios.get(API_URL);
    profissionais.value = resposta.data;
  } catch (e) {
    erro.value = "Erro ao carregar profissionais.";
    console.error("Erro ao carregar profissionais:", e);
  } finally {
    carregando.value = false;
  }
}

async function confirmarExclusao(profissional) {
  const confirmado = window.confirm(
    `Deseja realmente excluir o profissional ${profissional.nome}?`
  );
  if (!confirmado) return;

  try {
    await axios.delete(`${API_URL}/${profissional.id}`);
    profissionais.value = profissionais.value.filter(
      (p) => p.id !== profissional.id
    );
    emit("excluido", profissional);
  } catch (e) {
    window.alert("Erro ao excluir profissional.");
    console.error("Erro ao excluir profissional:", e);
  }
}

defineExpose({ carregarProfissionais });

onMounted(() => {
  carregarProfissionais();
});
</script>

<style scoped>
.lista-container {
  max-width: 950px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
}

.cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cabecalho h2 {
  color: #2c3e50;
  margin: 0;
}

.botao-novo {
  background: #3498db;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.botao-novo:hover {
  opacity: 0.9;
}

.filtros {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.campo-busca {
  flex: 2;
  min-width: 200px;
}

.campo-filtro {
  flex: 1;
  min-width: 150px;
}

input,
select {
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

input:focus,
select:focus {
  border-color: #3498db;
}

.estado {
  text-align: center;
  padding: 40px 0;
  color: #64748b;
}

.estado.erro {
  color: #c0392b;
}

.tabela {
  width: 100%;
  border-collapse: collapse;
}

.tabela th,
.tabela td {
  text-align: left;
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
}

.tabela th {
  color: #64748b;
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
}

.coluna-acoes {
  text-align: right;
  white-space: nowrap;
}

.botao-icone {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background 0.2s;
}

.botao-icone:hover {
  background: #f1f5f9;
}

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge-ativo {
  background: #d1fae5;
  color: #047857;
}

.badge-inativo {
  background: #fee2e2;
  color: #b91c1c;
}

.badge-ferias {
  background: #dbeafe;
  color: #1d4ed8;
}

.paginacao {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
}

.paginacao button {
  background: #ecf0f1;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.paginacao button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.paginacao span {
  font-size: 14px;
  color: #64748b;
}
</style>


