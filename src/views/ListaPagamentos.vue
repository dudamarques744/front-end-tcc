<template>
  <div class="lista-container">
    <div class="cabecalho">
      <h2>Pagamentos</h2>
      <button class="botao-novo" @click="$emit('novo')">+ Novo Pagamento</button>
    </div>

    <div class="filtros">
      <input
        type="text"
        v-model="busca"
        placeholder="Buscar por paciente..."
        class="campo-busca"
      />

      <select v-model="filtroStatus" class="campo-filtro">
        <option value="">Todos os status</option>
        <option value="pendente">Pendente</option>
        <option value="pago">Pago</option>
        <option value="cancelado">Cancelado</option>
        <option value="estornado">Estornado</option>
      </select>

      <select v-model="filtroFormaPagamento" class="campo-filtro">
        <option value="">Todas as formas</option>
        <option value="dinheiro">Dinheiro</option>
        <option value="pix">Pix</option>
        <option value="cartao_credito">Cartão de crédito</option>
        <option value="cartao_debito">Cartão de débito</option>
        <option value="convenio">Convênio</option>
        <option value="boleto">Boleto</option>
      </select>
    </div>

    <div v-if="carregando" class="estado">Carregando pagamentos...</div>

    <div v-else-if="erro" class="estado erro">{{ erro }}</div>

    <div v-else-if="pagamentosFiltrados.length === 0" class="estado">
      Nenhum pagamento encontrado.
    </div>

    <template v-else>
      <table class="tabela">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Valor</th>
            <th>Forma</th>
            <th>Data</th>
            <th>Status</th>
            <th class="coluna-acoes">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pagamento in pagamentosPaginados" :key="pagamento.id">
            <td>{{ pagamento.atendimento?.paciente?.nome || "—" }}</td>
            <td>{{ formatarValor(pagamento.valor) }}</td>
            <td>{{ formatarFormaPagamento(pagamento.formaPagamento) }}</td>
            <td>{{ formatarData(pagamento.dataPagamento) }}</td>
            <td>
              <span :class="['badge', 'badge-' + pagamento.status]">
                {{ formatarStatus(pagamento.status) }}
              </span>
            </td>
            <td class="coluna-acoes">
              <button class="botao-icone" title="Editar" @click="$emit('editar', pagamento)">
                ✏️
              </button>
              <button
                class="botao-icone excluir"
                title="Excluir"
                @click="confirmarExclusao(pagamento)"
              >
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="resumo">
        Total filtrado: <strong>{{ formatarValor(totalFiltrado) }}</strong>
      </div>
    </template>

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
const API_URL = "http://localhost/pagamento";

const emit = defineEmits(["novo", "editar", "excluido"]);

const pagamentos = ref([]);
const carregando = ref(true);
const erro = ref("");

const busca = ref("");
const filtroStatus = ref("");
const filtroFormaPagamento = ref("");

const paginaAtual = ref(1);
const itensPorPagina = 10;

const statusMap = {
  pendente: "Pendente",
  pago: "Pago",
  cancelado: "Cancelado",
  estornado: "Estornado",
};

const formaPagamentoMap = {
  dinheiro: "Dinheiro",
  pix: "Pix",
  cartao_credito: "Cartão de crédito",
  cartao_debito: "Cartão de débito",
  convenio: "Convênio",
  boleto: "Boleto",
};

function formatarData(data) {
  if (!data) return "—";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

function formatarValor(valor) {
  if (valor == null) return "R$ 0,00";
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function formatarStatus(status) {
  return statusMap[status] || status;
}

function formatarFormaPagamento(forma) {
  return formaPagamentoMap[forma] || forma;
}

const pagamentosFiltrados = computed(() => {
  return pagamentos.value.filter((pagamento) => {
    const termo = busca.value.toLowerCase();
    const correspondeBusca =
      !termo ||
      pagamento.atendimento?.paciente?.nome?.toLowerCase().includes(termo);

    const correspondeStatus =
      !filtroStatus.value || pagamento.status === filtroStatus.value;

    const correspondeForma =
      !filtroFormaPagamento.value ||
      pagamento.formaPagamento === filtroFormaPagamento.value;

    return correspondeBusca && correspondeStatus && correspondeForma;
  });
});

const totalFiltrado = computed(() =>
  pagamentosFiltrados.value.reduce((soma, p) => soma + (p.valor || 0), 0)
);

const totalPaginas = computed(() =>
  Math.ceil(pagamentosFiltrados.value.length / itensPorPagina) || 1
);

const pagamentosPaginados = computed(() => {
  const inicio = (paginaAtual.value - 1) * itensPorPagina;
  return pagamentosFiltrados.value.slice(inicio, inicio + itensPorPagina);
});

async function carregarPagamentos() {
  carregando.value = true;
  erro.value = "";

  try {
    const resposta = await axios.get(API_URL);
    pagamentos.value = resposta.data;
  } catch (e) {
    erro.value = "Erro ao carregar pagamentos.";
    console.error("Erro ao carregar pagamentos:", e);
  } finally {
    carregando.value = false;
  }
}

async function confirmarExclusao(pagamento) {
  const confirmado = window.confirm(
    `Deseja realmente excluir este pagamento de ${formatarValor(
      pagamento.valor
    )}?`
  );
  if (!confirmado) return;

  try {
    await axios.delete(`${API_URL}/${pagamento.id}`);
    pagamentos.value = pagamentos.value.filter((p) => p.id !== pagamento.id);
    emit("excluido", pagamento);
  } catch (e) {
    window.alert("Erro ao excluir pagamento.");
    console.error("Erro ao excluir pagamento:", e);
  }
}

defineExpose({ carregarPagamentos });

onMounted(() => {
  carregarPagamentos();
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

.badge-pendente {
  background: #fef3c7;
  color: #b45309;
}

.badge-pago {
  background: #d1fae5;
  color: #047857;
}

.badge-cancelado {
  background: #fee2e2;
  color: #b91c1c;
}

.badge-estornado {
  background: #e2e8f0;
  color: #475569;
}

.resumo {
  text-align: right;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
  font-size: 14px;
  color: #2c3e50;
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