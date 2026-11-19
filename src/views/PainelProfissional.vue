
<script setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Voltar para o login
function voltar() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('idUsuario')
  sessionStorage.removeItem('nomeUsuario')
  sessionStorage.removeItem('tipoUsuario')

  router.back()
}

// Dados da profissional
const profissional = ref({
  nome: 'Dra. Talita Berjas',
  nomeCompleto: 'Dra. Talita Berjas Favore',
  cargo: 'Psicóloga Clínica',
  crp: 'CRP 06/123456',
  foto: ''
})

const consultasHoje = ref(4)
const totalPacientes = ref(28)
const novasMensagens = ref(2)

const proximaConsulta = ref({
  data: '15/10/2026',
  hora: '14:00',
  paciente: 'Ana Heloisa'
})

const temNotificacao = ref(true)

// Menu lateral
const menu = [
  { label: 'Painel Geral', icone: 'mdi:home', rota: '/telaPrincipalProfissional' },
  { label: 'Pacientes', icone: 'mdi:account-group', rota: '/listaPacientes', badge: totalPacientes },
  { label: 'Agenda & Consultas', icone: 'mdi:calendar-month', rota: '/agenda' },
  { label: 'Planos Terapêuticos', icone: 'mdi:clipboard-text', rota: '/listaAtendimentos' },
  { label: 'Histórico & Evoluções', icone: 'mdi:chart-line', rota: '/historico' },
  { label: 'Mensagens', icone: 'mdi:message-text-outline', rota: '/mensagens', badge: novasMensagens },
  { label: 'Configurações', icone: 'mdi:cog', rota: '/telaPrincipalProfissional' }
]
</script>

