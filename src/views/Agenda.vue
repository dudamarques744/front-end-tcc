<template>
  <div class="pagina-fundo">
    <div class="agenda-container">
      <h2>Agenda</h2>

      <div class="filtros">
        <div class="campo">
          <label for="filtroData">Data</label>
          <input id="filtroData" type="date" v-model="filtroData" />
        </div>

        <div class="campo">
          <label for="filtroProfissional">Profissional</label>
          <select id="filtroProfissional" v-model="filtroProfissional">
            <option value="">Todos</option>
            <option
              v-for="profissional in profissionais"
              :key="profissional.idProfissional"
              :value="profissional.idProfissional"
            >
              {{ profissional.nomeProfissional }}
            </option>
          </select>
        </div>
      </div>

      <label class="passados">
        <input type="checkbox" v-model="mostrarPassados" />
        Mostrar atendimentos passados
      </label>

      <p v-if="carregando" class="aviso">Carregando agenda...</p>
      <p v-else-if="erro" class="aviso erro">{{ erro }}</p>
      <p v-else-if="dias.length === 0" class="aviso">
        Nenhum atendimento encontrado. Use "Novo Atendimento" para marcar o
        primeiro.
      </p>

      <section v-for="dia in dias" :key="dia.chave" class="dia">
        <h3>{{ dia.titulo }}</h3>

        <ul class="lista">
          <li
            v-for="atendimento in dia.atendimentos"
            :key="atendimento.idAtendimento"
            class="item"
          >
            <span class="hora">{{ atendimento.hora }}</span>

            <div class="detalhes">
              <strong>{{ atendimento.paciente }}</strong>
              <span>{{ atendimento.profissional }}</span>
            </div>

            <span :class="['status', atendimento.statusClasse]">
              {{ atendimento.status }}
            </span>
          </li>
        </ul>
      </section>

      <div class="acoes">
        <button type="button" class="principal" @click="novoAtendimento">
          Novo Atendimento
        </button>
        <button type="button" class="secundario" @click="voltar">
          Sair
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const API_ATENDIMENTOS = "http://localhost/atendimento";
const API_PACIENTES = "http://localhost/paciente";
const API_PROFISSIONAIS = "http://localhost/profissional";

const router = useRouter();

const atendimentos = ref([]);
const pacientes = ref([]);
const profissionais = ref([]);
const carregando = ref(true);
const erro = ref("");

const filtroData = ref("");
const mostrarPassados = ref(false);

const idSalvo = Number(sessionStorage.getItem("id"));
const filtroProfissional = ref(
  sessionStorage.getItem("tipo") === "profissional" && idSalvo > 0 ? idSalvo : ""
);

