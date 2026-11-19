<template>
  <div class="formulario-container">
    <h2>{{ modoEdicao ? "Editar Paciente" : "Novo Paciente" }}</h2>

    <form @submit.prevent="enviarFormulario">
      <div class="campo">
        <label for="nome">Nome completo</label>
        <input id="nome" type="text" v-model="formulario.nomePaciente" placeholder="Nome do paciente" required />
      </div>

      <div class="campo-grupo">
        <div class="campo">
          <label for="cpf">CPF</label>
          <input id="cpf" type="text" v-model="formulario.cpfPaciente" placeholder="000.000.000-00" maxlength="14"
            @input="formatarCpf" required />
        </div>

        <div class="campo">
          <label for="dataNascimento">Data de nascimento</label>
          <input id="dataNascimento" type="date" v-model="formulario.dataNascimentoPaciente" required />
        </div>
      </div>

      <div class="campo-grupo">
        <div class="campo">
          <label for="telefone">Telefone</label>
          <input id="telefone" type="tel" v-model="formulario.telefonePaciente" placeholder="(00) 00000-0000"
            @input="formatarTelefone" required />
        </div>

        <div class="campo">
          <label for="email">E-mail</label>
          <input id="email" type="email" v-model="formulario.emailPaciente" placeholder="paciente@email.com" required />
        </div>
      </div>

      <div class="campo">
        <label for="senha">Senha</label>
        <input id="senha" type="password" v-model="formulario.senhaPaciente" placeholder="Senha de acesso"
          :required="!modoEdicao" />
      </div>

      <div class="campo">
        <label for="genero">Gênero</label>
        <select id="genero" v-model="formulario.generoPaciente">
          <option disabled value="">Selecione</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="outro">Outro</option>
          <option value="prefiro_nao_informar">Prefiro não informar</option>
        </select>
      </div>

      <fieldset class="endereco">
        <legend>Endereço</legend>

        <div class="campo-grupo">
          <div class="campo campo-cep">
            <label for="cep">CEP</label>
            <input id="cep" type="text" v-model="formulario.cepPaciente" placeholder="00000-000" @blur="buscarCep" />
          </div>

          <div class="campo campo-flex">
            <label for="rua">Rua</label>
            <input id="rua" type="text" v-model="formulario.ruaPaciente" />
          </div>
        </div>

        <div class="campo-grupo">
          <div class="campo">
            <label for="numero">Número</label>
            <input id="numero" type="text" v-model="formulario.numeroPaciente" />
          </div>

          <div class="campo campo-flex">
            <label for="bairro">Bairro</label>
            <input id="bairro" type="text" v-model="formulario.bairroPaciente" />
          </div>
        </div>

        <div class="campo-grupo">
          <div class="campo campo-flex">
            <label for="cidade">Cidade</label>
            <input id="cidade" type="text" v-model="formulario.cidadePaciente" />
          </div>

          <div class="campo campo-uf">
            <label for="uf">UF</label>
            <input id="uf" type="text" v-model="formulario.ufPaciente" maxlength="2" />
          </div>
        </div>
      </fieldset>

      <div class="campo">
        <label for="observacoes">Observações</label>
        <textarea id="observacoes" v-model="formulario.observacoesPaciente" rows="3"
          placeholder="Alergias, condições relevantes, etc."></textarea>
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
import { useRouter } from "vue-router";
import axios from "axios";

// Ajuste a URL base conforme o endereço da sua API (confira a porta do seu backend!)
const API_URL = "http://localhost/paciente";

const props = defineProps({
  pacienteId: {
    type: [String, Number],
    default: null,
  },
});

const router = useRouter();

function voltar() {
  router.back();
}
const emit = defineEmits(["salvo"]);

const modoEdicao = ref(false);
const enviando = ref(false);
const mensagem = ref("");
const sucesso = ref(false);

const formulario = reactive({
  nomePaciente: "",
  cpfPaciente: "",
  dataNascimentoPaciente: "",
  telefonePaciente: "",
  emailPaciente: "",
  senhaPaciente: "",
  generoPaciente: "",
  cepPaciente: "",
  ruaPaciente: "",
  numeroPaciente: "",
  bairroPaciente: "",
  cidadePaciente: "",
  ufPaciente: "",
  observacoesPaciente: "",
});

