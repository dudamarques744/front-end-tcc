<template>
  <div class="pagina">
    <!-- MENU LATERAL -->
    <aside class="sidebar">
      <div class="logo">
        <svg class="logo__icone" viewBox="0 0 56 56" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M28 51C11 37 4 27 4 18.5C4 10.5 10 5 17 5C22 5 26 8 28 12.5C30 8 34 5 39 5C46 5 52 10.5 52 18.5C52 27 45 37 28 51Z" />
          <path d="M22 16C26 19 26 25 22 29" />
          <path d="M34 16C30 19 30 25 34 29" />
          <path d="M28 14V36" />
        </svg>
        <div>
          <h2>Saúde Mental</h2>
          <p>Cuidar também é<br />um ato de força</p>
        </div>
      </div>

      <nav class="menu">
        <button type="button" @click="irPara('/telaPrincipal')">
          <Icon icon="mdi:home-outline" width="30" />
          <span>Painel</span>
        </button>
        <button type="button" @click="irPara('/consulta')">
          <Icon icon="mdi:calendar-blank-outline" width="30" />
          <span>Consultas</span>
        </button>
        <button type="button" class="menu__ativo" @click="irPara('/horarios')">
          <Icon icon="mdi:file-document-edit-outline" width="30" />
          <span>Meu Plano</span>
        </button>
        <button type="button" @click="irPara('/listaAtendimentos')">
          <Icon icon="mdi:history" width="30" />
          <span>Histórico</span>
        </button>
        <button type="button" @click="irPara('/mensagens')">
          <Icon icon="mdi:message-text-outline" width="30" />
          <span>Mensagens</span>
        </button>
      </nav>

      <div class="apoio">
        <svg class="apoio__desenho" viewBox="0 0 220 200" aria-hidden="true">
          <!-- folhagens -->
          <g fill="#2f6fb5">
            <ellipse cx="28" cy="120" rx="9" ry="20" transform="rotate(-25 28 120)" />
            <ellipse cx="22" cy="150" rx="8" ry="18" transform="rotate(-10 22 150)" />
            <ellipse cx="40" cy="95" rx="8" ry="17" transform="rotate(-35 40 95)" />
          </g>
          <g fill="#4a90d9">
            <ellipse cx="192" cy="120" rx="9" ry="20" transform="rotate(25 192 120)" />
            <ellipse cx="198" cy="150" rx="8" ry="18" transform="rotate(10 198 150)" />
            <ellipse cx="180" cy="95" rx="8" ry="17" transform="rotate(35 180 95)" />
          </g>
          <!-- cabelo -->
          <circle cx="110" cy="72" r="42" fill="#1c1630" />
          <circle cx="76" cy="96" r="18" fill="#1c1630" />
          <circle cx="144" cy="96" r="18" fill="#1c1630" />
          <!-- pescoço e rosto -->
          <rect x="99" y="98" width="22" height="26" rx="8" fill="#b97a50" />
          <ellipse cx="110" cy="80" rx="22" ry="26" fill="#c98a5e" />
          <path d="M98 82q4 4 8 0M114 82q4 4 8 0" stroke="#4a2c1c" stroke-width="2" fill="none" stroke-linecap="round" />
          <path d="M104 96q6 4 12 0" stroke="#8a4a35" stroke-width="2" fill="none" stroke-linecap="round" />
          <!-- blusa -->
          <path d="M58 200C58 150 82 124 110 124C138 124 162 150 162 200Z" fill="#8a63d2" />
          <!-- mãos -->
          <ellipse cx="96" cy="170" rx="14" ry="9" fill="#c98a5e" />
          <ellipse cx="124" cy="170" rx="14" ry="9" fill="#c98a5e" />
        </svg>
        <strong>Você está indo muito bem!</strong>
        <p>Cuidar da sua mente<br />também é cuidar do seu futuro.</p>
      </div>
    </aside>

    <!-- CONTEÚDO -->
    <main class="conteudo">
      <header class="topo">
        <div>
          <p class="topo__ola">Olá,</p>
          <h1 class="topo__nome">
            {{ nomePaciente }}
            <Icon icon="mdi:check-circle" class="topo__selo" />
          </h1>
          <p class="topo__sub">Aqui você pode agendar, visualizar e gerenciar suas consultas.</p>
        </div>
        <div class="perfil">
          <button type="button" class="perfil__sino" aria-label="Notificações">
            <Icon icon="mdi:bell-outline" width="30" />
          </button>
          <span class="perfil__avatar"><Icon icon="mdi:account" width="34" /></span>
          <Icon icon="mdi:chevron-down" width="22" class="perfil__seta" />
        </div>
      </header>

      <!-- ETAPAS -->
      <ol class="etapas">
        <li
          v-for="(etapa, i) in etapas"
          :key="etapa.numero"
          class="etapa"
          :class="`etapa--${etapa.estado}`"
        >
          <span class="etapa__bolinha">
            <Icon v-if="etapa.estado === 'feita'" icon="mdi:check" width="26" />
            <template v-else>{{ etapa.numero }}</template>
          </span>
          <span class="etapa__textos">
            <strong>{{ etapa.titulo }}</strong>
            <small>{{ etapa.sub }}</small>
          </span>
          <span v-if="i < etapas.length - 1" class="etapa__linha"></span>
        </li>
      </ol>

      <div class="colunas">
        <!-- HORÁRIOS -->
        <section class="painel">
          <div class="painel__topo">
            <span class="icone-redondo"><Icon icon="mdi:calendar-blank-outline" width="30" /></span>
            <div class="painel__titulos">
              <h2>Horários disponíveis</h2>
              <p>Escolha o dia e o horário da sua consulta.</p>
            </div>
            <label v-if="profissionais.length > 1" class="seletor-prof">
              <span>Profissional</span>
              <select v-model="profissionalId">
                <option
                  v-for="prof in profissionais"
                  :key="prof.idProfissional"
                  :value="prof.idProfissional"
                >
                  {{ prof.nomeProfissional }}
                </option>
              </select>
            </label>
          </div>

          <p v-if="carregando" class="aviso-texto">Carregando...</p>
          <p v-else-if="profissionais.length === 0" class="aviso-texto">Nenhum profissional cadastrado.</p>

          <div v-else class="selecao">
            <!-- calendário -->
            <div class="calendario">
              <div class="calendario__mes">
                <button type="button" :disabled="!podeVoltarMes" aria-label="Mês anterior" @click="mudarMes(-1)">
                  <Icon icon="mdi:chevron-left" width="28" />
                </button>
                <strong>{{ tituloMes }}</strong>
                <button type="button" aria-label="Próximo mês" @click="mudarMes(1)">
                  <Icon icon="mdi:chevron-right" width="28" />
                </button>
              </div>

              <div class="calendario__semana">
                <span v-for="s in semana" :key="s">{{ s }}</span>
              </div>

              <div class="calendario__dias">
                <button
                  v-for="dia in diasCalendario"
                  :key="dia.data"
                  type="button"
                  class="dia"
                  :class="{
                    'dia--fora': dia.foraDoMes,
                    'dia--ativo': dia.data === diaSelecionado
                  }"
                  :disabled="dia.foraDoMes || dia.passado"
                  @click="diaSelecionado = dia.data"
                >
                  {{ dia.numero }}
                </button>
              </div>
            </div>

            <!-- horas -->
            <div class="horas">
              <h3>Horários do dia {{ dataCurta }}</h3>
              <div class="horas__grade">
                <button
                  v-for="item in horariosDoDia"
                  :key="item.hora"
                  type="button"
                  class="hora"
                  :class="{ 'hora--ativa': item.hora === horaSelecionada }"
                  :disabled="item.indisponivel"
                  @click="horaSelecionada = item.hora"
                >
                  {{ item.hora }}
                </button>
              </div>
              <p class="horas__nota">
                <Icon icon="mdi:information" width="24" />
                <span>Horários disponíveis para<br />Consulta com Psicólogo.</span>
              </p>
            </div>
          </div>
        </section>

        <!-- RESUMO -->
        <aside class="painel painel--resumo">
          <div class="resumo__topo">
            <span class="resumo__check">
              <Icon :icon="horaSelecionada ? 'mdi:check' : 'mdi:clock-outline'" width="34" />
            </span>
            <div>
              <h2>{{ horaSelecionada ? "Pronto!" : "Quase lá!" }}</h2>
              <p>{{ horaSelecionada ? "Seu agendamento foi selecionado." : "Escolha um dia e um horário." }}</p>
            </div>
          </div>

          <div class="resumo__caixa">
            <div class="item">
              <Icon icon="mdi:calendar-blank-outline" width="34" class="item__icone" />
              <div>
                <small>Data</small>
                <strong>{{ dataExtenso }}</strong>
              </div>
            </div>
            <div class="item">
              <Icon icon="mdi:clock-outline" width="34" class="item__icone" />
              <div>
                <small>Horário</small>
                <strong>{{ horaSelecionada ?? "—" }}</strong>
              </div>
            </div>
            <div class="item">
              <Icon icon="mdi:account-outline" width="34" class="item__icone" />
              <div>
                <small>Profissional</small>
                <strong>{{ profissionalAtual?.nomeProfissional ?? "—" }}</strong>
                <small v-if="profissionalAtual?.registroProfissional">
                  {{ profissionalAtual.registroProfissional }}
                </small>
              </div>
            </div>
            <div class="item">
              <Icon icon="mdi:map-marker-outline" width="34" class="item__icone" />
              <div>
                <small>Local da consulta</small>
                <strong>{{ LOCAL.nome }}</strong>
                <small>{{ LOCAL.endereco }}</small>
              </div>
            </div>
          </div>

          <button type="button" class="confirmar" :disabled="!horaSelecionada" @click="confirmar">
            <Icon icon="mdi:check-circle" width="26" />
            Confirmar agendamento
            <Icon icon="mdi:chevron-right" width="22" />
          </button>
        </aside>
      </div>

      <!-- AVISO INFERIOR -->
      <section class="rodape-info">
        <span class="icone-redondo"><Icon icon="mdi:calendar-blank-outline" width="30" /></span>
        <p>
          <span>Após a confirmação, você receberá um e-mail e uma mensagem com todos os detalhes da sua consulta.</span>
          <small>Em caso de imprevistos, você pode remarcar ou cancelar seu agendamento.</small>
        </p>
        <router-link to="/consulta" class="rodape-info__botao">
          Ver meus agendamentos
          <Icon icon="mdi:chevron-right" width="20" />
        </router-link>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from "axios"
