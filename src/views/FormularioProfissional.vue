<template>
  <div class="formulario-container">
    <h2>{{ modoEdicao ? "Editar Profissional" : "Novo Profissional" }}</h2>

    <form @submit.prevent="enviarFormulario">
      <div class="campo">
        <label for="nome">Nome completo</label>
        <input
          id="nome"
          type="text"
          v-model="formulario.nomeProfissional"
          placeholder="Nome do profissional"
          required
        />
      </div>

      <div class="campo-grupo">
        <div class="campo">
          <label for="especialidade">Especialidade</label>
          <input
            id="especialidade"
            type="text"
            v-model="formulario.especialidadeProfissional"
            placeholder="Ex: Cardiologia, Fisioterapia..."
            required
          />
        </div>

        <div class="campo">
          <label for="registro">Registro profissional</label>
          <input
            id="registro"
            type="text"
            v-model="formulario.registroProfissional"
            placeholder="Ex: CRM 12345"
            required
          />
        </div>
      </div>

      <div class="campo-grupo">
        <div class="campo">
          <label for="telefone">Telefone</label>
          <input
            id="telefone"
            type="tel"
            v-model="formulario.telefoneProfissional"
            placeholder="(00) 00000-0000"
            @input="formatarTelefone"
            required
          />
        </div>

        <div class="campo">
          <label for="email">E-mail</label>
          <input
            id="email"
            type="email"
            v-model="formulario.emailProfissional"
            placeholder="profissional@email.com"
            required
          />
        </div>
      </div>

      <div class="campo">
        <label for="cpf">CPF</label>
        <input
          id="cpf"
          type="text"
          v-model="formulario.cpfProfissional"
          placeholder="000.000.000-00"
          maxlength="14"
          @input="formatarCpf"
          required
        />
      </div>

      <div class="campo">
        <label for="diasAtendimento">Dias de atendimento</label>
        <div class="dias-semana">
          <label
            v-for="dia in diasSemana"
            :key="dia.valor"
            class="dia-checkbox"
          >
            <input
              type="checkbox"
              :value="dia.valor"
              v-model="formulario.diasAtendimentoProfissional"
            />
            {{ dia.rotulo }}
          </label>
        </div>
      </div>

      <div class="campo-grupo">
        <div class="campo">
          <label for="horaInicio">Horário início</label>
          <input
            id="horaInicio"
            type="time"
            v-model="formulario.horaInicioProfissional"
          />
        </div>

        <div class="campo">
          <label for="horaFim">Horário fim</label>
          <input id="horaFim" type="time" v-model="formulario.horaFimProfissional" />
        </div>
        <div class="campo">
          <label for="senhaProfissional">Senha:</label>
          <input id="senhaProfissional" type="password" v-model="formulario.senhaProfissional" />
        </div>
      </div>

      <div class="campo">
        <label for="status">Status</label>
        <select id="status" v-model="formulario.statusProfissional">
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
          <option value="ferias">Em férias</option>
        </select>
      </div>

      <div class="campo">
        <label for="observacoes">Observações</label>
        <textarea
          id="observacoes"
          v-model="formulario.observacoesProfissional"
          rows="3"
          placeholder="Observações sobre o profissional..."
        ></textarea>
      </div>

      <p v-if="mensagem" :class="['mensagem', sucesso ? 'sucesso' : 'erro']">
        {{ mensagem }}
      </p>

      <div class="acoes">
        <button type="submit" :disabled="enviando">
          {{ enviando ? "Salvando..." : modoEdicao ? "Atualizar" : "Cadastrar" }}
        </button>
        <button type="button" class="secundario" @click="voltar">
          voltar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

// Ajuste a URL base conforme o endereço da sua API
const API_URL = "http://localhost/profissional";

const props = defineProps({
  profissionalId: {
    type: [String, Number],
    default: null,
  },
});

const emit = defineEmits(["salvo"]);
const router = useRouter();

function voltar() {
  router.back();
}

const modoEdicao = ref(false);
const enviando = ref(false);
const mensagem = ref("");
const sucesso = ref(false);

const diasSemana = [
  { valor: "segunda", rotulo: "Seg" },
  { valor: "terca", rotulo: "Ter" },
  { valor: "quarta", rotulo: "Qua" },
  { valor: "quinta", rotulo: "Qui" },
  { valor: "sexta", rotulo: "Sex" },
  { valor: "sabado", rotulo: "Sáb" },
  { valor: "domingo", rotulo: "Dom" },
];

const formulario = reactive({
  nomeProfissional: "",
  especialidadeProfissional: "",
  registroProfissional: "",
  telefoneProfissional: "",
  emailProfissional: "",
  cpfProfissional: "",
  diasAtendimentoProfissional: [],
  horaInicioProfissional: "",
  horaFimProfissional: "",
  statusProfissional: "ativo",
  observacoesProfissional: "",
  senhaProfissional: ""
});

function formatarCpf(evento) {
  let valor = evento.target.value.replace(/\D/g, "").slice(0, 11);
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  formulario.cpfProfissional = valor;
}

function formatarTelefone(evento) {
  let valor = evento.target.value.replace(/\D/g, "").slice(0, 11);
  valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
  valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
  formulario.telefoneProfissional = valor;
}

async function carregarProfissional(id) {
  try {
    const resposta = await axios.get(`${API_URL}/${id}`);
    Object.assign(formulario, resposta.data);
    modoEdicao.value = true;
  } catch (erro) {
    console.error("Erro ao carregar profissional:", erro);
  }
}

async function enviarFormulario() {
  enviando.value = true;
  mensagem.value = "";

  try {
    if (modoEdicao.value) {
      await axios.put(`${API_URL}/${props.profissionalId}`, {
        ...formulario,
      });
      mensagem.value = "Profissional atualizado com sucesso!";
    } else {
      await axios.post(API_URL, { ...formulario });
      mensagem.value = "Profissional cadastrado com sucesso!";
    }
    sucesso.value = true;
    emit("salvo", { ...formulario });
    if (!modoEdicao.value) {
      limparFormulario();
      setTimeout(() => router.push("/"), 1500); // troque "/" pela rota do login
    }
  } catch (erro) {
    sucesso.value = false;
    mensagem.value =
      erro.response?.data?.erro ||
      erro.response?.data?.mensagem ||
      "Erro ao salvar o profissional.";
    console.error("Erro ao enviar formulário:", erro);
  } finally {
    enviando.value = false;
  }
}

function limparFormulario() {
  formulario.nomeProfissional = "";
  formulario.especialidadeProfissional = "";
  formulario.registroProfissional = "";
  formulario.telefoneProfissional = "";
  formulario.emailProfissional = "";
  formulario.cpfProfissional = "";
  formulario.diasAtendimentoProfissional = [];
  formulario.horaInicioProfissional = "";
  formulario.horaFimProfissional = "";
  formulario.statusProfissional = "ativo";
  formulario.observacoesProfissional = "";
  formulario.senhaProfissional = "";
}

onMounted(() => {
  if (props.profissionalId) {
    carregarProfissional(props.profissionalId);
  }
});
</script>

<style scoped>
.formulario-container {
  max-width: 550px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
  color: #2c3e50;
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
  color: #34495e;
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
}

input:focus,
select:focus,
textarea:focus {
  border-color: #3498db;
}

.dias-semana {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.dia-checkbox {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: normal;
  font-size: 13px;
  background: #f1f5f9;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}

.dia-checkbox input {
  width: auto;
  cursor: pointer;
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
  background: #40916c;
  color: #fff;
}

button[type="submit"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button.secundario {
  background: #d8f3dc;
  color: #1b4332;
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