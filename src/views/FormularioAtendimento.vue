<template>
  <div class="pagina-fundo">
  <div class="formulario-container">
    <h2>Novo Atendimento</h2>

    <form @submit.prevent="enviarFormulario">
      <div class="campo">
        <label for="paciente">Paciente</label>
        <select id="paciente" v-model="formulario.pacienteId" required>
          <option disabled value="">Selecione um paciente</option>
          <option
  v-for="paciente in pacientes"
  :key="paciente.idPaciente"
  :value="paciente.idPaciente"
>
  {{ paciente.nomePaciente }}
</option>
        </select>
      </div>

      <div class="campo">
        <label for="profissional">Profissional</label>
        <select id="profissional" v-model="formulario.profissionalId" required>
          <option disabled value="">Selecione um profissional</option>
          <option
  v-for="profissional in profissionais"
  :key="profissional.idProfissional"
  :value="profissional.idProfissional"
>
  {{ profissional.nomeProfissional }}
</option>
        </select>
      </div>

      <div class="campo-grupo">
        <div class="campo">
          <label for="data">Data</label>
          <input id="data" type="date" v-model="formulario.data" required />
        </div>

        <div class="campo">
          <label for="hora">Hora</label>
          <input id="hora" type="time" v-model="formulario.hora" required />
        </div>
      </div>

      <div class="campo">
        <label for="tipo">Tipo de Atendimento</label>
        <select id="tipo" v-model="formulario.tipo" required>
          <option disabled value="">Selecione</option>
          <option value="consulta">Consulta</option>
          <option value="retorno">Retorno</option>
          <option value="exame">Exame</option>
          <option value="procedimento">Procedimento</option>
        </select>
      </div>

      <div class="campo">
        <label for="valor">Valor (R$)</label>
        <input
          id="valor"
          type="number"
          step="0.01"
          min="0"
          v-model.number="formulario.valor"
        />
      </div>

      <div class="campo">
        <label for="observacoes">Observações</label>
        <textarea
          id="observacoes"
          v-model="formulario.observacoes"
          rows="4"
          placeholder="Observações sobre o atendimento..."
        ></textarea>
      </div>

      <p v-if="mensagem" :class="['mensagem', sucesso ? 'sucesso' : 'erro']">
        {{ mensagem }}
      </p>

      <div class="acoes">
        <button type="submit" :disabled="enviando">
          {{ enviando ? "Salvando..." : "Salvar Atendimento" }}
        </button>
        <button type="button" class="secundario" @click="VoltarFormulario">
          Voltar 
        </button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

// Ajuste a URL base conforme o endereço da sua API
const API_URL = "http://localhost/atendimento";
const API_PACIENTES = "http://localhost/paciente";
const API_PROFISSIONAIS = "http://localhost/profissional";

const router = useRouter();
const route = useRoute();

const pacientes = ref([]);
const profissionais = ref([]);
const enviando = ref(false);
const mensagem = ref("");
const sucesso = ref(false);

const formulario = reactive({
  pacienteId: "",
  profissionalId: "",
  data: "",
  hora: "",
  tipo: "",
  valor: null,
  observacoes: "",
});

async function carregarPacientes() {
  try {
    const resposta = await axios.get(API_PACIENTES);
    pacientes.value = resposta.data;
  } catch (erro) {
    console.error("Erro ao carregar pacientes:", erro);
  }
}

async function carregarProfissionais() {
  try {
    const resposta = await axios.get(API_PROFISSIONAIS);
    profissionais.value = resposta.data;

    // seleciona o profissional que veio da tela de horários
    const idUrl = route.query.profissionalId;
    if (idUrl) {
      const encontrado = profissionais.value.find(
        (p) => String(p.idProfissional) === String(idUrl)
      );
      if (encontrado) formulario.profissionalId = encontrado.idProfissional;
    }
  } catch (erro) {
    console.error("Erro ao carregar profissionais:", erro);
  }
}

async function enviarFormulario() {
  enviando.value = true;
  mensagem.value = "";

  try {
    const resposta = await axios.post(API_URL, {
      idPaciente: formulario.pacienteId,
      idProfissional: formulario.profissionalId,
      dataAtendimento: formulario.data,
      horaAtendimento: formulario.hora,
      tipoAtendimento: formulario.tipo,
      descricaoAtendimento: formulario.observacoes,
      statusAtendimento: "agendado",
    });

    // só chega aqui se o back-end salvou
    const idAtendimento = resposta.data?.idAtendimento ?? resposta.data?.id;
    router.push({ path: "/formularioPagamento", query: { idAtendimento } });
  } catch (erro) {
    sucesso.value = false;
    mensagem.value =
      erro.response?.data?.mensagem || "Erro ao salvar o atendimento.";
    console.error("Erro ao enviar formulário:", erro);
  } finally {
    enviando.value = false;
  }
}

function VoltarFormulario() {
  router.back();
}

onMounted(() => {
  // preenche com o que veio da tela de horários
  if (route.query.data) formulario.data = route.query.data;
  if (route.query.hora) formulario.hora = route.query.hora;
  carregarPacientes();
  carregarProfissionais();
});
</script>
 <style scoped>
.pagina-fundo {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 16px;
  background: linear-gradient(135deg, #eaf5ef 0%, #d7ece0 100%);
}
.formulario-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
  color: #1f4d3a;
}

.campo {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
}

.campo-grupo {
  display: flex;
  gap: 16px;
}

.campo-grupo .campo {
  flex: 1;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #2f6b52;
  font-size: 14px;
}

input,
select,
textarea {
  padding: 10px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
  background-color: #3ba776;
  color: #fff;
  color-scheme: light;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #3ba776;
}

.acoes {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

button[type="submit"] {
  background: #3ba776;
  color: #fff;
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.secundario {
  background: #eaf5ef;
  color: #1f4d3a;
}

button.proximo {
  background: #40916c;
  color: #fff;
}

button:hover:not(:disabled) {
  opacity: 0.9;
}

.mensagem {
  margin-top: 12px;
  padding: 10px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.mensagem.sucesso {
  background: #d4edda;
  color: #155724;
}

.mensagem.erro {
  background: #f8d7da;
  color: #721c24;
}
</style>