import { Icon } from "@iconify/vue"

const router = useRouter()

const API_PROFISSIONAL = "http://localhost/profissional"
const API_ATENDIMENTO = "http://localhost/atendimento"

const HORARIOS = [
  "08:00", "09:00", "10:00",
  "11:00", "13:00", "14:00",
  "15:00", "16:00", "17:00",
  "18:00", "19:00"
]
const semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]

// Local fixo da clínica (ainda não vem do back-end)
const LOCAL = {
  nome: "Clínica Bem-Estar",
  endereco: "Rua das Flores, 123 - Centro, Jales/SP"
}

function irPara(caminho) {
  router.push(caminho)
}

// ---------- Nome do paciente ----------
const nomePaciente = (sessionStorage.getItem("nome") ?? "")
  .trim()
  .toLowerCase()
  .replace(/(^|\s)\S/g, (letra) => letra.toUpperCase()) || "Paciente"

// ---------- Etapas ----------
const etapas = [
  { numero: 1, titulo: "1. Consulta", sub: "Escolha o tipo de consulta", estado: "feita" },
  { numero: 2, titulo: "Horários", sub: "Selecione o melhor horário", estado: "atual" },
  { numero: 3, titulo: "Informações", sub: "Confirme seus dados", estado: "pendente" },
  { numero: 4, titulo: "Pagamento", sub: "Finalize seu agendamento", estado: "pendente" }
]

