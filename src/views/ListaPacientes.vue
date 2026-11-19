
<template>
  <div class="lista-container">

    <div class="cabecalho">
      <div class="titulo-area">
        <button
          class="botao-voltar"
          @click="voltarPainel"
        >
          <span>←</span>
          Voltar ao Painel
        </button>

        <h2>Pacientes</h2>
      </div>

      <button
        class="botao-novo"
        @click="$emit('novo')"
      >
        + Novo Paciente
      </button>
    </div>

    <div class="filtros">
      <input
        type="text"
        v-model="busca"
        placeholder="Buscar por nome, CPF ou telefone..."
        class="campo-busca"
      />

      <select v-model="filtroGenero" class="campo-filtro">
        <option value="">Todos os gêneros</option>
        <option value="feminino">Feminino</option>
        <option value="masculino">Masculino</option>
        <option value="outro">Outro</option>
        <option value="prefiro_nao_informar">
          Prefiro não informar
        </option>
      </select>
    </div>

    <div v-if="carregando" class="estado">
      Carregando pacientes...
    </div>

    <div v-else-if="erro" class="estado erro">
      {{ erro }}
    </div>

    <div
      v-else-if="pacientesFiltrados.length === 0"
      class="estado"
    >
      Nenhum paciente encontrado.
    </div>

    <table v-else class="tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>CPF</th>
          <th>Telefone</th>
          <th>E-mail</th>
          <th>Nascimento</th>
          <th class="coluna-acoes">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="paciente in pacientesPaginados"
          :key="paciente.id"
        >
          <td>{{ paciente.nome }}</td>
          <td>{{ paciente.cpf }}</td>
          <td>{{ paciente.telefone }}</td>
          <td>{{ paciente.email || "—" }}</td>
          <td>{{ formatarData(paciente.dataNascimento) }}</td>

          <td class="coluna-acoes">
            <button
              class="botao-icone"
              title="Editar"
              @click="$emit('editar', paciente)"
            >
              ✏️
            </button>

            <button
              class="botao-icone excluir"
              title="Excluir"
              @click="confirmarExclusao(paciente)"
            >
              🗑️
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="totalPaginas > 1" class="paginacao">
      <button
        :disabled="paginaAtual === 1"
        @click="paginaAtual--"
      >
        Anterior
      </button>

      <span>
        Página {{ paginaAtual }} de {{ totalPaginas }}
      </span>

      <button
        :disabled="paginaAtual === totalPaginas"
        @click="paginaAtual++"
      >
        Próxima
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const API_URL = "http://localhost/paciente";

const emit = defineEmits(["novo", "editar", "excluido"]);

// VOLTAR AO PAINEL DA PROFISSIONAL
function voltarPainel() {
  router.push("/telaPrincipalProfissional");
}

// Variáveis
const pacientes = ref([]);
const carregando = ref(true);
const erro = ref("");

const busca = ref("");
const filtroGenero = ref("");

const paginaAtual = ref(1);
const itensPorPagina = 10;

// Formatar data
function formatarData(data) {
  if (!data) return "—";

  const [ano, mes, dia] = data.split("-");

  return `${dia}/${mes}/${ano}`;
}

// Apenas números
function apenasDigitos(texto) {
  return (texto || "").replace(/\D/g, "");
}

// Filtrar pacientes
const pacientesFiltrados = computed(() => {
  return pacientes.value.filter((paciente) => {
    const termo = busca.value.toLowerCase();
    const termoDigitos = apenasDigitos(busca.value);

    const correspondeBusca =
      !termo ||
      paciente.nome?.toLowerCase().includes(termo) ||
      (termoDigitos &&
        apenasDigitos(paciente.cpf).includes(termoDigitos)) ||
      (termoDigitos &&
        apenasDigitos(paciente.telefone).includes(termoDigitos));

    const correspondeGenero =
      !filtroGenero.value ||
      paciente.genero === filtroGenero.value;

    return correspondeBusca && correspondeGenero;
  });
});

// Paginação
const totalPaginas = computed(() =>
  Math.ceil(
    pacientesFiltrados.value.length / itensPorPagina
  ) || 1
);

const pacientesPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina;

  return pacientesFiltrados.value.slice(
    inicio,
    inicio + itensPorPagina
  );
});

// Carregar pacientes
async function carregarPacientes() {
  carregando.value = true;
  erro.value = "";

  try {
    const resposta = await axios.get(API_URL);
    pacientes.value = resposta.data;
  } catch (e) {
    erro.value = "Erro ao carregar pacientes.";
    console.error("Erro ao carregar pacientes:", e);
  } finally {
    carregando.value = false;
  }
}

// Excluir paciente
async function confirmarExclusao(paciente) {
  const confirmado = window.confirm(
    `Deseja realmente excluir o paciente ${paciente.nome}?`
  );

  if (!confirmado) return;

  try {
    await axios.delete(`${API_URL}/${paciente.id}`);

    pacientes.value = pacientes.value.filter(
      (p) => p.id !== paciente.id
    );

    emit("excluido", paciente);
  } catch (e) {
    window.alert("Erro ao excluir paciente.");
    console.error("Erro ao excluir paciente:", e);
  }
}

defineExpose({ carregarPacientes });

onMounted(() => {
  carregarPacientes();
});
</script>

<style scoped>
.lista-container {
  max-width: 900px;
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
  gap: 15px;
  flex-wrap: wrap;
}

.titulo-area {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.cabecalho h2 {
  color: #2c3e50;
  margin: 0;
}

.botao-voltar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #173c76;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.botao-voltar:hover {
  background: #2459a5;
  transform: translateY(-1px);
}

.botao-voltar span {
  font-size: 19px;
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

@media (max-width: 600px) {
  .titulo-area {
    width: 100%;
  }

  .tabela {
    display: block;
    overflow-x: auto;
  }
}
</style>