function formatarCpf(evento) {
  let valor = evento.target.value.replace(/\D/g, "").slice(0, 11);
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  formulario.cpfPaciente = valor;
}

function formatarTelefone(evento) {
  let valor = evento.target.value.replace(/\D/g, "").slice(0, 11);
  valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
  valor = valor.replace(/(\d{5})(\d{4})$/, "$1-$2");
  formulario.telefonePaciente = valor;
}

async function buscarCep() {
  const cep = formulario.cepPaciente.replace(/\D/g, "");
  if (cep.length !== 8) return;

  try {
    const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (!resposta.data.erro) {
      formulario.ruaPaciente = resposta.data.logradouro;
      formulario.bairroPaciente = resposta.data.bairro;
      formulario.cidadePaciente = resposta.data.localidade;
      formulario.ufPaciente = resposta.data.uf;
    }
  } catch (erro) {
    console.error("Erro ao buscar CEP:", erro);
  }
}

async function carregarPaciente(id) {
  try {
    const resposta = await axios.get(`${API_URL}/${id}`);
    Object.assign(formulario, resposta.data);
    modoEdicao.value = true;
  } catch (erro) {
    console.error("Erro ao carregar paciente:", erro);
  }
}

async function enviarFormulario() {
  enviando.value = true;
  mensagem.value = "";

  const dados = {
    nomePaciente: formulario.nomePaciente,
    cpfPaciente: formulario.cpfPaciente,
    emailPaciente: formulario.emailPaciente,
    dataNascimentoPaciente: formulario.dataNascimentoPaciente,
    telefonePaciente: formulario.telefonePaciente,
    generoPaciente: formulario.generoPaciente,
    observacoesPaciente: formulario.observacoesPaciente,
    cepPaciente: formulario.cepPaciente,
    ruaPaciente: formulario.ruaPaciente,
    numeroPaciente: formulario.numeroPaciente,
    bairroPaciente: formulario.bairroPaciente,
    cidadePaciente: formulario.cidadePaciente,
    ufPaciente: formulario.ufPaciente,
  };

  if (formulario.senhaPaciente) {
    dados.senhaPaciente = formulario.senhaPaciente;
  }

  try {
    if (modoEdicao.value) {
      await axios.put(API_URL, { idPaciente: props.pacienteId, ...dados });
      mensagem.value = "Paciente atualizado com sucesso!";
    } else {
      await axios.post(API_URL, dados);
      mensagem.value = "Paciente cadastrado com sucesso!";
    }
    sucesso.value = true;
    emit("salvo", { ...dados });
    if (!modoEdicao.value) limparFormulario();
  } catch (erro) {
    console.log(erro)
    sucesso.value = false;
    mensagem.value =
      erro.response?.data?.erro || erro.response?.data?.mensagem || "Erro ao salvar o paciente.";
    console.error("Erro ao enviar formulário:", erro);
  } finally {
    enviando.value = false;
  }
}

function limparFormulario() {
  formulario.nomePaciente = "";
  formulario.cpfPaciente = "";
  formulario.dataNascimentoPaciente = "";
  formulario.telefonePaciente = "";
  formulario.emailPaciente = "";
  formulario.senhaPaciente = "";
  formulario.generoPaciente = "";
  formulario.cepPaciente = "";
  formulario.ruaPaciente = "";
  formulario.numeroPaciente = "";
  formulario.bairroPaciente = "";
  formulario.cidadePaciente = "";
  formulario.ufPaciente = "";
  formulario.observacoes = "";
}

onMounted(() => {
  if (props.pacienteId) {
    carregarPaciente(props.pacienteId);
  }
});
</script>

<style scoped>
.formulario-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #b7e4c7;
  box-shadow: 0 2px 10px rgba(45, 106, 79, 0.12);
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
  color: #1b4332;
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

.campo-cep {
  flex: 0 0 140px;
}

.campo-uf {
  flex: 0 0 80px;
}

.campo-flex {
  flex: 2;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #2d6a4f;
  font-size: 14px;
}

input,
select,
textarea {
  padding: 10px;
  border: 1px solid #95d5b2;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background: #f6fbf8;
  color: #1b4332;
  transition: border-color 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #40916c;
}

fieldset.endereco {
  border: 1px solid #b7e4c7;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background: #f0f9f4;
}

fieldset.endereco legend {
  font-weight: 600;
  color: #2d6a4f;
  padding: 0 6px;
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