// ---------- Datas ----------
function paraIso(d) {
  const mes = String(d.getMonth() + 1).padStart(2, "0")
  const dia = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mes}-${dia}`
}

function deIso(iso) {
  const [a, m, d] = iso.split("-").map(Number)
  return new Date(a, m - 1, d)
}

const hoje = new Date()
hoje.setHours(0, 0, 0, 0)
const hojeIso = paraIso(hoje)

const mesVisivel = ref(new Date(hoje.getFullYear(), hoje.getMonth(), 1))
const diaSelecionado = ref(hojeIso)
const horaSelecionada = ref(null)

const tituloMes = computed(() => {
  const texto = mesVisivel.value.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
  const [mes, , ano] = texto.split(" ")
  return `${mes.charAt(0).toUpperCase()}${mes.slice(1)} ${ano}`
})

const podeVoltarMes = computed(
  () => mesVisivel.value > new Date(hoje.getFullYear(), hoje.getMonth(), 1)
)

function mudarMes(delta) {
  const m = mesVisivel.value
  mesVisivel.value = new Date(m.getFullYear(), m.getMonth() + delta, 1)
}

const diasCalendario = computed(() => {
  const ano = mesVisivel.value.getFullYear()
  const mes = mesVisivel.value.getMonth()
  const inicio = new Date(ano, mes, 1 - new Date(ano, mes, 1).getDay())
  const dias = []
  for (let i = 0; i < 42; i++) {
    const d = new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate() + i)
    dias.push({
      data: paraIso(d),
      numero: d.getDate(),
      foraDoMes: d.getMonth() !== mes,
      passado: d < hoje
    })
  }
  // tira a última linha se ela for toda do mês seguinte
  return dias[35].foraDoMes ? dias.slice(0, 35) : dias
})

const dataCurta = computed(() => {
  const [a, m, d] = diaSelecionado.value.split("-")
  return `${d}/${m}/${a}`
})

const dataExtenso = computed(() => {
  const dia = deIso(diaSelecionado.value).toLocaleDateString("pt-BR", { weekday: "long" })
  return `${dataCurta.value} (${dia.charAt(0).toUpperCase()}${dia.slice(1)})`
})

// ---------- Dados do back-end ----------
const profissionais = ref([])
const atendimentos = ref([])
const carregando = ref(true)
const profissionalId = ref(null)

const profissionalAtual = computed(() =>
  profissionais.value.find((p) => p.idProfissional === profissionalId.value)
)

async function carregar() {
  try {
    const [resProf, resAtend] = await Promise.all([
      axios.get(API_PROFISSIONAL),
      axios.get(API_ATENDIMENTO)
    ])
    profissionais.value = resProf.data
    atendimentos.value = resAtend.data
    if (profissionais.value.length) {
      profissionalId.value = profissionais.value[0].idProfissional
    }
  } catch (erro) {
    console.error("Erro ao carregar horários:", erro)
  } finally {
    carregando.value = false
  }
}

// ---------- Horários do dia ----------
const ocupados = computed(() =>
  atendimentos.value
    .filter(
      (a) =>
        a.idProfissional === profissionalId.value &&
        String(a.dataAtendimento).slice(0, 10) === diaSelecionado.value
    )
    .map((a) => String(a.horaAtendimento).slice(0, 5))
)

function jaPassou(hora) {
  if (diaSelecionado.value !== hojeIso) return false
  const agora = new Date()
  const [h, m] = hora.split(":").map(Number)
  return new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), h, m) <= agora
}

const horariosDoDia = computed(() =>
  HORARIOS.map((hora) => ({
    hora,
    indisponivel: ocupados.value.includes(hora) || jaPassou(hora)
  }))
)

// trocou o dia ou o profissional: o horário escolhido antes deixa de valer
watch([diaSelecionado, profissionalId], () => {
  horaSelecionada.value = null
})

// ---------- Confirmar ----------
function confirmar() {
  if (!horaSelecionada.value) return
  router.push({
    path: "/formularioAtendimento",
    query: {
      profissionalId: profissionalId.value,
      data: diaSelecionado.value,
      hora: horaSelecionada.value
    }
  })
}

onMounted(carregar)
</script>

<style scoped>
.pagina {
  --azul-menu: #0d2f55;
  --azul-menu-escuro: #082444;
  --azul-ativo: #2a67aa;
  --verde: #0c9b6e;
  --verde-escuro: #087e5a;
  --verde-claro: #eaf8f2;
  --titulo: #17315c;
  --texto: #56739b;
  --borda: #e1e9f4;
  --fundo: #f3f7fc;

  min-height: 100vh;
  display: flex;
  background: var(--fundo);
  color: var(--titulo);
  font-family: "Segoe UI", Arial, Helvetica, sans-serif;
}

/* ---------- Menu lateral ---------- */
.sidebar {
  width: 278px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 26px 10px 34px;
  color: #fff;
  background: linear-gradient(180deg, var(--azul-menu), var(--azul-menu-escuro));
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 14px 44px;
}

.logo__icone {
  width: 58px;
  height: 58px;
  flex-shrink: 0;
}

.logo h2 {
  margin: 0 0 4px;
  font-size: 23px;
  font-weight: 700;
  color: #fff;
}

.logo p {
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu button {
  display: flex;
  align-items: center;
  gap: 22px;
  width: 100%;
  padding: 15px 18px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: #fff;
  font-size: 18px;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s ease;
}

.menu button:hover {
  background: rgba(255, 255, 255, 0.08);
}

.menu .menu__ativo {
  background: var(--azul-ativo);
}

.apoio {
  margin-top: auto;
  padding: 24px 12px 0;
  text-align: center;
  font-size: 14px;
  line-height: 1.5;
}

.apoio__desenho {
  width: 210px;
  max-width: 100%;
  margin-bottom: 10px;
}

.apoio strong {
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
}

.apoio p {
  margin: 0;
}

/* ---------- Conteúdo ---------- */
.conteudo {
  flex: 1;
  min-width: 0;
  padding: 0 32px 34px;
}

.topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 26px 0 22px;
  border-bottom: 1px solid var(--borda);
  margin-bottom: 20px;
}

.topo__ola {
  margin: 0;
  font-size: 25px;
  font-weight: 700;
  color: var(--titulo);
}

.topo__nome {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--verde);
  line-height: 1.15;
}

.topo__selo {
  width: 32px;
  height: 32px;
  margin-top: 6px;
}

.topo__sub {
  margin: 4px 0 0;
  font-size: 17px;
  color: var(--texto);
}

.perfil {
  display: flex;
  align-items: center;
  gap: 16px;
}

.perfil__sino {
  display: flex;
  margin-right: 24px;
  padding: 4px;
  border: none;
  background: none;
  color: var(--titulo);
  cursor: pointer;
}

.perfil__avatar {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #17457f;
  color: #fff;
}

.perfil__seta {
  color: var(--texto);
}

/* ---------- Etapas ---------- */
.etapas {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0 0 22px;
  padding: 24px 28px;
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
}

.etapa {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.etapa:last-child {
  flex: 0 0 auto;
}

.etapa__bolinha {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e3eaf5;
  color: var(--texto);
  font-size: 20px;
  font-weight: 700;
}

.etapa--feita .etapa__bolinha,
.etapa--atual .etapa__bolinha {
  background: var(--verde);
  color: #fff;
}

.etapa__textos {
  display: flex;
  flex-direction: column;
  gap: 6px;
  white-space: nowrap;
}

.etapa__textos strong {
  font-size: 15px;
  color: var(--titulo);
}

.etapa--atual .etapa__textos strong,
.etapa--feita .etapa__textos strong {
  color: var(--verde);
}

.etapa__textos small {
  font-size: 12.5px;
  color: var(--texto);
}

.etapa__linha {
  flex: 1;
  min-width: 24px;
  height: 2px;
  margin: 0 16px;
  background: #dde6f1;
}

/* ---------- Painéis ---------- */
.colunas {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(340px, 1fr);
  gap: 20px;
  align-items: start;
}

.painel {
  padding: 24px;
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
}

.painel__topo {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.icone-redondo {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8f0fc;
  color: #1b63b5;
}

.painel__titulos {
  flex: 1;
}

.painel__titulos h2 {
  margin: 0 0 6px;
  font-size: 23px;
  font-weight: 700;
  color: var(--titulo);
}

.painel__titulos p {
  margin: 0;
  color: var(--texto);
}

.seletor-prof {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: var(--texto);
}

.seletor-prof select {
  padding: 8px 10px;
  border: 1px solid var(--borda);
  border-radius: 8px;
  background: #fff;
  color: var(--titulo);
  font-size: 14px;
}

.aviso-texto {
  margin: 0;
  color: var(--texto);
}

/* ---------- Calendário + horas ---------- */
.selecao {
  display: grid;
  grid-template-columns: minmax(270px, 1fr) minmax(250px, 0.95fr);
  gap: 26px;
}

.calendario {
  align-self: start;
  padding: 18px 16px;
  border: 1px solid var(--borda);
  border-radius: 12px;
}

.calendario__mes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.calendario__mes strong {
  font-size: 18px;
}

.calendario__mes button {
  display: flex;
  padding: 2px;
  border: none;
  background: none;
  color: var(--titulo);
  cursor: pointer;
}

.calendario__mes button:disabled {
  color: #c3cfdf;
  cursor: not-allowed;
}

.calendario__semana,
.calendario__dias {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  text-align: center;
}

.calendario__semana {
  margin-bottom: 10px;
  font-size: 13px;
  color: var(--texto);
}

.calendario__dias {
  row-gap: 8px;
}

.dia {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  border: none;
  border-radius: 50%;
  background: none;
  color: var(--titulo);
  font-size: 15px;
  cursor: pointer;
}

.dia:hover:not(:disabled):not(.dia--ativo) {
  background: var(--verde-claro);
}

.dia--ativo {
  background: var(--verde);
  color: #fff;
  font-weight: 700;
}

.dia:disabled {
  color: #b4c1d4;
  cursor: default;
}

.dia--fora {
  color: #b4c1d4;
}

.horas h3 {
  margin: 8px 0 22px;
  font-size: 16px;
  font-weight: 700;
  color: var(--titulo);
}

.horas__grade {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 12px;
}

.hora {
  min-height: 48px;
  border: 1px solid var(--borda);
  border-radius: 999px;
  background: #fff;
  color: var(--texto);
  font-size: 15px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.hora:hover:not(:disabled):not(.hora--ativa) {
  border-color: var(--verde);
  color: var(--verde);
}

.hora--ativa {
  border-color: var(--verde);
  background: var(--verde);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 3px 8px rgba(12, 155, 110, 0.3);
}

.hora:disabled {
  background: #f1f5fa;
  color: #b4c1d4;
  cursor: not-allowed;
}

.horas__nota {
  display: flex;
  gap: 12px;
  margin: 28px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--texto);
}

.horas__nota svg {
  flex-shrink: 0;
  color: #4f86d9;
}

/* ---------- Resumo ---------- */
.painel--resumo {
  padding: 14px;
  border-color: #d6eee4;
  background: #fcfffd;
}

.resumo__topo {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px;
  border-radius: 10px 10px 0 0;
  background: var(--verde-claro);
}

.resumo__check {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--verde);
  color: #fff;
}

.resumo__topo h2 {
  margin: 0 0 4px;
  font-size: 27px;
  font-weight: 700;
  color: var(--verde);
}

.resumo__topo p {
  margin: 0;
  color: var(--verde);
}

.resumo__caixa {
  display: grid;
  gap: 26px;
  margin: 12px 0 20px;
  padding: 26px 20px;
  border-radius: 10px;
  background: #f1f6fc;
}

.item {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.item__icone {
  flex-shrink: 0;
  color: var(--titulo);
}

.item small,
.item strong {
  display: block;
}

.item small {
  font-size: 13px;
  line-height: 1.6;
  color: var(--texto);
}

.item strong {
  margin: 3px 0;
  font-size: 16px;
  font-weight: 700;
}

.confirmar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: 100%;
  padding: 19px 12px;
  border: none;
  border-radius: 999px;
  background: var(--verde);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}

.confirmar:hover:not(:disabled) {
  background: var(--verde-escuro);
}

.confirmar:disabled {
  background: #a9bbd0;
  cursor: not-allowed;
}

/* ---------- Aviso inferior ---------- */
.rodape-info {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 20px;
  padding: 20px 26px;
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
}

.rodape-info p {
  flex: 1;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #3c5a85;
  font-size: 14px;
}

.rodape-info small {
  font-size: 13px;
  color: var(--texto);
}

.rodape-info__botao {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 22px;
  border: 1.5px solid #6fa4ee;
  border-radius: 999px;
  color: #2670d3;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
}

.rodape-info__botao:hover {
  background: #edf4fe;
}

/* ---------- Responsivo ---------- */
@media (max-width: 1200px) {
  .sidebar {
    width: 230px;
  }

  .colunas,
  .selecao {
    grid-template-columns: 1fr;
  }

  .etapas {
    flex-wrap: wrap;
    gap: 16px;
  }

  .etapa__linha {
    display: none;
  }
}

@media (max-width: 720px) {
  .pagina {
    display: block;
  }

  .sidebar {
    width: 100%;
    padding: 16px;
  }

  .logo {
    padding-bottom: 16px;
  }

  .menu {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .menu button {
    gap: 10px;
    padding: 12px 10px;
    font-size: 14px;
  }

  .apoio,
  .perfil {
    display: none;
  }

  .conteudo {
    padding: 0 14px 24px;
  }

  .painel__topo,
  .rodape-info {
    flex-wrap: wrap;
  }
}
</style>