function dataLocal(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function nomeDoPaciente(id) {
  const paciente = pacientes.value.find((p) => p.idPaciente === id);
  return paciente ? paciente.nomePaciente : "Paciente não encontrado";
}

function nomeDoProfissional(id) {
  const profissional = profissionais.value.find(
    (p) => p.idProfissional === id
  );
  return profissional ? profissional.nomeProfissional : "Profissional não encontrado";
}

function classeDoStatus(status) {
  const texto = (status || "").toLowerCase();
  if (texto === "agendado") return "agendado";
  if (texto === "realizado" || texto === "concluido") return "realizado";
  if (texto === "cancelado") return "cancelado";
  return "outro";
}

const dias = computed(() => {
  const grupos = {};

  atendimentos.value
    .filter((a) => {
      if (
        filtroProfissional.value !== "" &&
        a.idProfissional !== filtroProfissional.value
      ) {
        return false;
      }
      if (filtroData.value !== "") {
        return dataLocal(new Date(a.dataHorarioAtendimento)) === filtroData.value;
      }
      if (!mostrarPassados.value) {
        const inicioHoje = new Date();
        inicioHoje.setHours(0, 0, 0, 0);
        return new Date(a.dataHorarioAtendimento) >= inicioHoje;
      }
      return true;
    })
    .sort(
      (a, b) =>
        new Date(a.dataHorarioAtendimento) - new Date(b.dataHorarioAtendimento)
    )
    .forEach((a) => {
      const quando = new Date(a.dataHorarioAtendimento);
      const chave = dataLocal(quando);

      if (!grupos[chave]) {
        const titulo = quando.toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        grupos[chave] = {
          chave,
          titulo: titulo.charAt(0).toUpperCase() + titulo.slice(1),
          atendimentos: [],
        };
      }

      grupos[chave].atendimentos.push({
        idAtendimento: a.idAtendimento,
        hora: quando.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        paciente: nomeDoPaciente(a.idPaciente),
        profissional: nomeDoProfissional(a.idProfissional),
        status: a.statusAtendimento,
        statusClasse: classeDoStatus(a.statusAtendimento),
      });
    });

  return Object.values(grupos).sort((a, b) => a.chave.localeCompare(b.chave));
});

async function carregarAgenda() {
  carregando.value = true;
  erro.value = "";

  try {
    const [respAtendimentos, respPacientes, respProfissionais] =
      await Promise.all([
        axios.get(API_ATENDIMENTOS),
        axios.get(API_PACIENTES),
        axios.get(API_PROFISSIONAIS),
      ]);

    atendimentos.value = respAtendimentos.data;
    pacientes.value = respPacientes.data;
    profissionais.value = respProfissionais.data;
  } catch (e) {
    console.error("Erro ao carregar a agenda:", e);
    erro.value = "Não foi possível carregar a agenda. Verifique se o servidor está ativo.";
  } finally {
    carregando.value = false;
  }
}

function novoAtendimento() {
  router.push("/formularioAtendimento");
}

function voltar() {
  sessionStorage.clear();
  router.push("/");
}

onMounted(carregarAgenda);
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

.agenda-container {
  width: 100%;
  max-width: 640px;
  padding: 24px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  font-family: Arial, sans-serif;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #1f4d3a;
}

h3 {
  margin: 0 0 10px;
  font-size: 16px;
  color: #1f4d3a;
}

.filtros {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.campo {
  flex: 1;
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #2f6b52;
  font-size: 14px;
}

input,
select {
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
select:focus {
  border-color: #1f4d3a;
}

select option {
  background-color: #3ba776;
  color: #fff;
}

.dia {
  margin-bottom: 24px;
}

.lista {
  list-style: none;
  margin: 0;
  padding: 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 14px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: #eaf5ef;
  border-left: 4px solid #3ba776;
}

.hora {
  min-width: 52px;
  font-weight: 700;
  color: #1f4d3a;
}

.detalhes {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #2f6b52;
  font-size: 14px;
}

.detalhes strong {
  color: #1f4d3a;
  font-size: 15px;
}

.status {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
}

.status.agendado {
  background: #d4edda;
  color: #155724;
}

.status.realizado {
  background: #cfe8ff;
  color: #114a7a;
}

.status.cancelado {
  background: #f8d7da;
  color: #721c24;
}

.status.outro {
  background: #e2e8f0;
  color: #2d3748;
}

.aviso {
  padding: 12px;
  border-radius: 8px;
  background: #eaf5ef;
  color: #2f6b52;
  font-size: 14px;
  text-align: center;
}

.aviso.erro {
  background: #f8d7da;
  color: #721c24;
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

button.principal {
  background: #3ba776;
  color: #fff;
}

button.secundario {
  background: #eaf5ef;
  color: #1f4d3a;
}

button:hover {
  opacity: 0.9;
}

.passados {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    font-weight: normal;
  }

  .passados input {
    width: auto;
    padding: 0;
  }

@media (max-width: 480px) {
  .filtros {
    flex-direction: column;
  }

  .item {
    flex-wrap: wrap;
  }
}
</style>