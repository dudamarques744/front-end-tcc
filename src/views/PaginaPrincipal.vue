
<script setup>
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function voltarLogin() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('idUsuario')
  sessionStorage.removeItem('nomeUsuario')
  sessionStorage.removeItem('tipoUsuario')

  router.replace('/')
}

const paciente = ref({ nome: 'Ana Heloisa' })
const proximaConsulta = ref('15/10/2025 - 14:00')
const mensagensNovas = ref(0)

const acompanhamento = ref({
  profissao: 'Psicóloga',
  nome: 'Drª. Talita Berjas Favore',
})

const ultimoAtendimento = ref({
  data: '01/10/2025',
  tipo: 'Consulta presencial',
  observacao: 'Evolução do quadro e ajustes no plano terapêutico.',
})

const plano = ref([
  { titulo: 'Acompanhamento psicológico', status: 'Em andamento' },
  { titulo: 'Orientações de bem-estar', status: 'Em andamento' },
  { titulo: 'Avaliação de evolução', status: 'Em andamento' },
])

const menu = [
  { label: 'Painel', icon: 'mdi:home', to: '/telaPrincipal' },
  { label: 'Consultas', icon: 'mdi:calendar-blank-outline', to: '/consulta' },
  { label: 'Meu Plano', icon: 'mdi:file-document-outline', to: '/horarios' },
  { label: 'Histórico', icon: 'mdi:history', to: '/historico' },
  { label: 'Mensagens', icon: 'mdi:message-text-outline', to: '/mensagens' },
  { label: 'Configurações', icon: 'mdi:cog-outline', to: '/configuracoes' },
]
</script>