<template>
  <div class="layout">

    <!-- Menu lateral -->
    <aside class="sidebar">

      <div class="marca">
        <div class="marca-icone">
          <Icon icon="mdi:brain" width="28" />
        </div>

        <div>
          <strong>Saúde Mental</strong>
          <small>Gestão Clínica de Excelência</small>
        </div>
      </div>

      <nav class="menu">
        <router-link
          v-for="item in menu"
          :key="item.label"
          :to="item.rota"
          class="menu-item"
          active-class="ativo"
        >
          <Icon :icon="item.icone" width="22" />
          <span>{{ item.label }}</span>
          <span v-if="item.badge" class="badge">
            {{ item.badge.value }}
          </span>
        </router-link>
      </nav>

      <!-- Botão voltar para o login -->
      <button class="botao-voltar" @click="voltar">
        <Icon icon="mdi:arrow-left" width="20" />
        <span>Voltar para o Login</span>
      </button>

    </aside>

    <!-- Conteúdo -->
    <div class="conteudo">

      <header class="topo">
        <h1>Painel Geral</h1>

        <div class="topo-direita">

          <button class="sino" aria-label="Notificações">
            <Icon icon="mdi:bell-outline" width="24" />
            <span v-if="temNotificacao" class="ponto"></span>
          </button>

          <div class="divisor"></div>

          <div class="perfil">
            <div class="perfil-texto">
              <strong>{{ profissional.nomeCompleto }}</strong>
              <small>{{ profissional.cargo }} • {{ profissional.crp }}</small>
            </div>

            <img
              v-if="profissional.foto"
              :src="profissional.foto"
              alt="Foto"
              class="avatar"
            />

            <div v-else class="avatar avatar-vazio">
              <Icon icon="mdi:account" width="26" />
            </div>
          </div>

        </div>
      </header>

      <main class="pagina">

        <!-- Boas-vindas -->
        <section class="boas-vindas">

          <div class="bv-texto">
            <p class="bv-sub">Bem-vinda de volta,</p>

            <h2>
              {{ profissional.nome }}
              <Icon
                icon="mdi:check-decagram"
                width="28"
                class="verificado"
              />
            </h2>

            <p class="bv-desc">
              Você tem <b>{{ consultasHoje }} consultas agendadas para hoje</b>.
              Aqui no seu painel clínico você acompanha a evolução dos seus
              pacientes e o plano terapêutico em tempo real.
            </p>
          </div>

          <div class="bv-frase">
            <div class="coracao">
              <Icon icon="mdi:heart-outline" width="44" />
            </div>

            <p>Cuidar de quem cuida também é fundamental.</p>
          </div>

        </section>

        <!-- Cards de resumo -->
        <section class="cards">

          <router-link to="/agenda" class="card">
            <div class="card-icone azul">
              <Icon icon="mdi:calendar-blank-outline" width="26" />
            </div>

            <Icon icon="mdi:chevron-right" width="22" class="seta" />

            <h3>Próxima consulta</h3>
            <p>{{ proximaConsulta.data }} - {{ proximaConsulta.hora }}</p>
            <span class="link azul-texto">
              {{ proximaConsulta.paciente }}
            </span>
          </router-link>

          <router-link to="/agenda" class="card">
            <div class="card-icone roxo">
              <Icon icon="mdi:clipboard-text-outline" width="26" />
            </div>

            <Icon icon="mdi:chevron-right" width="22" class="seta" />

            <h3>Atendimentos hoje</h3>
            <p>{{ consultasHoje }} sessões marcadas</p>
            <span class="link roxo-texto">Ver agenda do dia</span>
          </router-link>

          <router-link to="/pacientes" class="card">
            <div class="card-icone verde">
              <Icon icon="mdi:clock-outline" width="26" />
            </div>

            <Icon icon="mdi:chevron-right" width="22" class="seta" />

            <h3>Pacientes ativos</h3>
            <p>{{ totalPacientes }} em acompanhamento</p>
            <span class="link verde-texto">Ver todos os prontuários</span>
          </router-link>

          <router-link to="/chats" class="card">
            <div class="card-icone vermelho">
              <Icon icon="mdi:message-processing-outline" width="26" />
            </div>

            <Icon icon="mdi:chevron-right" width="22" class="seta" />

            <h3>Mensagens</h3>
            <p>{{ novasMensagens }} novas mensagens</p>
            <span class="link vermelho-texto">Responder pacientes</span>
          </router-link>

        </section>

      </main>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;600&family=Inter:wght@400;500;600;700;800&display=swap');

.layout {
  --azul: #2b6cf6;
  --azul-escuro: #0d2447;
  --texto: #0f172a;
  --cinza: #64748b;

  display: flex;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: var(--texto);
  background: #f1f5f9;
}

/* ===== Sidebar ===== */
.sidebar {
  width: 340px;
  flex-shrink: 0;
  background: var(--azul-escuro);
  color: #fff;
  padding: 32px 20px;
}

.marca {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 12px 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 24px;
}

.marca-icone {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #1b3a66;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.marca strong {
  display: block;
  font-size: 22px;
  font-weight: 800;
}

.marca small {
  color: #9fb3d1;
  font-size: 14px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 22px;
  border-radius: 14px;
  color: #e6edf8;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  transition: background 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.07);
}

.menu-item.ativo {
  background: var(--azul);
  color: #fff;
  box-shadow: 0 8px 20px rgba(43, 108, 246, 0.35);
}

.badge {
  margin-left: auto;
  background: #24457a;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 999px;
}

/* ===== Botão voltar ===== */
.botao-voltar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  width: 100%;
  padding: 13px 10px;
  margin-top: 28px;

  background: #ffffff;
  color: #0d2447;

  border: none;
  border-radius: 30px;

  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;
  transition: 0.3s;
}

.botao-voltar:hover {
  background: #e6edf8;
  transform: translateY(-2px);
}

/* ===== Conteúdo ===== */
.conteudo {
  flex: 1;
  min-width: 0;
}

.topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding: 24px 40px;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
}

.topo h1 {
  margin: 0;
  font-size: 34px;
  font-weight: 800;
  color: #000;
}