<template>
  <div class="layout">

    <!-- MENU LATERAL -->
    <aside class="sidebar">

      <div class="brand">
        <Icon icon="mdi:head-heart-outline" class="brand-icon" />

        <div>
          <strong>Saúde Mental</strong>
          <small>Cuidar também é<br />um ato de força</small>
        </div>
      </div>

      <nav class="menu">
        <router-link
          v-for="item in menu"
          :key="item.label"
          :to="item.to"
          class="menu-item"
          active-class="ativo"
          exact-active-class="ativo"
        >
          <Icon :icon="item.icon" class="menu-icon" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- BOTÃO FORA DO RODAPÉ -->
      <button
        class="botao-voltar-login"
        type="button"
        @click="voltarLogin"
      >
        <span>←</span>
        Voltar para o Login
      </button>

      <!-- RODAPÉ -->
      <div class="sidebar-footer">

        <div class="avatar-ilustracao">
          <Icon icon="mdi:account-heart" />
        </div>

        <strong>Você não está sozinho(a).</strong>
        <p>Aqui, sua saúde mental importa.</p>

      </div>

    </aside>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="conteudo">

      <header class="topbar">
        <h1>Painel do Paciente</h1>

        <div class="topbar-acoes">
          <button class="icon-btn" aria-label="Notificações">
            <Icon icon="mdi:bell-outline" />
          </button>

          <button class="perfil" aria-label="Perfil">
            <Icon icon="mdi:account-circle" class="perfil-icon" />
            <Icon icon="mdi:chevron-down" />
          </button>
        </div>
      </header>

      <!-- BOAS-VINDAS -->
      <section class="boas-vindas">

        <div class="bv-texto">
          <span class="ola">Olá,</span>

          <h2>
            {{ paciente.nome }}
            <Icon icon="mdi:check-circle" class="verificado" />
          </h2>

          <p>
            Seja bem-vinda ao seu painel! Aqui você pode acompanhar suas
            consultas, seu plano de cuidado e todas as informações importantes.
          </p>
        </div>

        <div class="bv-arte">
          <Icon icon="mdi:head-heart-outline" class="bv-icone" />
          <p class="frase">
            Cuidar da sua<br />
            mente é cuidar<br />
            do seu futuro.
          </p>
        </div>

      </section>

      <!-- ATALHOS -->
      <section class="atalhos">

        <router-link to="/consulta" class="atalho">
          <span class="atalho-icone azul">
            <Icon icon="mdi:calendar-blank-outline" />
          </span>

          <div class="atalho-texto">
            <strong>Próxima consulta</strong>
            <small>{{ proximaConsulta }}</small>
          </div>

          <Icon icon="mdi:chevron-right" class="seta" />
        </router-link>

        <router-link to="/horarios" class="atalho">
          <span class="atalho-icone roxo">
            <Icon icon="mdi:clipboard-text-outline" />
          </span>

          <div class="atalho-texto">
            <strong>Meu plano</strong>
            <small>Ver detalhes</small>
          </div>

          <Icon icon="mdi:chevron-right" class="seta" />
        </router-link>

        <router-link to="/historico" class="atalho">
          <span class="atalho-icone verde">
            <Icon icon="mdi:history" />
          </span>

          <div class="atalho-texto">
            <strong>Histórico</strong>
            <small>Ver todas as consultas</small>
          </div>

          <Icon icon="mdi:chevron-right" class="seta" />
        </router-link>

        <router-link to="/mensagens" class="atalho">
          <span class="atalho-icone rosa">
            <Icon icon="mdi:message-text-outline" />
          </span>

          <div class="atalho-texto">
            <strong>Mensagens</strong>
            <small>{{ mensagensNovas }} novas</small>
          </div>

          <Icon icon="mdi:chevron-right" class="seta" />
        </router-link>

      </section>

      <!-- CARDS INFERIORES -->
      <section class="cards">

        <article class="card">
          <h3>Resumo do seu cuidado</h3>

          <div class="acompanhamento">
            <span class="acomp-icone">
              <Icon icon="mdi:brain" />
            </span>

            <div>
              <small>Você está em acompanhamento com:</small>
              <strong>{{ acompanhamento.profissao }}</strong>
              <small>{{ acompanhamento.nome }}</small>
            </div>
          </div>

          <h4>Último atendimento</h4>

          <ul class="ultimo">
            <li>
              <Icon icon="mdi:calendar-blank-outline" />
              <span><b>Data:</b> {{ ultimoAtendimento.data }}</span>
            </li>

            <li>
              <Icon icon="mdi:message-text-outline" />
              <span><b>Tipo:</b> {{ ultimoAtendimento.tipo }}</span>
            </li>

            <li>
              <Icon icon="mdi:note-text-outline" />
              <span><b>Observação:</b> {{ ultimoAtendimento.observacao }}</span>
            </li>
          </ul>

          <router-link to="/historico" class="btn-outline">
            Ver histórico completo
            <Icon icon="mdi:chevron-right" />
          </router-link>
        </article>

        <article class="card">

          <div class="card-topo">
            <h3>Seu plano de cuidado</h3>

            <router-link to="/meu-plano" class="ver-detalhes">
              Ver detalhes
              <Icon icon="mdi:chevron-right" />
            </router-link>
          </div>

          <ul class="plano">
            <li v-for="item in plano" :key="item.titulo">
              <Icon icon="mdi:check-circle" class="check" />

              <div>
                <strong>{{ item.titulo }}</strong>
                <small>{{ item.status }}</small>
              </div>
            </li>
          </ul>

          <div class="incentivo">
            <Icon icon="mdi:sprout-outline" />

            <div>
              <strong>Você está indo muito bem!</strong>
              <small>
                Cada passo conta. Continue cuidando de você,
                seu bem-estar é importante.
              </small>
            </div>
          </div>

        </article>

      </section>

    </main>
  </div>
</template>