.topo-direita {
  display: flex;
  align-items: center;
  gap: 22px;
}

.sino {
  position: relative;
  background: none;
  border: 0;
  cursor: pointer;
  color: #475569;
  padding: 4px;
}

.ponto {
  position: absolute;
  top: 2px;
  right: 3px;
  width: 12px;
  height: 12px;
  background: var(--azul);
  border: 2px solid #fff;
  border-radius: 50%;
}

.divisor {
  width: 1px;
  height: 48px;
  background: #e2e8f0;
}

.perfil {
  display: flex;
  align-items: center;
  gap: 14px;
}

.perfil-texto {
  text-align: right;
}

.perfil-texto strong {
  display: block;
  font-size: 18px;
  font-weight: 700;
}

.perfil-texto small {
  color: var(--cinza);
  font-size: 15px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-vazio {
  background: #e2e8f0;
  color: #64748b;
  display: grid;
  place-items: center;
}

/* ===== Página ===== */
.pagina {
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

/* ===== Boas-vindas ===== */
.boas-vindas {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 44px 48px;
  border-radius: 32px;
  background: linear-gradient(135deg, #e8f0fd 0%, #eef3fb 100%);
  border: 1px solid #dbe6f7;
}

.bv-sub {
  margin: 0 0 6px;
  color: #475569;
  font-size: 18px;
}

.bv-texto h2 {
  margin: 0 0 14px;
  font-size: 42px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #000000;
}

.verificado {
  color: var(--azul);
}

.bv-desc {
  margin: 0;
  max-width: 640px;
  color: #475569;
  font-size: 19px;
  line-height: 1.6;
}

.bv-desc b {
  color: #1d4ed8;
  font-weight: 600;
}

.bv-frase {
  text-align: center;
  padding-right: 20px;
}

.coracao {
  width: 92px;
  height: 92px;
  margin: 0 auto 6px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--azul);
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid #c3d6f6;
}

.bv-frase p {
  margin: 0;
  max-width: 300px;
  font-family: 'Caveat', cursive;
  font-size: 34px;
  font-weight: 600;
  line-height: 1.2;
  color: #1e3a8a;
}

/* ===== Cards ===== */
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.card {
  position: relative;
  display: block;
  background: #fff;
  border: 1px solid #e8edf5;
  border-radius: 24px;
  padding: 28px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.09);
}

.card-icone {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  margin-bottom: 26px;
}

.seta {
  position: absolute;
  top: 30px;
  right: 24px;
  color: #cbd5e1;
}

.card h3 {
  margin: 0 0 10px;
  font-size: 20px;
  font-weight: 700;
}

.card p {
  margin: 0 0 14px;
  color: var(--cinza);
  font-size: 16px;
}

.link {
  font-size: 15px;
  font-weight: 600;
}

.azul {
  background: #e6efff;
  color: var(--azul);
}

.roxo {
  background: #f3e8ff;
  color: #9333ea;
}

.verde {
  background: #dcfce7;
  color: #16a34a;
}

.vermelho {
  background: #fee2e2;
  color: #ef4444;
}

.azul-texto {
  color: #1d4ed8;
}

.roxo-texto {
  color: #9333ea;
}

.verde-texto {
  color: #15803d;
}

.vermelho-texto {
  color: #dc2626;
}

/* ===== Responsivo ===== */
@media (max-width: 1280px) {
  .sidebar {
    width: 280px;
  }

  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 860px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
  }

  .menu {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .menu-item {
    padding: 12px 16px;
    font-size: 15px;
  }

  .topo {
    padding: 16px 20px;
  }

  .perfil-texto {
    display: none;
  }

  .pagina {
    padding: 20px;
  }

  .boas-vindas {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px;
  }

  .bv-texto h2 {
    font-size: 32px;
  }

  .cards {
    grid-template-columns: 1fr;
  }
}
</style>