<style scoped>
.layout {
  --azul-escuro: #0f2f6b;
  --azul-medio: #1a4aa3;
  --azul-ativo: #2f62c9;
  --azul-titulo: #10285c;
  --verde: #1f9d6b;
  --fundo: #f5f8fd;
  --borda: #e3eaf5;
  --texto: #1d2a44;
  --texto-suave: #6b7a96;

  display: flex;
  min-height: 100vh;
  background: var(--fundo);
  color: var(--texto);
  font-family: 'Inter', 'Work Sans', system-ui, sans-serif;
}

/* MENU LATERAL */
.sidebar {
  width: 275px;
  min-height: 100vh;
  box-sizing: border-box;
  flex-shrink: 0;
  background: linear-gradient(
    180deg,
    var(--azul-medio) 0%,
    var(--azul-escuro) 100%
  );
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 4px 24px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px 28px;
}

.brand-icon {
  font-size: 54px;
  flex-shrink: 0;
}

.brand strong {
  display: block;
  font-size: 22px;
}

.brand small {
  font-size: 13px;
  line-height: 1.25;
  opacity: 0.9;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 20px;
  border-radius: 10px;
  color: #fff;
  text-decoration: none;
  font-size: 17px;
  transition: background 0.2s;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-item.ativo {
  background: var(--azul-ativo);
}

.menu-icon {
  font-size: 28px;
}

/* BOTÃO VOLTAR */
.botao-voltar-login {
  display: flex;
  width: calc(100% - 28px);
  min-height: 48px;
  box-sizing: border-box;
  margin: 20px auto 10px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fff;
  color: #123b80;
  border: 2px solid #fff;
  border-radius: 30px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0;
}

.botao-voltar-login:hover {
  background: #e6efff;
}

.botao-voltar-login span {
  font-size: 23px;
}

/* RODAPÉ */
.sidebar-footer {
  margin-top: auto;
  padding: 10px 18px 0;
  text-align: center;
}

.avatar-ilustracao {
  font-size: 65px;
  line-height: 1;
  color: #8fb4ff;
}

.sidebar-footer strong {
  display: block;
  font-size: 15px;
  margin-top: 8px;
}

.sidebar-footer p {
  margin: 6px 0 0;
  font-size: 13px;
}

/* CONTEÚDO */
.conteudo {
  flex: 1;
  min-width: 0;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 22px 28px;
  background: #fff;
  border-bottom: 1px solid var(--borda);
}

.topbar h1 {
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  color: var(--azul-titulo);
}

.topbar-acoes {
  display: flex;
  align-items: center;
  gap: 22px;
}

.icon-btn,
.perfil {
  background: none;
  border: 0;
  cursor: pointer;
  color: var(--azul-titulo);
  display: flex;
  align-items: center;
}

.icon-btn {
  font-size: 30px;
}

.perfil {
  gap: 6px;
  font-size: 18px;
}

.perfil-icon {
  font-size: 50px;
  color: var(--azul-ativo);
}

/* BOAS-VINDAS */
.boas-vindas {
  margin: 24px 28px 0;
  padding: 28px 36px;
  border-radius: 16px;
  background: linear-gradient(90deg, #eaf2ff 0%, #f3f8ff 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  overflow: hidden;
}

.ola {
  font-size: 26px;
  font-weight: 700;
  color: var(--azul-titulo);
}

.bv-texto h2 {
  margin: 0 0 8px;
  font-size: 44px;
  font-weight: 800;
  color: var(--verde);
  display: flex;
  align-items: center;
  gap: 10px;
}

.verificado {
  font-size: 30px;
}

.bv-texto p {
  max-width: 460px;
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  color: #3a4764;
}

.bv-arte {
  display: flex;
  align-items: center;
  gap: 24px;
}

.bv-icone {
  font-size: 150px;
  color: #5b8def;
}

.frase {
  font-family: 'Fraunces', cursive, serif;
  font-style: italic;
  font-size: 26px;
  line-height: 1.3;
  color: #5b78b8;
  transform: rotate(-6deg);
  margin: 0;
}

/* ATALHOS */
.atalhos {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin: 24px 28px 0;
}

.atalho {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px;
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, transform 0.2s;
}

.atalho:hover {
  box-shadow: 0 6px 18px rgba(15, 47, 107, 0.1);
  transform: translateY(-2px);
}

.atalho-icone {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 28px;
  flex-shrink: 0;
}

.atalho-icone.azul {
  background: #e3eeff;
  color: #2f62c9;
}

.atalho-icone.roxo {
  background: #ebe7ff;
  color: #6a55d6;
}

.atalho-icone.verde {
  background: #dcf3ea;
  color: #1f9d6b;
}

.atalho-icone.rosa {
  background: #fde4ea;
  color: #e0516f;
}

.atalho-texto {
  flex: 1;
  min-width: 0;
}

.atalho-texto strong {
  display: block;
  font-size: 16px;
  color: var(--azul-titulo);
}

.atalho-texto small {
  color: var(--texto-suave);
  font-size: 14px;
}

.seta {
  font-size: 24px;
  color: var(--texto-suave);
}

/* CARDS */
.cards {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 24px;
  margin: 24px 28px 28px;
}

.card {
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
  padding: 24px;
}

.card h3 {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 800;
  color: var(--azul-titulo);
}

.card h4 {
  margin: 20px 0 10px;
  font-size: 17px;
  color: var(--azul-titulo);
}

.card-topo {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.ver-detalhes {
  color: var(--azul-ativo);
  text-decoration: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
}

.acompanhamento {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f0f4fb;
  border-radius: 10px;
}

.acomp-icone {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #e0e6ff;
  color: #5a58c9;
  display: grid;
  place-items: center;
  font-size: 30px;
}

.acompanhamento small {
  display: block;
  color: var(--texto-suave);
  font-size: 14px;
}

.acompanhamento strong {
  display: block;
  font-size: 20px;
  color: var(--azul-titulo);
}

.ultimo {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ultimo li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
}

.ultimo li :deep(svg) {
  font-size: 22px;
  color: var(--azul-ativo);
  flex-shrink: 0;
}

.btn-outline {
  margin-top: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px;
  border: 2px solid #b9cdf2;
  border-radius: 999px;
  color: var(--azul-ativo);
  text-decoration: none;
  font-weight: 600;
  font-size: 15px;
  transition: background 0.2s;
}

.btn-outline:hover {
  background: #eef4ff;
}

.plano {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.plano li {
  display: flex;
  align-items: center;
  gap: 14px;
}

.check {
  font-size: 30px;
  color: #22a876;
  flex-shrink: 0;
}

.plano strong {
  display: block;
  font-size: 17px;
  color: var(--azul-titulo);
}

.plano small {
  color: var(--texto-suave);
  font-size: 14px;
}

.incentivo {
  margin-top: 24px;
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 18px;
  background: #e4f6ee;
  border-radius: 10px;
  color: #1c7d57;
}

.incentivo :deep(svg) {
  font-size: 38px;
  flex-shrink: 0;
}

.incentivo strong {
  display: block;
  font-size: 16px;
}

.incentivo small {
  font-size: 13px;
  color: #3c6b57;
}

/* RESPONSIVIDADE */
@media (max-width: 1100px) {
  .atalhos {
    grid-template-columns: repeat(2, 1fr);
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .bv-icone,
  .frase {
    display: none;
  }
}

@media (max-width: 800px) {
  .layout {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    min-height: auto;
    padding-bottom: 12px;
  }

  .menu {
    flex-direction: row;
    overflow-x: auto;
  }

  .menu-item {
    padding: 12px 14px;
    font-size: 15px;
    gap: 8px;
    white-space: nowrap;
  }

  .botao-voltar-login {
    max-width: 245px;
    margin: 15px auto;
  }

  .sidebar-footer {
    margin-top: 5px;
  }

  .atalhos {
    grid-template-columns: 1fr;
  }
}
</style>
